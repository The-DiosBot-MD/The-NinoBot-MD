import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://qu.ax/dUnYd.jpg')
let user = global.db.data.users[m.sender]
let name2 = conn.getName(m.sender)

if (user.registered === true) 
return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ Ya estás registrado
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ¿Quieres volver a registrarte?
> ⤷ Usa \`${usedPrefix}unreg\` para eliminar tu registro
> .・。.・゜✭・.・✫・゜・。.
`)

if (!Reg.test(text)) 
return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ Formato incorrecto
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ Uso: \`${usedPrefix + command} nombre.edad\`
> ⤷ Ejemplo: \`${usedPrefix + command} ${name2}.18\`
> .・。.・゜✭・.・✫・゜・。.
`)

let [_, name, splitter, age] = text.match(Reg)
if (!name) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ El nombre no puede estar vacío
> .・。.・゜✭・.・✫・゜・。.
`)
if (!age) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ La edad no puede estar vacía
> .・。.・゜✭・.・✫・゜・。.
`)
if (name.length >= 100) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ El nombre es demasiado largo
> .・。.・゜✭・.・✫・゜・。.
`)

age = parseInt(age)
if (age > 1000) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ Wow, el abuelo quiere jugar con el bot
> .・。.・゜✭・.・✫・゜・。.
`)
if (age < 5) return m.reply(`
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆 ❐
> ੭੭ ﹙ᰔᩚ﹚ Hay un bebé queriendo usar el bot jsjs
> .・。.・゜✭・.・✫・゜・。.
`)

user.name = name + '✓'.trim()
user.age = age
user.regTime = + new Date      
user.registered = true

let recompensa = {
money: 40,
estrellas: 10,
exp: 300,
joincount: 20
}
user.coin += recompensa.money
user.exp += recompensa.exp
user.joincount += recompensa.joincount

if (global.db && global.db.write) {
await global.db.write()
}

let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

// Obtener país del usuario
let phoneNumber = m.sender.split('@')[0]
let country = 'Desconocido'
try {
let pn = new PhoneNumber('+' + phoneNumber)
if (pn.isValid()) {
country = pn.getRegionCode() || 'Desconocido'
}
} catch (e) {
console.log('Error al obtener país:', e)
}

// Obtener fecha actual
let now = new Date()
let fecha = now.toLocaleDateString('es-ES', {
day: '2-digit',
month: '2-digit', 
year: 'numeric'
})

// Mensaje para el canal CON LA MISMA DECORACIÓN + EMOJIS
let canalMsg = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 🎀 𝐍𝐔𝐄𝐕𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐍𝐊 🎀 ❐
> ੭੭ ﹙ᰔᩚ﹚ 📝 *Nombre » ${name}*
> ੭੭ ﹙ᰔᩚ﹚ 🎂 *Edad » ${age} años*
> ੭੭ ﹙ᰔᩚ﹚ 🌍 *País » ${country}*
> ੭੭ ﹙ᰔᩚ﹚ 🆔 *ID » ${sn}*
> ੭੭ ﹙ᰔᩚ﹚ 📅 *Fecha » ${fecha}*
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ *🌸 ¡Bienvenido a Las Quintillizas IA!*
> ੭੭ ﹙ᰔᩚ﹚ *✨ Disfruta de tu experiencia con nosotras*
> .・。.・゜✭・.・✫・゜・。.
`.trim()

// Mensaje para el usuario
let regbot = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐄𝐗𝐈𝐓𝐎𝐒𝐎 ✅ ❐
> ੭੭ ﹙ᰔᩚ﹚ ¡Bienvenido a Nino Nakano IA!
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐃𝐀𝐓𝐎𝐒 𝐃𝐄𝐋 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 ❐
> ੭੭ ﹙ᰔᩚ﹚ ❏ Nombre » *${name}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ Edad » *${age} años*
> ੭੭ ﹙ᰔᩚ﹚ ❏ País » *${country}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ ID » *${sn}*
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐑𝐄𝐂𝐎𝐌𝐏𝐄𝐍𝐒𝐀𝐒 ❐
> ੭੭ ﹙ᰔᩚ﹚ ❏ 💵 Dinero » *+${recompensa.money}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ 🌟 Estrellas » *+${recompensa.estrellas}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ 📈 EXP » *+${recompensa.exp}*
> ੭੭ ﹙ᰔᩚ﹚ ❏ 🎟️ Tokens » *+${recompensa.joincount}*
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ✅ 𝐕𝐄𝐑𝐈𝐅𝐈𝐂𝐀 𝐓𝐔 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐄𝐍 𝐄𝐋 𝐂𝐀𝐍𝐀𝐋 𝐎𝐅𝐈𝐂𝐈𝐀𝐋 𝐃𝐄 𝐑𝐄𝐆 ✅
> ੭੭ ﹙ᰔᩚ﹚ 📢 https://whatsapp.com/channel/0029Vb7N3fdBfxo9zc1lIa0T
> .・。.・゜✭・.・✫・゜・。.
`.trim()

await m.react('📩')

// Enviar mensaje al canal CON IMAGEN URL
try {
console.log('🔄 Intentando enviar mensaje al canal con imagen URL...')
console.log('📋 ID del canal:', '120363405131733698@newsletter')

const canalID = '120363405131733698@newsletter'

// Enviar mensaje al canal con imagen URL
await conn.sendMessage(canalID, { 
image: { url: 'https://qu.ax/uTlLp.jpg' },
caption: canalMsg
})

console.log('✅ Mensaje con imagen URL enviado al canal exitosamente')

} catch (e) {
console.log('❌ Error al enviar al canal con imagen URL:', e)

// Intentar método alternativo sin imagen
try {
console.log('🔄 Intentando método alternativo sin imagen...')
await conn.sendMessage(canalID, {
text: canalMsg
})
console.log('✅ Mensaje alternativo enviado al canal')
} catch (e2) {
console.log('❌ Error con método alternativo:', e2)
}
}

// Enviar mensaje al usuario
await conn.sendMessage(m.chat, {
text: regbot,
contextInfo: {
externalAdReply: {
title: '𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙏𝙄𝙊𝙉 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼 ✅✨',
body: '*Nino Nakano IA - Registro completado*',
thumbnailUrl: pp,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: m })
}; 

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler