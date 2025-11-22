import fetch from 'node-fetch'
import fs from 'fs'
import { generarBienvenida, generarDespedida } from './_welcome.js'

const handler = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {
    const value = text ? text.trim() : ''
    const chat = global.db.data.chats[m.chat]
    
    if (command === 'setgp') {
        return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄𝐋 𝐖𝐄𝐋𝐂𝐎𝐌𝐄-𝐍𝐊 ❐
> ੭੭ ﹙ᰔᩚ﹚ Ingresa la categoría que deseas modificar
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}gpname\` <nuevo nombre>
> ⤷ Cambia el nombre del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}gpdesc\` <nueva descripción>
> ⤷ Modifica la descripción del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}gpbanner\` <imagen>
> ⤷ Establece nueva imagen del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}setwelcome\` <mensaje>
> ⤷ Configura mensaje de bienvenida

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}setbye\` <mensaje>
> ⤷ Establece mensaje de despedida

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}testwelcome\`
> ⤷ Simula mensaje de bienvenida

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`${usedPrefix}testbye\`
> ⤷ Simula mensaje de despedida
> .・。.・゜✭・.・✫・゜・。.
`)
    }
    
    try {
        switch (command) {
            case 'setwelcome': {
                if (!value) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Debes enviar un mensaje para establecerlo
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ 𝐕𝐚𝐫𝐢𝐚𝐛𝐥𝐞𝐬 𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞 :
> ❏ \`{usuario}\` - Menciona al usuario
> ❏ \`{grupo}\` - Nombre del grupo  
> ❏ \`{desc}\` - Descripción del grupo
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Ejemplo:
> ❏ \`${usedPrefix}setwelcome Bienvenido {usuario} a {grupo}!\`
> .・。.・゜✭・.・✫・゜・。.
`)
                chat.sWelcome = value
                m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐀 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Mensaje de bienvenida establecido
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Usa \`${usedPrefix}testwelcome\`
> ⤷ Para ver cómo se verá el mensaje
> .・。.・゜✭・.・✫・゜・。.
`)
                break
            }
            
            case 'setbye': {
                if (!value) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐃𝐄𝐒𝐏𝐄𝐃𝐈𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Debes enviar un mensaje para establecerlo
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ 𝐕𝐚𝐫𝐢𝐚𝐛𝐥𝐞𝐬 𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞:
> ❏ \`{usuario}\` - Menciona al usuario
> ❏ \`{grupo}\` - Nombre del grupo  
> ❏ \`{desc}\` - Descripción del grupo
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Ejemplo:
> ❏ \`${usedPrefix}setbye Adiós {usuario}, te extrañaremos en {grupo}!\`
> .・。.・゜✭・.・✫・゜・。.
`)
                chat.sBye = value
                m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐃𝐄𝐒𝐏𝐄𝐃𝐈𝐃𝐀 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Mensaje de despedida establecido
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Usa \`${usedPrefix}testbye\`
> ⤷ Para ver cómo se verá el mensaje
> .・。.・゜✭・.・✫・゜・。.
`)
                break
            }
            
            case 'testwelcome': {
                if (!chat.sWelcome) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐓𝐄𝐒𝐓 𝐃𝐄 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ No hay mensaje de bienvenida configurado
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Usa \`${usedPrefix}setwelcome\`
> ⤷ Para configurar un mensaje primero
> .・。.・゜✭・.・✫・゜・。.
`)
                const { pp: ppWel, caption: captionWel, mentions: mentionsWel } = await generarBienvenida({ conn, userId: m.sender, groupMetadata, chat })
                await conn.sendMessage(m.chat, { image: { url: ppWel }, caption: captionWel, mentions: mentionsWel }, { quoted: m })
                try { fs.unlinkSync(ppWel) } catch {}
                break
            }
            
            case 'testbye': {
                if (!chat.sBye) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐓𝐄𝐒𝐓 𝐃𝐄 𝐃𝐄𝐒𝐏𝐄𝐃𝐈𝐃𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ No hay mensaje de despedida configurado
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Usa \`${usedPrefix}setbye\`
> ⤷ Para configurar un mensaje primero
> .・。.・゜✭・.・✫・゜・。.
`)
                const { pp: ppBye, caption: captionBye, mentions: mentionsBye } = await generarDespedida({ conn, userId: m.sender, groupMetadata, chat })
                await conn.sendMessage(m.chat, { image: { url: ppBye }, caption: captionBye, mentions: mentionsBye }, { quoted: m })
                try { fs.unlinkSync(ppBye) } catch {}
                break
            }
        }
    } catch (e) {
        m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐄𝐑𝐑𝐎𝐑 ❐
> ੭੭ ﹙ᰔᩚ﹚ Se ha producido un problema
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Usa \`${usedPrefix}report\`
> ⤷ Para informar este problema
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Error: ${e.message}
> .・。.・゜✭・.・✫・゜・。.
`)
    }
}

handler.help = ['setwelcome', 'setbye', 'testwelcome', 'testbye']
handler.tags = ['group']
handler.command = ['setgp', 'setwelcome', 'setbye', 'testwelcome', 'testbye']
handler.admin = true
handler.group = true

export default handler