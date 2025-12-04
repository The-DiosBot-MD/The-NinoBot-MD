import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = "" //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = ["573187418668", "59169082575","59897167729", "5216671548329", "5355699866"]
global.suittag = ["16503058299"] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = "Baileys Multi Device"
global.vs = "^1.8.2|Latest"
global.nameqr = "NinoQr"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.ninoJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botname = '𝐍𝐢𝐧𝐨 𝐍𝐚𝐤𝐚𝐧𝐨-𝐈𝐀 ✨'
global.wm = '𝑪𝒓𝒆𝒂𝒅𝒐𝒓 𝑮𝒍𝒐𝒃𝒂𝒍-𝑵𝑲 👑'
global.author = 'ᴇᴄʜᴏ ᴘᴏʀ ʟᴏs ɢʟᴏʙᴀʟ-ɴᴋ'
global.dev = 'ᴘᴏᴡᴇʀᴅ ʙʏ ɢʟᴏʙᴀʟ-ɴᴋ'
global.textbot = '🍃 ɴɪɴᴏ ɴᴀᴋᴀɴᴏ-ɪᴀ ʙʏ ɢʟᴏʙᴀʟ sᴛᴀғғ'
global.etiqueta = 'ᴄʟᴏʙᴀʟ-ɴᴋ'
global.currency = "¥enes"
global.banner = "https://cdn.russellxz.click/44289a68.jpg"
global.icono = "https://cdn.russellxz.click/56494011.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/BgwuxcoL0ZVB0NdK1Qa7RD'
global.comunidad1 = 'https://chat.whatsapp.com/BXxWuamOOE4K9eKC623FIO'
global.channel = 'https://whatsapp.com/channel/0029VbBBXTr5fM5flFaxsO06'
global.channel2 = 'https://whatsapp.com/channel/0029VbBvZH5LNSa4ovSSbQ2N'
global.md = 'https://github.com/xzzys26/NinoNakano-IA'
global.correo = 'xzzysultra@gmail.com'
global.cn = 'https://whatsapp.com/channel/0029VbBvZH5LNSa4ovSSbQ2N'
global.ch = {
    ch1: '120363404434164076@newsletter',
    ch2: '120363403726798403@newsletter',
    ch3: '120363404434164076@newsletter',
    ch4: '120363403726798403@newsletter',
    ch5: '120363404434164076@newsletter',
    ch6: '120363403726798403@newsletter',
    ch7: '120363404434164076@newsletter' 
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
xyro: { url: "https://api.xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})
