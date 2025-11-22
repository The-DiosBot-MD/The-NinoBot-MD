import fetch from 'node-fetch'
import { lookup } from 'mime-types'

let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '> Te faltó el enlace de Mediafire.', m)
if (!/^https:\/\/www\.mediafire\.com\//i.test(text)) return conn.reply(m.chat, '> 💔 Enlace inválido.', m)
try {
await m.react('🕒')
const res = await fetch(`${global.APIs.delirius.url}/download/mediafire?url=${encodeURIComponent(text)}`)
const json = await res.json()
const data = json.data
if (!json.status || !data?.filename || !data?.link) { throw '> No se pudo obtener el archivo desde Delirius.' }
const filename = data.filename
const filesize = data.size || 'desconocido'
const mimetype = data.mime || lookup(data.extension?.toLowerCase()) || 'application/octet-stream'
const dl_url = data.link.includes('u=') ? decodeURIComponent(data.link.split('u=')[1]) : data.link
const caption = `乂 MEDIAFIRE - DESCARGA 乂\n\n📜 Nombre » ${filename}\n✩ Peso » ${filesize}\n🕑 MimeType » ${mimetype}\n🖇 Enlace » ${text}`
await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: filename, mimetype, caption }, { quoted: m })
await m.react('✅️')
} catch (e) {
await m.react('💔')
return conn.reply(m.chat, `> 🍭 Se ha producido un problema.\n> Reportalo en el grupo de soporte.\n\n${e.message}`, m)
}}

handler.command = ['mf', 'mediafire']
handler.help = ['mediafire']
handler.tags = ['descargas']
handler.group = true
handler.premium = true

export default handler