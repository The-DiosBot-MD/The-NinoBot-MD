import { promises as fs } from 'fs';

const file = './lib/characters.json';

async function load() {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}

function getCharacters(charactersData) {
    return Object.values(charactersData).flatMap(series => 
        Array.isArray(series.characters) ? series.characters : []
    );
}

let pending = {};

const verifi = async () => {
    try {
        const packageData = await fs.readFile('./package.json', 'utf-8');
        const packageJson = JSON.parse(packageData);
        // Verificar que es la versión privada de Nino Nakano-IA
        return packageJson.name === 'nino-nakano-ia' && 
               (packageJson.repository?.url.includes('private') ||
                packageJson.description?.includes('Nino Nakano'));
    } catch {
        return false;
    }
};

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!await verifi()) {
        return conn.reply(m.chat, 
            '> El comando *<' + command + '>* solo está disponible para la versión privada de *Nino Nakano-IA*.\n> Comando exclusivo para owners.', 
            m
        );
    }

    if (!global.db.data.chats?.[m.chat]?.gacha && m.isGroup) {
        return m.reply('> Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *' + usedPrefix + 'gacha on*');
    }

    try {
        const user = global.db.data.users[m.sender];
        if (!Array.isArray(user.characters)) user.characters = [];

        const mentionedUsers = await m.mentionedJid;
        const targetUser = mentionedUsers[0] || 
                          m.quoted && await m.quoted.sender;

        if (!targetUser || typeof targetUser !== 'string' || !targetUser.includes('@')) {
            return m.reply('> Debes mencionar a quien quieras regalarle tus personajes.');
        }

        const targetUserData = global.db.data.users[targetUser];
        if (!targetUserData) {
            return m.reply('> El usuario mencionado no está registrado.');
        }

        if (!Array.isArray(targetUserData.characters)) {
            targetUserData.characters = [];
        }

        const charactersData = await load();
        const allCharacters = getCharacters(charactersData);
        const userCharacterIds = user.characters;
        
        const userCharacters = userCharacterIds.map(charId => {
            const charData = global.db.data.characters?.[charId] || {};
            const charInfo = allCharacters.find(char => char.id === charId);
            const value = typeof charData.value === 'number' ? 
                charData.value : 
                typeof charInfo?.value === 'number' ? charInfo.value : 0;
            
            return {
                'id': charId,
                'name': charData.name || charInfo?.name || 'ID: ' + charId,
                'value': value
            };
        });

        if (userCharacters.length === 0) {
            return m.reply('> No tienes personajes para regalar.');
        }

        const totalValue = userCharacters.reduce((sum, char) => sum + char.value, 0);

        let targetUserName = await (async () => {
            const userData = global.db.data.users[targetUser];
            return userData?.name?.trim() || 
                   await conn.getName(targetUser)
                       .then(name => typeof name === 'string' && name.trim() ? name : targetUser.split('@')[0])
                       .catch(() => targetUser.split('@')[0]);
        })();

        let senderName = await (async () => {
            const userData = global.db.data.users[m.sender];
            return userData?.name?.trim() || 
                   await conn.getName(m.sender)
                       .then(name => typeof name === 'string' && name.trim() ? name : m.sender.split('@')[0])
                       .catch(() => m.sender.split('@')[0]);
        })();

        // Guardar la transacción pendiente
        pending[m.sender] = {
            'sender': m.sender,
            'to': targetUser,
            'value': totalValue,
            'count': userCharacters.length,
            'ids': userCharacters.map(char => char.id),
            'chat': m.chat,
            'timeout': setTimeout(() => delete pending[m.sender], 60000) // 1 minuto
        };

        await conn.reply(m.chat, 
            '「✿」 *' + senderName + '*, ¿confirmas regalar todo tu harem a *' + targetUserName + 
            '*?\n\n❏ Personajes a transferir: *' + userCharacters.length + 
            '*\n❏ Valor total: *' + totalValue.toLocaleString() + 
            '*\n\n✐ Para confirmar responde a este mensaje con "Aceptar".\n> Esta acción no se puede deshacer, revisa bien los datos antes de confirmar.', 
            m, 
            { mentions: [targetUser] }
        );

    } catch (error) {
        await conn.reply(m.chat, 
            '⚠︎ Se ha producido un problema.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + error.message, 
            m
        );
    }
};

handler.before = async (m, { conn, usedPrefix }) => {
    try {
        const pendingData = pending[m.sender];
        if (!pendingData || m.text?.trim().toLowerCase() !== 'aceptar') return;

        if (m.sender !== pendingData.sender || pendingData.chat !== m.chat) return;

        if (typeof pendingData.to !== 'string' || !pendingData.to.includes('@')) return;

        const senderData = global.db.data.users[m.sender];
        const targetData = global.db.data.users[pendingData.to];

        // Transferir todos los personajes
        for (const charId of pendingData.ids) {
            const charData = global.db.data.characters?.[charId];
            if (!charData || charData.user !== m.sender) continue;

            // Cambiar propietario
            charData.user = pendingData.to;

            // Agregar al usuario destino
            if (!targetData.characters.includes(charId)) {
                targetData.characters.push(charId);
            }

            // Remover del usuario origen
            senderData.characters = senderData.characters.filter(char => char !== charId);

            // Limpiar referencias del usuario origen
            if (senderData.sales?.[charId]?.user === m.sender) {
                delete senderData.sales[charId];
            }

            if (senderData.favorite === charId) {
                delete senderData.favorite;
            }

            if (global.db.data.users[m.sender]?.favorite === charId) {
                delete global.db.data.users[m.sender].favorite;
            }
        }

        clearTimeout(pendingData.timeout);
        delete pending[m.sender];

        let targetUserName = await (async () => {
            const userData = global.db.data.users[pendingData.to];
            return userData?.name?.trim() || 
                   await conn.getName(pendingData.to)
                       .then(name => typeof name === 'string' && name.trim() ? name : pendingData.to.split('@')[0])
                       .catch(() => pendingData.to.split('@')[0]);
        })();

        return await m.reply(
            '「✿」 Has regalado con éxito todos tus personajes a *' + targetUserName + 
            '*!\n\n> ❏ Personajes regalados: *' + pendingData.count + 
            '*\n> 💵 Valor total: *' + pendingData.value.toLocaleString() + '*'
        ), true;

    } catch (error) {
        await conn.reply(m.chat, 
            '> ⚠︎ Se ha producido un problema.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + error.message, 
            m
        );
    }
};

handler.help = ['giveallharem'];
handler.tags = ['gacha'];
handler.command = ['giveallharem'];
handler.group = true;

export default handler;