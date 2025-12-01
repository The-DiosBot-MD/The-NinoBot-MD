let mutedUsers = new Set();

let handler = async (m, { conn, usedPrefix, command, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) return conn.reply(m.chat, '> `❌ PERMISOS INSUFICIENTES`\n\n> `🤖 El bot necesita ser administrador.`', m);
    if (!isAdmin) return conn.reply(m.chat, '> `❌ PERMISOS INSUFICIENTES`\n\n> `👑 Solo los administradores pueden usar este comando.`', m);

    let user;
    if (m.quoted) {
        user = m.quoted.sender;
    } else {
        return conn.reply(m.chat, '> ❌️ `USUARIO NO ESPECIFICADO`\n\n> `📝 Responde al mensaje del usuario que quieres mutear.`', m);
    }

    if (command === "mute") {
        mutedUsers.add(user);
        conn.reply(m.chat, '> ✅️ `USUARIO MUTEADO`\n\n> 👤 `Usuario:` @' + user.split('@')[0], m, { mentions: [user] });
    } else if (command === "unmute") {
        mutedUsers.delete(user);
        conn.reply(m.chat, '> ✅️ `USUARIO DESMUTEADO`\n\n> 👤 `Usuario:` @' + user.split('@')[0], m, { mentions: [user] });
    }
};

handler.before = async (m, { conn }) => {
    if (mutedUsers.has(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
            console.log(`Mensaje eliminado de usuario muteado: ${m.sender}`);
        } catch (e) {
            console.error('Error al eliminar mensaje:', e);
        }
        return true; // Detiene el procesamiento del mensaje
    }
};

handler.help = ['mute', 'unmute'];
handler.tags = ['group'];
handler.command = ['mute', 'unmute'];
handler.group = true;
handler.botAdmin = true;
handler.rowner = true;

export default handler;