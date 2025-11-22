import { search, download } from 'aptoide-scraper'

var handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `> Por favor, ingrese el nombre de la apk para descargarlo.`, m)
try {
await m.react('🕒')
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let txt = `*乂  APTOIDE - DESCARGAS 乂*\n\n`
txt += `📜 Nombre : ${data5.name}\n`
txt += `🔰 Package : ${data5.package}\n`
txt += `♻️ Update : ${data5.lastup}\n`
txt += `📥 Peso :  ${data5.size}`
await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m)
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.reply(m.chat, `> El archivo es demasiado pesado.`, m)
}
await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m })
await m.react('✅️')
} catch (error) {
await m.react('💔')
return conn.reply(m.chat, `> 🍭 Se ha producido un problema.\n> Reportalo en el grupo de soporte.\n\n${e.message}`, m)
}}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true
handler.premium = true

export default handler
