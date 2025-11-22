var handler = async (m, { conn, args }) => {
let group = m.chat
const pp = await conn.profilePictureUrl(group, 'image').catch((_) => 'https://qu.ax/XuhgM.jpg')
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
let message = `> Link del Grupo\n\n> \`Link:\` ${link}`
await conn.sendMessage(group, { image: { url: pp }, caption: message })
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler