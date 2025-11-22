import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    await m.react('🍒')
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && 
v.tags).length
    

let txt = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐍𝐈𝐍𝐎 𝐍𝐀𝐊𝐀𝐍𝐎-𝐌𝐄𝐍𝐔 ❐
> ੭੭ ﹙👋🏻﹚ ¡Hola @${userId.split('@')[0]}! 
> ੭੭ ﹙ᰔᩚ﹚ Soy ${botname}
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐈𝐍𝐅𝐎-𝐍𝐊 ❐
> ੭੭ ﹙🤖﹚ Tipo » ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
> ੭੭ ﹙👤﹚ Usuarios » ${totalreg.toLocaleString()}
> ੭੭ ﹙⚙️﹚ Versión » ${vs}
> ੭੭ ﹙📂﹚ Plugins » ${totalCommands}
> ੭੭ ﹙🛠﹚ Librería » ${libreria}
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 𝐃𝐄 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Comandos de economía para ganar dinero
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#w\` • \`#work\` • \`#trabajar\`
> ⤷ Ganar coins trabajando

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#slut\` • \`#prostituirse\`
> ⤷ Ganar coins prostituyéndote

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#coinflip\` • \`#flip\` • \`#cf\` + [cantidad] <cara/cruz>
> ⤷ Apostar coins en cara o cruz

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#crime\` • \`#crimen\`
> ⤷ Ganar coins rápido

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#roulette\` • \`#rt\` + [red/black] [cantidad]
> ⤷ Apostar coins en ruleta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#casino\` • \`#apostar\` • \`#slot\` + [cantidad]
> ⤷ Apostar coins en casino

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#balance\` • \`#bal\` • \`#bank\` + <usuario>
> ⤷ Ver cuantos coins tienes

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#deposit\` • \`#dep\` • \`#d\` + [cantidad] | all
> ⤷ Depositar coins en banco

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#withdraw\` • \`#with\` • \`#retirar\` + [cantidad] | all
> ⤷ Retirar coins del banco

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#economyinfo\` • \`#einfo\`
> ⤷ Ver información de economía

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#givecoins\` • \`#pay\` + [usuario] [cantidad]
> ⤷ Dar coins a usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#mining\` • \`#minar\` • \`#mine\`
> ⤷ Realizar trabajos de minería

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#daily\` • \`#diario\`
> ⤷ Reclamar recompensa diaria

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#cofre\` • \`#coffer\`
> ⤷ Reclamar cofre diario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#weekly\` • \`#semanal\`
> ⤷ Reclamar recompensa semanal

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#monthly\` • \`#mensual\`
> ⤷ Reclamar recompensa mensual

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#steal\` • \`#robar\` • \`#rob\` + [@mencion]
> ⤷ Intentar robar coins

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#economyboard\` • \`#eboard\` • \`#baltop\`
> ⤷ Ver ranking económico

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#aventura\` • \`#adventure\`
> ⤷ Aventuras para ganar coins

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#curar\` • \`#heal\`
> ⤷ Curar salud para aventuras

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#cazar\` • \`#hunt\`
> ⤷ Cazar animales para ganar coins

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#fish\` • \`#pescar\`
> ⤷ Ganar coins pescando

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#mazmorra\` • \`#dungeon\`
> ⤷ Explorar mazmorras
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 ❐
> ੭੭ ﹙ᰔᩚ﹚ Comandos para descargar archivos
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#tiktok\` • \`#tt\` • \`#ttaudio\` + [Link] / [búsqueda]
> ⤷ Descargar video de TikTok

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#mediafire\` • \`#mf\` + [Link]
> ⤷ Descargar archivo de MediaFire

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#mega\` • \`#mg\` + [Link]
> ⤷ Descargar archivo de MEGA

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#play\` • \`#playvid\` • \`#ytmp3\` + [Canción] / [Link]
> ⤷ Descargar música/video de YouTube

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#play2\` • \`#play3\` • \`#play4\` + [Canción]
> ⤷ Descargar música/video de YouTube de alto calidad v2

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#facebook\` • \`#fb\` + [Link]
> ⤷ Descargar video de Facebook

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#twitter\` • \`#x\` + [Link]
> ⤷ Descargar video de Twitter/X

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#ig\` • \`#instagram\` + [Link]
> ⤷ Descargar reel de Instagram

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#pinterest\` • \`#pin\` + [búsqueda] / [Link]
> ⤷ Descargar imágenes de Pinterest

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#image\` • \`#imagen\` + [búsqueda]
> ⤷ Buscar imágenes en Google

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#apk\` • \`#modapk\` + [búsqueda]
> ⤷ Descargar apk de Aptoide

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#ytsearch\` • \`#search\` + [búsqueda]
> ⤷ Buscar videos en YouTube
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐆𝐀𝐂𝐇𝐀 ❐
> ੭੭ ﹙ᰔᩚ﹚ Colecciona tus personajes favoritos
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#buycharacter\` • \`#buychar\` + [nombre]
> ⤷ Comprar personaje en venta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#charimage\` • \`#cimage\` + [nombre]
> ⤷ Ver imagen de personaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#charinfo\` • \`#winfo\` + [nombre]
> ⤷ Ver información de personaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#claim\` • \`#c\` + {citar personaje}
> ⤷ Reclamar personaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#delclaimmsg\`
> ⤷ Restablecer mensaje de claim

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#deletewaifu\` • \`#delwaifu\` + [nombre]
> ⤷ Eliminar personaje reclamado

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#favoritetop\` • \`#favtop\`
> ⤷ Top de personajes favoritos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gachainfo\` • \`#ginfo\`
> ⤷ Ver información de gacha

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#giveallharem\` + [@usuario]
> ⤷ Regalar todos tus personajes

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#givechar\` • \`#givewaifu\` + [@usuario] [nombre]
> ⤷ Regalar personaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#robwaifu\` • \`#robarwaifu\` + [@usuario]
> ⤷ Robar personaje a usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#harem\` • \`#waifus\` • \`#claims\` + <@usuario>
> ⤷ Ver personajes reclamados

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#haremshop\` • \`#wshop\` + <Página>
> ⤷ Ver personajes en venta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#removesale\` + [precio] [nombre]
> ⤷ Eliminar personaje en venta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#rollwaifu\` • \`#rw\` • \`#roll\`
> ⤷ Personaje aleatorio

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#sell\` • \`#vender\` + [precio] [nombre]
> ⤷ Poner personaje a la venta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#serieinfo\` • \`#ainfo\` + [nombre]
> ⤷ Información de anime

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#serielist\` • \`#slist\`
> ⤷ Listar series del bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setclaimmsg\` • \`#setclaim\` + [mensaje]
> ⤷ Modificar mensaje de claim

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#trade\` • \`#intercambiar\` + [personaje1] / [personaje2]
> ⤷ Intercambiar personajes

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#vote\` • \`#votar\` + [nombre]
> ⤷ Votar por personaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#waifusboard\` • \`#waifustop\` • \`#wtop\`
> ⤷ Top de personajes con mayor valor
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐈𝐎𝐍 𝐃𝐄 𝐒𝐔𝐁-𝐁𝐎𝐓 ❐
> ੭੭ ﹙ᰔᩚ﹚ Registra tu propio Bot
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#qr\` • \`#code\`
> ⤷ Crear Sub-Bot con QR

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#bots\` • \`#botlist\`
> ⤷ Ver bots activos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#status\` • \`#estado\`
> ⤷ Ver estado del bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#p\` • \`#ping\`
> ⤷ Medir tiempo de respuesta

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#join\` + [Invitación]
> ⤷ Unir bot a grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#leave\` • \`#salir\`
> ⤷ Salir del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#logout\`
> ⤷ Cerrar sesión del bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setpfp\` • \`#setimage\`
> ⤷ Cambiar imagen de perfil

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setstatus\` + [estado]
> ⤷ Cambiar estado del bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setusername\` + [nombre]
> ⤷ Cambiar nombre de usuario
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐎𝐓𝐑𝐀𝐒 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 ❐
> ੭੭ ﹙ᰔᩚ﹚ Comandos útiles
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#help\` • \`#menu\`
> ⤷ Ver menú de comandos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#sc\` • \`#script\`
> ⤷ Link del repositorio

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#sug\` • \`#suggest\`
> ⤷ Sugerir nuevas funciones

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#reporte\` • \`#reportar\`
> ⤷ Reportar fallas del bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#calcular\` • \`#cal\`
> ⤷ Calcular ecuaciones

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#delmeta\`
> ⤷ Restablecer meta de stickers

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#getpic\` • \`#pfp\` + [@usuario]
> ⤷ Ver foto de perfil

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#say\` + [texto]
> ⤷ Repetir mensaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setmeta\` + [autor] | [pack]
> ⤷ Establecer meta de stickers

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#sticker\` • \`#s\` • \`#wm\` + {citar imagen/video}
> ⤷ Convertir a sticker

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#toimg\` • \`#img\` + {citar sticker}
> ⤷ Convertir sticker a imagen

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#brat\` • \`#bratv\` • \`#qc\` • \`#emojimix\`
> ⤷ Crear stickers con texto

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gitclone\` + [Link]
> ⤷ Descargar repositorio de Github

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#enhance\` • \`#remini\` • \`#hd\`
> ⤷ Mejorar calidad de imagen

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#letra\` • \`#style\`
> ⤷ Cambiar fuente de letras

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#read\` • \`#readviewonce\`
> ⤷ Ver imágenes viewonce

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#ss\` • \`#ssweb\`
> ⤷ Ver estado de página web

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#translate\` • \`#traducir\` • \`#trad\`
> ⤷ Traducir palabras

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#ia\` • \`#gemini\`
> ⤷ Preguntar a IA

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#tourl\` • \`#catbox\`
> ⤷ Convertir imagen/video a URL

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#wiki\` • \`#wikipedia\`
> ⤷ Investigar en Wikipedia

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#dalle\` • \`#flux\`
> ⤷ Crear imágenes con IA

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#npmdl\` • \`#nmpjs\`
> ⤷ Descargar paquetes de NPMJS

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#google\`
> ⤷ Realizar búsquedas en Google
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐏𝐄𝐑𝐅𝐈𝐋 ❐
> ੭੭ ﹙ᰔᩚ﹚ Configura tu perfil
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#leaderboard\` • \`#lboard\` • \`#top\` + <Página>
> ⤷ Top de usuarios con más XP

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#level\` • \`#lvl\` + <@Mencion>
> ⤷ Ver nivel y experiencia

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#marry\` • \`#casarse\` + <@Mencion>
> ⤷ Casarte con alguien

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#profile\` + <@Mencion>
> ⤷ Ver tu perfil

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setbirth\` + [fecha]
> ⤷ Establecer fecha de cumpleaños

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setdescription\` • \`#setdesc\` + [Descripción]
> ⤷ Establecer descripción

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setgenre\` + Hombre | Mujer
> ⤷ Establecer género

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#delgenre\` • \`#delgenero\`
> ⤷ Eliminar género

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#delbirth\` + [fecha]
> ⤷ Borrar fecha de cumpleaños

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#divorce\`
> ⤷ Divorciarte de tu pareja

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setfavourite\` • \`#setfav\` + [Personaje]
> ⤷ Establecer claim favorito

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#deldescription\` • \`#deldesc\`
> ⤷ Eliminar descripción

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#prem\` • \`#vip\`
> ⤷ Comprar membresía premium
> .・。.・゜✭・.・✫・゜・。.

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒 ❐
> ੭੭ ﹙ᰔᩚ﹚ Comandos para administradores
> .・。.・゜✭・.・✫・゜・。.

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#tag\` • \`#hidetag\` • \`#invocar\` + [mensaje]
> ⤷ Mencionar a todos los usuarios

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#detect\` • \`#alertas\` + [enable/disable]
> ⤷ Activar/desactivar alertas

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#antilink\` • \`#antienlace\` + [enable/disable]
> ⤷ Activar/desactivar antienlace

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#bot\` + [enable/disable]
> ⤷ Activar/desactivar bot

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#close\` • \`#cerrar\`
> ⤷ Cerrar el grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#demote\` + <@usuario>
> ⤷ Quitar admin a usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#economy\` + [enable/disable]
> ⤷ Activar/desactivar economía

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gacha\` + [enable/disable]
> ⤷ Activar/desactivar gacha

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#welcome\` • \`#bienvenida\` + [enable/disable]
> ⤷ Activar/desactivar bienvenida

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setbye\` + [texto]
> ⤷ Mensaje de despedida personalizado

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setprimary\` + [@bot]
> ⤷ Establecer bot primario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#setwelcome\` + [texto]
> ⤷ Mensaje de bienvenida personalizado

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#kick\` + <@usuario>
> ⤷ Expulsar usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#onlyadmin\` + [enable/disable]
> ⤷ Solo admins usan comandos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#open\` • \`#abrir\`
> ⤷ Abrir el grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#promote\` + <@usuario>
> ⤷ Hacer admin a usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#add\` • \`#añadir\` + {número}
> ⤷ Invitar usuario al grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#admins\` • \`#admin\` + [texto]
> ⤷ Mencionar admins

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#restablecer\` • \`#revoke\`
> ⤷ Restablecer enlace

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#addwarn\` • \`#warn\` + <@usuario>
> ⤷ Advertir usuario

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#unwarn\` • \`#delwarn\` + <@usuario>
> ⤷ Quitar advertencias

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#advlist\` • \`#listadv\`
> ⤷ Ver usuarios advertidos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#inactivos\` • \`#kickinactivos\`
> ⤷ Ver/eliminar inactivos

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#listnum\` • \`#kicknum\` [texto]
> ⤷ Eliminar usuarios por prefijo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gpbanner\` • \`#groupimg\`
> ⤷ Cambiar imagen del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gpname\` • \`#groupname\` [texto]
> ⤷ Cambiar nombre del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gpdesc\` • \`#groupdesc\` [texto]
> ⤷ Cambiar descripción del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#del\` • \`#delete\` + {citar mensaje}
> ⤷ Eliminar mensaje

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#linea\` • \`#listonline\`
> ⤷ Ver usuarios en línea

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#gp\` • \`#infogrupo\`
> ⤷ Ver información del grupo

> ੭੭ ﹙ᰔᩚ﹚ ❏ \`#link\`
> ⤷ Ver enlace de invitación
> .・。.・゜✭・.・✫・゜・。.
> 𝑵𝑰𝒏𝒐 𝑵𝒂𝒌𝒂𝒏𝒐 𝑩𝒚 𝑮𝒍𝒐𝒃𝒂𝒍-𝑵𝑲 🍒✨
`.trim()

await conn.sendMessage(m.chat, { 
text: txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: channelRD.name
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: await (await fetch(banner)).buffer(),
showAdAttribution: false,
containsAutoReply: true,
renderLargerThumbnail: true
}}}, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = true

export default handler
