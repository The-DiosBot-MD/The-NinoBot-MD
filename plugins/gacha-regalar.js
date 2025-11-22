import { promises as fs } from 'fs';

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

let handler = async (m, { conn, args, usedPrefix, command }) => {
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

        if (!args.length) {
            return m.reply('> Debes escribir el nombre del personaje y citar o mencionar al usuario que lo recibirá');
        }

        const mentionedUsers = await m.mentionedJid;
        const targetUser = mentionedUsers[0] || 
                          m.quoted && await m.quoted.sender;

        if (!targetUser) {
            return m.reply('> Debes mencionar o citar el mensaje del destinatario.');
        }

        // Obtener el nombre del personaje
        const characterName = m.quoted ? 
            args.join(' ').toLowerCase().trim() : 
            args.slice(0, -1).join(' ').toLowerCase().trim();

        // Buscar el personaje en los personajes del usuario
        const characterId = Object.keys(global.db.data.characters).find(charId => {
            const charData = global.db.data.characters[charId];
            return typeof charData.name === 'string' && 
                   charData.name.toLowerCase() === characterName && 
                   charData.user === m.sender;
        });

        if (!characterId) {
            return m.reply('> No se encontró el personaje *' + characterName + '* o no está reclamado por ti.');
        }

        const character = global.db.data.characters[characterId];

        // Verificar que el usuario tiene el personaje
        if (!user.characters.includes(characterId)) {
            return m.reply('🎴 *' + character.name + '* no está reclamado por ti.');
        }

        const targetUserData = global.db.data.users[targetUser];
        if (!targetUserData) {
            return m.reply('> El usuario mencionado no está registrado.');
        }

        if (!Array.isArray(targetUserData.characters)) {
            targetUserData.characters = [];
        }

        // Transferir el personaje
        if (!targetUserData.characters.includes(characterId)) {
            targetUserData.characters.push(characterId);
        }

        // Remover del usuario actual
        user.characters = user.characters.filter(char => char !== characterId);
        character.user = targetUser;

        // Limpiar referencias del usuario actual
        if (user.sales?.[characterId]?.user === m.sender) {
            delete user.sales[characterId];
        }

        if (user.favorite === characterId) {
            delete user.favorite;
        }

        if (global.db.data.users[m.sender]?.favorite === characterId) {
            delete global.db.data.users[m.sender].favorite;
        }

        // Obtener nombres para el mensaje
        let senderName = await (async () => {
            const userData = global.db.data.users[m.sender];
            return userData?.name?.trim() || 
                   await conn.getName(m.sender)
                       .then(name => typeof name === 'string' && name.trim() ? name : m.sender.split('@')[0])
                       .catch(() => m.sender.split('@')[0]);
        })();

        let targetUserName = await (async () => {
            const userData = global.db.data.users[targetUser];
            return userData?.name?.trim() || 
                   await conn.getName(targetUser)
                       .then(name => typeof name === 'string' && name.trim() ? name : targetUser.split('@')[0])
                       .catch(() => targetUser.split('@')[0]);
        })();

        await conn.reply(m.chat, 
            '🎴 *' + character.name + '* ha sido regalado a *' + targetUserName + '* por *' + senderName + '*.', 
            m, 
            { mentions: [targetUser] }
        );

    } catch (error) {
        await conn.reply(m.chat, 
            '> ⚠︎ Se ha producido un problema.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + error.message, 
            m
        );
    }
};

handler.help = ['givechar'];
handler.tags = ['gacha'];
handler.command = ['givechar', 'givewaifu', 'regalar'];
handler.group = true;

export default handler;