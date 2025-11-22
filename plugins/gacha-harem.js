import { promises as fs } from 'fs';

const charactersFilePath = './lib/characters.json';

async function loadCharacters() {
    const data = await fs.readFile(charactersFilePath, 'utf-8');
    return JSON.parse(data);
}

function flattenCharacters(charactersData) {
    return Object.values(charactersData).flatMap(series => 
        Array.isArray(series.characters) ? series.characters : []
    );
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!global.db.data.chats?.[m.chat]?.gacha && m.isGroup) {
        return m.reply('> Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *' + usedPrefix + 'gacha on*');
    }

    try {
        if (!global.db.data.users) global.db.data.users = {};
        if (!global.db.data.characters) global.db.data.characters = {};

        let mentionedUsers = await m.mentionedJid;
        let targetUser = mentionedUsers && mentionedUsers.length ? 
            mentionedUsers[0] : 
            m.quoted && await m.quoted.sender ? 
            await m.quoted.sender : 
            m.sender;

        let targetUserName = await (async () => {
            const userData = global.db.data.users[targetUser];
            if (userData?.name?.trim()) {
                return userData.name.trim();
            }
            return await conn.getName(targetUser)
                .then(name => typeof name === 'string' && name.trim() ? name : targetUser.split('@')[0])
                .catch(() => targetUser.split('@')[0]);
        })();

        const charactersData = await loadCharacters();
        const allCharacters = flattenCharacters(charactersData);

        const userCharacters = Object.entries(global.db.data.characters)
            .filter(([, charData]) => (charData.user || '').replace(/[^0-9]/g, '') === targetUser.replace(/[^0-9]/g, ''))
            .map(([charId]) => charId);

        if (userCharacters.length === 0) {
            const message = targetUser === m.sender ? 
                '> No tienes personajes reclamados.' : 
                '> El usuario *' + targetUserName + '* no tiene personajes reclamados.';
            return conn.reply(m.chat, message, m, { mentions: [targetUser] });
        }

        // Ordenar personajes por valor
        userCharacters.sort((charA, charB) => {
            const charAData = global.db.data.characters[charA] || {};
            const charBData = global.db.data.characters[charB] || {};
            const charAInfo = allCharacters.find(char => char.id === charA);
            const charBInfo = allCharacters.find(char => char.id === charB);

            const valueA = typeof charAData.value === 'number' ? charAData.value : Number(charAInfo?.value || 0);
            const valueB = typeof charBData.value === 'number' ? charBData.value : Number(charBInfo?.value || 0);

            return valueB - valueA;
        });

        const page = parseInt(args[1]) || 1;
        const itemsPerPage = 50;
        const totalPages = Math.ceil(userCharacters.length / itemsPerPage);

        if (page < 1 || page > totalPages) {
            return conn.reply(m.chat, 
                '> Página no válida. Hay un total de *' + totalPages + '* páginas.', 
                m
            );
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, userCharacters.length);

        let messageText = '🌸 Personajes reclamados ✿\n';
        messageText += '👤 Usuario: *' + targetUserName + '*\n';
        messageText += '🎴 Personajes: *(' + userCharacters.length + ')*\n\n';

        for (let i = startIndex; i < endIndex; i++) {
            const charId = userCharacters[i];
            const charData = global.db.data.characters[charId] || {};
            const charInfo = allCharacters.find(char => char.id === charId);
            const charName = charInfo?.name || charData.name || 'Sin nombre: ' + charId;
            const charValue = typeof charData.value === 'number' ? charData.value : Number(charInfo?.value || 0);

            messageText += '🧧 ' + charName + ' » *' + charValue.toLocaleString() + '*\n';
        }

        messageText += '\n📖 _Página *' + page + '* de *' + totalPages + '*_';

        await conn.reply(m.chat, messageText.trim(), m, { mentions: [targetUser] });

    } catch (error) {
        await conn.reply(m.chat, 
            '> ⚠︎ Se ha producido un problema.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + error.message, 
            m
        );
    }
};

handler.help = ['harem'];
handler.tags = ['anime'];
handler.command = ['harem', 'waifus', 'claims'];
handler.group = true;

export default handler;