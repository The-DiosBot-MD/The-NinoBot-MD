import fs from 'fs'
import { WAMessageStubType } from '@whiskeysockets/baileys'

async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
    const username = `@${userId.split('@')[0]}`
    const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://qu.ax/VEZXc.jpg')
    const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
    const groupSize = groupMetadata.participants.length + 1
    const desc = groupMetadata.desc?.toString() || 'Sin descripción'
    const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `*${groupMetadata.subject}*`).replace(/{desc}/g, `${desc}`)
    
    const caption = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐀/𝐖𝐄𝐋𝐂𝐎𝐌𝐄 ❐
> ੭੭ ﹙ᰔᩚ﹚ ¡Bienvenido a *${groupMetadata.subject}*!
> ੭੭ ﹙ᰔᩚ﹚ ❏ Usuario » ${username}
> ੭੭ ﹙ᰔᩚ﹚ ❏ ${mensaje}
> ੭੭ ﹙ᰔᩚ﹚ ❏ Miembros » *${groupSize}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ Fecha » ${fecha}
> .・。.・゜✭・.・✫・゜・。.
> ੭੭ ﹙ᰔᩚ﹚ ฅ^•ﻌ•^ฅ ¡Disfruta tu estadía!
> .・。.・゜✭・.・✫・゜・。.
`

    return { pp, caption, mentions: [userId] }
}

async function generarDespedida({ conn, userId, groupMetadata, chat }) {
    const username = `@${userId.split('@')[0]}`
    const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://qu.ax/BeRET.jpg')
    const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
    const groupSize = groupMetadata.participants.length - 1
    const desc = groupMetadata.desc?.toString() || 'Sin descripción'
    const mensaje = (chat.sBye || 'Edita con el comando "setbye"').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `${groupMetadata.subject}`).replace(/{desc}/g, `*${desc}*`)
    
    const caption = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐃𝐄𝐒𝐏𝐄𝐃𝐈𝐃𝐀 𝐁𝐘𝐄 ❐
> ੭੭ ﹙ᰔᩚ﹚ Adiós de *${groupMetadata.subject}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ Usuario » ${username}
> ੭੭ ﹙ᰔᩚ﹚ ❏ ${mensaje}
> ੭੭ ﹙ᰔᩚ﹚ ❏ Miembros » *${groupSize}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ Fecha » ${fecha}
> .・。.・゜✭・.・✫・゜・。.
> ੭੭ ﹙ᰔᩚ﹚ (˶˃⤙˂˶) ¡Te esperamos pronto!
> .・。.・゜✭・.・✫・゜・。.
`

    return { pp, caption, mentions: [userId] }
}

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return !0
    const primaryBot = global.db.data.chats[m.chat].primaryBot
    if (primaryBot && conn.user.jid !== primaryBot) throw !1
    const chat = global.db.data.chats[m.chat]
    const userId = m.messageStubParameters[0]
    
    if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        const { pp, caption, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })
        rcanal.contextInfo.mentionedJid = mentions
        await conn.sendMessage(m.chat, { image: { url: pp }, caption, ...rcanal }, { quoted: null })
        try { fs.unlinkSync(img) } catch {}
    }
    
    if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
        const { pp, caption, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })
        rcanal.contextInfo.mentionedJid = mentions
        await conn.sendMessage(m.chat, { image: { url: pp }, caption, ...rcanal }, { quoted: null })
        try { fs.unlinkSync(img) } catch {}
    }
}

export { generarBienvenida, generarDespedida }
export default handler