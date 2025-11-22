import { promises as fs } from 'fs';

const charactersFilePath = './lib/characters.json';

async function loadCharacters() {
    const data = await fs.readFile(charactersFilePath, 'utf-8');
    return JSON.parse(data);
}

function getCharacterById(characterId, charactersData) {
    return Object.values(charactersData)
        .flatMap(series => series.characters)
        .find(character => character.id === characterId);
}

let handler = async (m, { conn, usedPrefix, command }) => {
    const chatData = global.db.data.chats?.[m.chat] || {};
    if (!chatData.gacha && m.isGroup) {
        return m.reply('> Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *' + usedPrefix + 'gacha on*');
    }

    try {
        const user = global.db.data.users[m.sender];
        const currentTime = Date.now();
        const cooldown = 2 * 60 * 1000; // 2 minutos

        if (user.lastClaim && currentTime < user.lastClaim) {
            const remainingSeconds = Math.ceil((user.lastClaim - currentTime) / 1000);
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;

            let timeString = '';
            if (minutes > 0) timeString += minutes + ' minuto' + (minutes !== 1 ? 's' : '') + ' ';
            if (seconds > 0 || timeString === '') timeString += seconds + ' segundo' + (seconds !== 1 ? 's' : '');

            return m.reply('> Debes esperar *' + timeString.toLowerCase() + '* para usar *' + (usedPrefix + command) + '* de nuevo.');
        }

        // Verificar si hay un personaje rodado recientemente
        const lastRolledId = chatData.lastRolledId || '';
        const lastRolledMsgId = chatData.lastRolledMsgId || '';
        const lastRolledCharacter = chatData.lastRolledCharacter || {};

        // Verificar de múltiples maneras si es una reclamación válida
        const isValidClaim = 
            (m.quoted?.id === lastRolledMsgId) || 
            (m.quoted?.text?.includes(lastRolledId)) ||
            (lastRolledId && lastRolledCharacter.id === lastRolledId);

        if (!isValidClaim || !lastRolledId) {
            return m.reply('> 🎴 *No hay personaje para reclamar*\n\n» Usa primero *' + usedPrefix + 'roll* para obtener un personaje\n» Luego responde a ese mensaje con *' + usedPrefix + 'claim*');
        }

        const characterId = lastRolledId;
        const charactersData = await loadCharacters();
        const characterInfo = getCharacterById(characterId, charactersData);

        if (!characterInfo) {
            return m.reply('> ❌ *Personaje no encontrado*\nEl personaje ya no está disponible en la base de datos.');
        }

        if (!global.db.data.characters) global.db.data.characters = {};
        if (!global.db.data.characters[characterId]) {
            global.db.data.characters[characterId] = {};
        }

        const character = global.db.data.characters[characterId];
        character.name = character.name || characterInfo.name;
        character.value = typeof character.value === 'number' ? character.value : characterInfo.value || 0;
        character.votes = character.votes || 0;

        // Verificar si está reservado
        if (character.reservedBy && character.reservedBy !== m.sender && currentTime < character.reservedUntil) {
            let reservedByName = await (async () => {
                const userData = global.db.data.users[character.reservedBy];
                return userData?.name || 
                       await conn.getName(character.reservedBy)
                           .then(name => typeof name === 'string' && name.trim() ? name : character.reservedBy.split('@')[0])
                           .catch(() => character.reservedBy.split('@')[0]);
            })();

            const remainingTime = Math.ceil((character.reservedUntil - currentTime) / 1000);
            return m.reply('> ⏳ *Personaje reservado*\n\n» *' + character.name + '* está protegido por *' + reservedByName + '*\n» Tiempo restante: *' + remainingTime + ' segundos*');
        }

        // Verificar si ha expirado
        if (character.expiresAt && currentTime > character.expiresAt && !character.user && 
            !(character.reservedBy && currentTime < character.reservedUntil)) {
            const expiredTime = Math.ceil((currentTime - character.expiresAt) / 1000);
            return m.reply('> ⏰ *Personaje expirado*\n\n» *' + character.name + '* ya no está disponible\n» Expiró hace *' + expiredTime + ' segundos*');
        }

        // Verificar si ya está reclamado
        if (character.user) {
            let ownerName = await (async () => {
                const userData = global.db.data.users[character.user];
                return userData?.name || 
                       await conn.getName(character.user)
                           .then(name => typeof name === 'string' && name.trim() ? name : character.user.split('@')[0])
                           .catch(() => character.user.split('@')[0]);
            })();

            return m.reply('> ❗ *Personaje ya reclamado*\n\n» *' + character.name + '* ya pertenece a *' + ownerName + '*\n» Usa *' + usedPrefix + 'roll* para obtener otro personaje');
        }

        // Reclamar el personaje
        character.user = m.sender;
        character.claimedAt = currentTime;
        delete character.reservedBy;
        delete character.reservedUntil;

        // Actualizar cooldown
        user.lastClaim = currentTime + cooldown;

        // Agregar a la lista de personajes del usuario
        if (!Array.isArray(user.characters)) user.characters = [];
        if (!user.characters.includes(characterId)) {
            user.characters.push(characterId);
        }

        await conn.reply(m.chat, `> ✅️ Has reclamado a *${character.name}* con éxito.`, m);

    } catch (error) {
        console.error('Error en comando claim:', error);
        await conn.reply(m.chat, 
            '> ⚠️ *Error en el sistema*\n\n» Usa *' + usedPrefix + 'report* para informar este problema\n» Error: ' + error.message, 
            m
        );
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['claim', 'c', 'reclamar'];
handler.group = true;

export default handler;