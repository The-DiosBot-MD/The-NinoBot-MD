import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `> Por favor, ingrese un texto para buscar una Imagen.`, m)
try {
await m.react('🕒')
const res = await getGoogleImageSearch(text)
const urls = await res.getAll()
if (urls.length < 2) return conn.reply(m.chat, '> 💔 No se encontraron suficientes imágenes para un álbum.', m)
const medias = urls.slice(0, 10).map(url => ({ type: 'image', data: { url } }))
const caption = `📚 Resultados de búsqueda para: ${text}`
await conn.sendSylphy(m.chat, medias, { caption, quoted: m })
await m.react('✅️')
} catch (error) {
await m.react('💔')
return conn.reply(m.chat, `> 🍭 Se ha producido un problema.\n> Reportalo en el grupo de soporte.\n\n${e.message}`, m)
}}

handler.help = ['imagen']
handler.tags = ['descargas']
handler.command = ['imagen', 'image']

export default handler

function getGoogleImageSearch(query) {
const apis = [`${global.APIs.delirius.url}/search/gimage?query=${encodeURIComponent(query)}`, `${global.APIs.siputzx.url}/api/images?query=${encodeURIComponent(query)}`]
return { getAll: async () => {
for (const url of apis) {
try {
const res = await axios.get(url)
const data = res.data
if (Array.isArray(data?.data)) {
const urls = data.data.map(d => d.url).filter(u => typeof u === 'string' && u.startsWith('http'))
if (urls.length) return urls
}} catch {}
}
return []
},
getRandom: async () => {
const all = await this.getAll()
return all[Math.floor(Math.random() * all.length)] || null
}}}
