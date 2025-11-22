import ws from "ws"

let handler = async (m, { conn: stars, usedPrefix }) => {
  try {
    // Evita duplicados de bots activos
    let uniqueUsers = new Map()

    global.conns.forEach((conn) => {
      if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
        uniqueUsers.set(conn.user.jid, conn)
      }
    })

    // Convertimos a array
    let users = [...uniqueUsers.values()]
    let totalSubs = users.length - 1 // Resta el bot principal si existe

    if (users.length === 0) {
      return m.reply("✿ No hay sub-bots activos actualmente.")
    }

    // Construcción del mensaje
    let message = users.map((v, index) => {
      const num = v.user.jid.replace(/[^0-9]/g, "")
      const nombre = v.user.name || "Sub-Bot"
      const tipo = v.user.jid === global.conn.user.jid ? "Principal" : "Sub-Bot"
      const uptime = v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "Activo recientemente"

      return `╭─⬣「 ${global.packname || "Sophia Wa Bot"} 」⬣
│🌸 *${index + 1}.* ${tipo}
│❀ *Nombre:* ${nombre}
│❀ *Número:* ${num}
│❀ *Link:* https://wa.me/${num}
│❀ *Online:* ${uptime}
╰─⬣`
    }).join("\n\n")

    const totalText = `╭━〔 🌸 𝗦𝗨𝗕-𝗕𝗢𝗧𝗦 𝗖𝗢𝗡𝗘𝗖𝗧𝗔𝗗𝗢𝗦 🌸 〕⬣
┃ ✦ *Principal:* 1
┃ ✿ *Sub-Bots:* ${totalSubs < 0 ? 0 : totalSubs}
╰━━━━━━━━━━━━⬣

${message}`.trim()

    // Enviar lista sin etiquetar, solo con wa.me
    await stars.sendMessage(
      m.chat,
      {
        text: totalText,
        contextInfo: {
          externalAdReply: {
            title: "🌸 Lista de Sub-Bots Activos",
            body: "Sophia Wa Bot System",
            previewType: "PHOTO",
            thumbnailUrl: "https://qu.ax/dCvhu.jpg",
            sourceUrl: "https://wa.me/" + global.conn.user.jid.replace(/[^0-9]/g, "")
          }
        }
      },
      { quoted: m }
    )
  } catch (error) {
    console.error(error)
    m.reply(`⚠︎ Se ha producido un error.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
  }
}

handler.help = ["botlist2", "listbots2", "listbot2", "bots2", "sockets2", "socket2"]
handler.tags = ["serbot"]
handler.command = ["botlist2", "listbots2", "listbot2", "bots2", "sockets2", "socket2"]

export default handler

// 🔹 Función auxiliar
function convertirMsADiasHorasMinutosSegundos(ms) {
  const segundos = Math.floor(ms / 1000)
  const minutos = Math.floor(segundos / 60)
  const horas = Math.floor(minutos / 60)
  const días = Math.floor(horas / 24)
  const segRest = segundos % 60
  const minRest = minutos % 60
  const horasRest = horas % 24
  let resultado = ""
  if (días) resultado += `${días}d `
  if (horasRest) resultado += `${horasRest}h `
  if (minRest) resultado += `${minRest}m `
  if (segRest) resultado += `${segRest}s`
  return resultado.trim()
}
