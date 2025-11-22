const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"))
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util'
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = "> 𝘾𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙧𝙨𝙚 𝙚𝙣 𝙨𝙪𝙗 𝙗𝙤𝙩✨\n\n> 𝙐𝙩𝙞𝙡𝙞𝙘𝙚 𝙤𝙩𝙧𝙤 𝙘𝙚𝙡𝙪𝙡𝙖𝙧 𝙥𝙖𝙧𝙖 𝙚𝙨𝙘𝙖𝙣𝙚𝙖𝙧 𝙚𝙨𝙩𝙚 𝙘𝙤́𝙙𝙞𝙜𝙤 𝙌𝙍 𝙤 𝙚𝙨𝙘𝙖𝙣𝙚𝙖 𝙚𝙡 𝙘𝙤́𝙙𝙞𝙜𝙤 𝙢𝙚𝙙𝙞𝙖𝙣𝙩𝙚 𝙪𝙣𝙖 𝙋𝘾 𝙥𝙖𝙧𝙖 𝙘𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙧𝙩𝙚 𝙚𝙣 𝙎𝙪𝙗 𝘽𝙤𝙩*\n\n> 𝟭 ❑ 𝙃𝙖𝙜𝙖 𝙘𝙡𝙞𝙘 𝙚𝙣 𝙡𝙤𝙨 𝙩𝙧𝙚𝙨 𝙥𝙪𝙣𝙩𝙤𝙨 𝙚𝙣 𝙡𝙖 𝙚𝙨𝙦𝙪𝙞𝙣𝙖 𝙨𝙪𝙥𝙚𝙧𝙞𝙤𝙧 𝙙𝙚𝙧𝙚𝙘𝙝𝙖\n\n> 𝟮 ❑ 𝙏𝙤𝙘𝙖 𝙙𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙙𝙤𝙨\n\n> 𝟯 ❑ 𝙀𝙨𝙘𝙖𝙣𝙚𝙚 𝙚𝙨𝙩𝙚 𝙘𝙤𝙙𝙞𝙜𝙤 𝙌𝙍 𝙥𝙖𝙧𝙖 𝙞𝙣𝙞𝙘𝙞𝙖𝙧 𝙨𝙚𝙨𝙞𝙤́𝙣\n\n> ☕️ 𝙀𝙨𝙩𝙚 𝙘𝙤𝙙𝙞𝙜𝙤 𝙌𝙍 𝙚𝙭𝙥𝙞𝙧𝙖 𝙚𝙣 𝟰𝟱 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨";
let rtx2 = "> 𝘾𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙧𝙨𝙚 𝙚𝙣 𝙨𝙪𝙗 𝙗𝙤𝙩✨\n\n> 𝙐𝙨𝙖 𝙚𝙨𝙩𝙚 𝘾𝙤𝙙𝙞𝙜𝙤 𝙥𝙖𝙧𝙖 𝙘𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙧𝙩𝙚 𝙚𝙣 𝙪𝙣 𝙎𝙪𝙗 𝘽𝙤𝙩\n\n> 𝟭 ❑ 𝙃𝙖𝙜𝙖 𝙘𝙡𝙞𝙘 𝙚𝙣 𝙡𝙤𝙨 𝙩𝙧𝙚𝙨 𝙥𝙪𝙣𝙩𝙤𝙨 𝙚𝙣 𝙡𝙖 𝙚𝙨𝙦𝙪𝙞𝙣𝙖 𝙨𝙪𝙥𝙚𝙧𝙞𝙤𝙧 𝙙𝙚𝙧𝙚𝙘𝙝𝙖\n\n> 𝟮 ❑ 𝙏𝙤𝙘𝙖 𝙙𝙞𝙨𝙥𝙤𝙨𝙞𝙩𝙞𝙫𝙤𝙨 𝙫𝙞𝙣𝙘𝙪𝙡𝙖𝙙𝙤𝙨\n\n> 𝟯 ❑ 𝙎𝙚𝙡𝙚𝙘𝙘𝙞𝙤𝙣𝙖 𝙑𝙞𝙣𝙘𝙪𝙡𝙖𝙧 𝙘𝙤𝙣 𝙚𝙡 𝙣𝙪𝙢𝙚𝙧𝙤 𝙙𝙚 𝙩𝙚𝙡𝙚́𝙛𝙤𝙣𝙤\n\n> 𝟰 ❑ 𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝘾𝙤𝙙𝙞𝙜𝙤\n\n> ☕️ 𝙀𝙨𝙩𝙚 𝙘𝙤𝙙𝙞𝙜𝙤 𝙨𝙤𝙡𝙤 𝙛𝙪𝙣𝙘𝙞𝙤𝙣𝙖 𝙚𝙣 𝙚𝙡 𝙣𝙪́𝙢𝙚𝙧𝙤 𝙦𝙪𝙚 𝙡𝙤 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙤";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ninoJBOptions = {}
if (global.conns instanceof Array) console.log()
else global.conns = []
function isSubBotConnected(jid) { return global.conns.some(sock => sock?.user?.jid && sock.user.jid.split("@")[0] === jid.split("@")[0]) }
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`> El Comando *${command}* está desactivado temporalmente.`)
let time = global.db.data.users[m.sender].Subs + 120000
if (new Date - global.db.data.users[m.sender].Subs < 120000) return conn.reply(m.chat, `> Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m)
let socklimit = [...new Set(global.conns.filter(conn => conn?.user?.jid && conn.ws?.socket?.readyState !== ws.CLOSED).map(conn => conn.user.jid))].filter(Boolean).length
if (socklimit >= 50) return m.reply(`> No se han encontrado espacios para *Sub-Bots* disponibles.`)
let mentionedJid = await m.mentionedJid
let who = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split`@`[0]}`
let pathNinoJadiBot = path.join(`./${jadi}/`, id)
if (!fs.existsSync(pathNinoJadiBot)){
fs.mkdirSync(pathNinoJadiBot, { recursive: true })
}
ninoJBOptions.pathNinoJadiBot = pathNinoJadiBot
ninoJBOptions.m = m
ninoJBOptions.conn = conn
ninoJBOptions.args = args
ninoJBOptions.usedPrefix = usedPrefix
ninoJBOptions.command = command
ninoJBOptions.fromCommand = true
ninoJadiBot(ninoJBOptions)
global.db.data.users[m.sender].Subs = new Date * 1
}
handler.help = ['qr', 'code']
handler.tags = ['serbot']
handler.command = ['qr', 'code']
export default handler 

export async function ninoJadiBot(options) {
let { pathNinoJadiBot, m, conn, args, usedPrefix, command } = options
if (command === 'code') {
command = 'qr'
args.unshift('code')
}
const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false
let txtCode, codeBot, txtQR
if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathNinoJadiBot, "creds.json")
if (!fs.existsSync(pathNinoJadiBot)){
fs.mkdirSync(pathNinoJadiBot, { recursive: true })}
try {
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `> Use correctamente el comando » ${usedPrefix + command}`, m)
return
}
const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)
let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathNinoJadiBot)
const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: false,
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache, 
browser: ['Windows', 'Firefox'],
version: version,
generateHighQualityLinkPreview: true
}
let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true
setTimeout(async () => {
if (!sock.user) {
try { fs.rmSync(pathNinoJadiBot, { recursive: true, force: true }) } catch {}
try { sock.ws?.close() } catch {}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)
if (i >= 0) global.conns.splice(i, 1)
console.log(`[AUTO-LIMPIEZA] Sesión ${path.basename(pathNinoJadiBot)} eliminada credenciales invalidos.`)
}}, 60000)
async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
if (m?.chat) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
} else {
return 
}
if (txtQR && txtQR.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
}
return
} 
if (qr && mcode) {
let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
secret = secret.match(/.{1,4}/g)?.join("-")
txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
codeBot = await m.reply(secret)
console.log(secret)
}
if (txtCode && txtCode.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
}
if (codeBot && codeBot.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
}
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}
const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
if (reason === 428) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathNinoJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 408) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathNinoJadiBot)}) se perdió o expiró. Razón: ${reason}. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathNinoJadiBot)}) fue reemplazada por otra sesión activa.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathNinoJadiBot)}@s.whatsapp.net`, {text : '⚠︎ Hemos detectado una nueva sesión, borre la antigua sesión para continuar.\n\n> ☁︎ Si Hay algún problema vuelva a conectarse.' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`⚠︎ Error 440 no se pudo enviar mensaje a: +${path.basename(pathNinoJadiBot)}`))
}}
if (reason == 405 || reason == 401) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La sesión (+${path.basename(pathNinoJadiBot)}) fue cerrada. Credenciales no válidas o dispositivo desconectado manualmente.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathNinoJadiBot)}@s.whatsapp.net`, {text : '> ⚠️Sesión pendiente.\n\n> 🔄Vuelva a intentar nuevamente volver a ser *SUB-BOT*.' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`⚠︎ Error 405 no se pudo enviar mensaje a: +${path.basename(pathNinoJadiBot)}`))
}
fs.rmdirSync(pathNinoJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Conexión perdida en la sesión (+${path.basename(pathNinoJadiBot)}). Borrando datos...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathNinoJadiBot)}@s.whatsapp.net`, {text : '> ⚠️Conexión perdida.\n\n> 🔄Intenté conectarse manualmente para volver a ser *SUB-BOT*' }, { quoted: m || null }) : ""
return creloadHandler(true).catch(console.error)
}
if (reason === 515) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Reinicio automático para la sesión (+${path.basename(pathNinoJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Sesión cerrada o cuenta en soporte para la sesión (+${path.basename(pathNinoJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
fs.rmdirSync(pathNinoJadiBot, { recursive: true })
}}
if (global.db.data == null) loadDatabase()
if (connection == `open`) {
if (!global.db.data?.users) loadDatabase()
await joinChannels(conn)
let userName, userJid 
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathNinoJadiBot)}@s.whatsapp.net`
console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• SUB-BOT •】⸺⸺⸺⸺❒\n│\n│ ❍ ${userName} (+${path.basename(pathNinoJadiBot)}) conectado exitosamente.\n│\n❒⸺⸺⸺【• CONECTADO •】⸺⸺⸺❒`))
sock.isInit = true
global.conns.push(sock)
m?.chat ? await conn.sendMessage(m.chat, { text: isSubBotConnected(m.sender) ? `> @${m.sender.split('@')[0]},ya estás conectado a Nino-Nakano leyendo mensajes entrantes...` : `> Has registrado un nuevo *Sub-Bot!* [@${m.sender.split('@')[0]}]\n\n> Puedes ver la información del bot usando el comando *#menu*`, mentions: [m.sender] }, { quoted: m }) : ''
}}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error('⚠︎ Nuevo error: ', e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}
sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)
sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? '0' + hours : hours
minutes = (minutes < 10) ? '0' + minutes : minutes
seconds = (seconds < 10) ? '0' + seconds : seconds
return minutes + ' m y ' + seconds + ' s '
}

async function joinChannels(sock) {
for (const value of Object.values(global.ch)) {
if (typeof value === 'string' && value.endsWith('@newsletter')) {
await sock.newsletterFollow(value).catch(() => {})
}}}