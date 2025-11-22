import fetch from 'node-fetch';
import { promises as fs } from 'fs';

const FILE_PATH = './lib/characters.json';

async function loadCharacters() {
    try {
        await fs.access(FILE_PATH);
    } catch {
        await fs.writeFile(FILE_PATH, '{}');
    }
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}

function flattenCharacters(charactersData) {
    return Object.values(charactersData).flatMap(series => 
        Array.isArray(series.characters) ? series.characters : []
    );
}

function getSeriesNameByCharacter(charactersData, characterId) {
    return Object.entries(charactersData).find(([, series]) => 
        Array.isArray(series.characters) && 
        series.characters.some(char => String(char.id) === String(characterId))
    )?.[1]?.name || 'Desconocido';
}

function formatTag(tag) {
    return String(tag).toLowerCase().trim().replace(/\s+/g, '_');
}

async function buscarImagenDelirius(characterName) {
    const formattedTag = formatTag(characterName);
    const apis = [
        'https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=' + formattedTag,
        'https://danbooru.donmai.us/posts.json?tags=' + formattedTag
    ];

    for (const api of apis) {
        try {
            const response = await fetch(api, {
                'headers': {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'application/json'
                }
            });

            const contentType = response.headers.get('content-type') || '';
            if (!response.ok || !contentType.includes('application/json')) continue;

            const data = await response.json();
            const posts = Array.isArray(data) ? data : data?.posts || data?.data || [];

            const images = posts.map(post => 
                post?.file_url || 
                post?.large_file_url || 
                post?.image || 
                post?.media_asset?.variants?.[0]?.url
            ).filter(url => typeof url === 'string' && /\.(jpe?g|png)$/i.test(url));

            if (images.length) return images;
        } catch {

        }
    }
    return [];
}

const handler = async (m, { conn, usedPrefix, command }) => {
    const chats = global.db.data.chats;
    if (!chats[m.chat]) chats[m.chat] = {};
    const chatData = chats[m.chat];

    if (!chatData.characters) chatData.characters = {};
    if (!chatData.gacha && m.isGroup) {
        return m.reply('> Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *' + usedPrefix + 'gacha on*');
    }

    const user = global.db.data.users[m.sender];
    const currentTime = Date.now();
    const cooldown = 3 * 60 * 1000;

    if (user.lastRolled && currentTime < user.lastRolled) {
        const remainingSeconds = Math.ceil((user.lastRolled - currentTime) / 1000);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        let timeString = '';
        if (minutes > 0) timeString += minutes + ' minuto' + (minutes !== 1 ? 's' : '') + ' ';
        if (seconds > 0 || timeString === '') timeString += seconds + ' segundo' + (seconds !== 1 ? 's' : '');

        return m.reply('> Debes esperar *' + timeString.toLowerCase() + '* para usar *' + (usedPrefix + command) + '* de nuevo.');
    }

    try {
        const charactersData = await loadCharacters();
        const allCharacters = flattenCharacters(charactersData);
        const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        const characterId = String(randomCharacter.id);
        const seriesName = getSeriesNameByCharacter(charactersData, randomCharacter.id);
        const searchTag = formatTag(randomCharacter.tags?.[0] || '');
        const characterImages = await buscarImagenDelirius(searchTag);
        const randomImage = characterImages[Math.floor(Math.random() * characterImages.length)];

        if (!randomImage) {
            return m.reply('> No se encontró imágenes para el personaje *' + randomCharacter.name + '*.');
        }

        if (!global.db.data.characters) global.db.data.characters = {};
        if (!global.db.data.characters[characterId]) global.db.data.characters[characterId] = {};

        const character = global.db.data.characters[characterId];
        const existingData = global.db.data.characters?.[characterId] || {};

        character.name = String(randomCharacter.name || 'Sin nombre');
        character.value = typeof existingData.value === 'number' ? existingData.value : Number(randomCharacter.value) || 100;
        character.votes = Number(character.votes || existingData.votes || 0);
        character.reservedBy = m.sender;
        character.reservedUntil = currentTime + 20000; // 20 segundos
        character.expiresAt = currentTime + 60000; // 1 minuto

        let reservedByName = await (async () => {
            if (typeof character.user === 'string' && character.user.toLowerCase()) {
                const userData = global.db.data.users[character.user];
                if (userData?.name?.toLowerCase()) {
                    return userData.name.toLowerCase();
                }
                return await conn.getName(character.user)
                    .then(name => typeof name === 'string' && name.toLowerCase() ? name : character.user.split('@')[0])
                    .catch(() => character.user.split('@')[0]);
            }
            return 'desconocido';
        })();

        const caption = 
            '❀ Nombre » *' + character.name + 
            '*\n❑ Género » *' + (randomCharacter.gender || 'Desconocido') + 
            '*\n❑ Valor » *' + character.value.toLocaleString() + 
            '*\n❑ Estado » *' + (character.user ? 'Reclamado por ' + reservedByName : 'Libre') + 
            '*\n❑ Fuente » *' + seriesName + '*';

        const sentMessage = await conn.sendFile(
            m.chat, 
            randomImage, 
            character.name + '.jpg', 
            caption, 
            m
        );

        chatData.lastRolledId = characterId;
        chatData.lastRolledMsgId = sentMessage.message?.id || null;
        chatData.lastRolledCharacter = {
            'id': characterId,
            'name': character.name,
            'media': randomImage
        };

        user.lastRolled = currentTime + cooldown;

    } catch (error) {
        await conn.reply(
            m.chat, 
            '> ⚠︎ Se ha producido un problema.\n> Usa ' + usedPrefix + 'report para informarlo.\n\n' + error.message, 
            m
        );
    }
};

handler.help = ['roll', 'rw', 'rollwaifu'];
handler.tags = ['gacha'];
handler.command = ['roll', 'rw', 'rollwaifu'];
handler.group = true;
handler.register = true

export default handler;