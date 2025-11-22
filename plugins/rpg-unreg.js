import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender];

    if (!user) {
        return conn.reply(m.chat, 
            `꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 ❐
> ੭੭ ﹙ᰔᩚ﹚ No estás registrado
> .・。.・゜✭・.・✫・゜・。.`,
            m
        );
    }

    const confirmar = text?.toLowerCase();
    if (confirmar !== 'si') {
        return conn.reply(m.chat, 
            `꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 ❐
> ੭੭ ﹙ᰔᩚ﹚ ¿Estás seguro de reiniciar tu registro?
> .・。.・゜✭・.・✫・゜・。.
> Escribe *${usedPrefix + command} si* para confirmar`,
            m
        );
    }

    delete global.db.data.users[m.sender];

    return conn.reply(m.chat, 
        `꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 ❐
> ੭੭ ﹙ᰔᩚ﹚ Registro eliminado exitosamente
> .・。.・゜✭・.・✫・゜・。.`,
        m
    );
};

handler.help = ['unreg'];
handler.tags = ['rg'];
handler.command = ['unreg', 'deregistrar'];

export default handler;