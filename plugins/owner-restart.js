let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
    if (!isROwner) return
    try {
        await m.react('🕒')
        m.reply(`> Reiniciando a ${botname}\n> Espera hasta que Nino Nakano-IA se reinicie.`)
        await m.react('✅️')
        setTimeout(() => {
            if (process.send) {
                process.send("restart")
            } else {
                process.exit(0)
            }
        }, 3000)
    } catch (error) {
        await m.react('❎️')
        console.log(error)
    }
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']

export default handler