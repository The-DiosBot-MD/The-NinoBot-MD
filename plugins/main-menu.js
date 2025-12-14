import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    await m.react('🍒')
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && 
v.tags).length
    
let txt = `
꒰⌢ ʚ˚₊‧ ✎ ꒱ 𝗡𝗜𝗡𝗢 𝗡𝗔𝗞𝗔𝗡𝗢-𝗜𝗔 𝗨𝗣𝗗𝗔𝗧𝗘 🌷 
﹙✐﹚ *¡Hola* @${userId.split('@')[0]}! 
﹙✐﹚ *Soy ${botname}*

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐈𝐍𝐅𝐎-𝐍𝐊 ❐
﹙✐﹚ Tipo » ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
﹙✐﹚ *Usuarios » ${totalreg.toLocaleString()}*
﹙✐﹚ *Versión » ${vs}*
﹙✐﹚ *Plugins » ${totalCommands}*
﹙✐﹚ *Librería » ${libreria}*

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ \`𝗦𝗜𝗦𝗧𝗘𝗠𝗔 𝗗𝗘 𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔`\ ❐
﹙✐﹚ Comandos de economía para ganar dinero

﹙✐﹚ ⚘ 𝙬𝙤𝙧𝙠 • 𝙩𝙧𝙖𝙗𝙖𝙟𝙖𝙧
⤷ Ganar coins trabajando

﹙✐﹚ ⚘ 𝙥𝙧𝙤𝙨𝙩𝙞𝙩𝙪𝙞𝙧𝙨𝙚 • 𝙨𝙡𝙪𝙩
⤷ Ganar coins prostituyéndote

﹙✐﹚ ⚘ 𝙘𝙤𝙞𝙣𝙛𝙡𝙞𝙥 • 𝙛𝙡𝙞𝙥 • 𝙘𝙛 + [cantidad] <cara/cruz>
⤷ Apostar coins en cara o cruz

﹙✐﹚ ⚘ 𝙘𝙧𝙞𝙢𝙚 • 𝙘𝙧𝙞𝙢𝙚𝙣
⤷ Ganar coins rápido

﹙✐﹚ ⚘ 𝙧𝙤𝙪𝙡𝙚𝙩𝙩𝙚 • 𝙧𝙩 + [red/black] [cantidad]
⤷ Apostar coins en ruleta

﹙✐﹚ ⚘ 𝙘𝙖𝙨𝙞𝙣𝙤 • 𝙖𝙥𝙤𝙨𝙩𝙖𝙧 • 𝙨𝙡𝙤𝙩 + [cantidad]
⤷ Apostar coins en casino

﹙✐﹚ ⚘ 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 • 𝙗𝙖𝙡 • 𝙗𝙖𝙣𝙠 + <usuario>
⤷ Ver cuantos coins tienes

﹙✐﹚ ⚘ 𝙙𝙚𝙥𝙤𝙨𝙞𝙩 • 𝙙𝙚𝙥 • 𝙙 + [cantidad] | all
⤷ Depositar coins en banco

﹙✐﹚ ⚘ 𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬 • 𝙬𝙞𝙩𝙝 • 𝙧𝙚𝙩𝙞𝙧𝙖𝙧 + [cantidad] | all
⤷ Retirar coins del banco

﹙✐﹚ ⚘ 𝙚𝙘𝙤𝙣𝙤𝙢𝙮𝙞𝙣𝙛𝙤 • 𝙚𝙞𝙣𝙛𝙤
⤷ Ver información de economía

﹙✐﹚ ⚘ 𝙜𝙞𝙫𝙚𝙘𝙤𝙞𝙣𝙨 • 𝙥𝙖𝙮 + [usuario] [cantidad]
⤷ Dar coins a usuario

﹙✐﹚ ⚘ 𝙢𝙞𝙣𝙞𝙣𝙜 • 𝙢𝙞𝙣𝙖𝙧 • 𝙢𝙞𝙣𝙚
⤷ Realizar trabajos de minería

﹙✐﹚ ⚘ 𝙙𝙖𝙞𝙡𝙮 • 𝙙𝙞𝙖𝙧𝙞𝙤
⤷ Reclamar recompensa diaria

﹙✐﹚ ⚘ 𝙘𝙤𝙛𝙧𝙚 • 𝙘𝙤𝙛𝙛𝙚𝙧
⤷ Reclamar cofre diario

﹙✐﹚ ⚘ 𝙬𝙚𝙚𝙠𝙡𝙮 • 𝙨𝙚𝙢𝙖𝙣𝙖𝙡
⤷ Reclamar recompensa semanal

﹙✐﹚ ⚘ 𝙢𝙤𝙣𝙩𝙝𝙡𝙮 • 𝙢𝙚𝙣𝙨𝙪𝙖𝙡
⤷ Reclamar recompensa mensual

﹙✐﹚ ⚘ 𝙨𝙩𝙚𝙖𝙡 • 𝙧𝙤𝙗𝙖𝙧 • 𝙧𝙤𝙗 + [@mencion]
⤷ Intentar robar coins

﹙✐﹚ ⚘ 𝙚𝙘𝙤𝙣𝙤𝙢𝙮𝙗𝙤𝙖𝙧𝙙 • 𝙚𝙗𝙤𝙖𝙧𝙙 • 𝙗𝙖𝙡𝙩𝙤𝙥
⤷ Ver ranking económico

﹙✐﹚ ⚘ 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖 • 𝙖𝙙𝙫𝙚𝙣𝙩𝙪𝙧𝙚
⤷ Aventuras para ganar coins

﹙✐﹚ ⚘ 𝙘𝙪𝙧𝙖𝙧 • 𝙝𝙚𝙖𝙡
⤷ Curar salud para aventuras

﹙✐﹚ ⚘ 𝙘𝙖𝙯𝙖𝙧 • 𝙝𝙪𝙣𝙩
⤷ Cazar animales para ganar coins

﹙✐﹚ ⚘ 𝙛𝙞𝙨𝙝 • 𝙥𝙚𝙨𝙘𝙖𝙧
⤷ Ganar coins pescando

﹙✐﹚ ⚘ 𝙢𝙖𝙯𝙢𝙤𝙧𝙧𝙖 • 𝙙𝙪𝙣𝙜𝙚𝙤𝙣
⤷ Explorar mazmorras

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 ❐
﹙✐﹚ Comandos para descargar archivos

﹙✐﹚ ⚘ 𝙩𝙞𝙠𝙩𝙤𝙠 • 𝙩𝙩 • 𝙩𝙩𝙖𝙪𝙙𝙞𝙤 + [Link] / [búsqueda]
⤷ Descargar video de TikTok

﹙✐﹚ ⚘ 𝙢𝙚𝙙𝙞𝙖𝙛𝙞𝙧𝙚 • 𝙢𝙛 + [Link]
⤷ Descargar archivo de MediaFire

﹙✐﹚ ⚘ 𝙢𝙚𝙜𝙖 • 𝙢𝙜 + [Link]
⤷ Descargar archivo de MEGA

﹙✐﹚ ⚘ 𝙥𝙡𝙖𝙮 • 𝙥𝙡𝙖𝙮𝙫𝙞𝙙 • 𝙮𝙩𝙢𝙥3 + [Canción] / [Link]
⤷ Descargar música/video de YouTube

﹙✐﹚ ⚘ 𝙥𝙡𝙖𝙮2 • 𝙥𝙡𝙖𝙮3 • 𝙥𝙡𝙖𝙮4 + [Canción]
⤷ Descargar música/video de YouTube de alto calidad v2

﹙✐﹚ ⚘ 𝙛𝙖𝙘𝙚𝙗𝙤𝙤𝙠 • 𝙛𝙗 + [Link]
⤷ Descargar video de Facebook

﹙✐﹚ ⚘ 𝙩𝙬𝙞𝙩𝙩𝙚𝙧 • 𝙭 + [Link]
⤷ Descargar video de Twitter/X

﹙✐﹚ ⚘ 𝙞𝙜 • 𝙞𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 + [Link]
⤷ Descargar reel de Instagram

﹙✐﹚ ⚘ 𝙥𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 • 𝙥𝙞𝙣 + [búsqueda] / [Link]
⤷ Descargar imágenes de Pinterest

﹙✐﹚ ⚘ 𝙞𝙢𝙖𝙜𝙚 • 𝙞𝙢𝙖𝙜𝙚𝙣 + [búsqueda]
⤷ Buscar imágenes en Google

﹙✐﹚ ⚘ 𝙖𝙥𝙠 • 𝙢𝙤𝙙𝙖𝙥𝙠 + [búsqueda]
⤷ Descargar apk de Aptoide

﹙✐﹚ ⚘ 𝙮𝙩𝙨𝙚𝙖𝙧𝙘𝙝 • 𝙨𝙚𝙖𝙧𝙘𝙝 + [búsqueda]
⤷ Buscar videos en YouTube

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐆𝐀𝐂𝐇𝐀 ❐
﹙✐﹚ Colecciona tus personajes favoritos

﹙✐﹚ ⚘ 𝙗𝙪𝙮𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 • 𝙗𝙪𝙮𝙘𝙝𝙖𝙧 + [nombre]
⤷ Comprar personaje en venta

﹙✐﹚ ⚘ 𝙘𝙝𝙖𝙧𝙞𝙢𝙖𝙜𝙚 • 𝙘𝙞𝙢𝙖𝙜𝙚 + [nombre]
⤷ Ver imagen de personaje

﹙✐﹚ ⚘ 𝙘𝙝𝙖𝙧𝙞𝙣𝙛𝙤 • 𝙬𝙞𝙣𝙛𝙤 + [nombre]
⤷ Ver información de personaje

﹙✐﹚ ⚘ 𝙘𝙡𝙖𝙞𝙢 • 𝙘 + {citar personaje}
⤷ Reclamar personaje

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙘𝙡𝙖𝙞𝙢𝙢𝙨𝙜
⤷ Restablecer mensaje de claim

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙚𝙩𝙚𝙬𝙖𝙞𝙛𝙪 • 𝙙𝙚𝙡𝙬𝙖𝙞𝙛𝙪 + [nombre]
⤷ Eliminar personaje reclamado

﹙✐﹚ ⚘ 𝙛𝙖𝙫𝙤𝙧𝙞𝙩𝙚𝙩𝙤𝙥 • 𝙛𝙖𝙫𝙩𝙤𝙥
⤷ Top de personajes favoritos

﹙✐﹚ ⚘ 𝙜𝙖𝙘𝙝𝙖𝙞𝙣𝙛𝙤 • 𝙜𝙞𝙣𝙛𝙤
⤷ Ver información de gacha

﹙✐﹚ ⚘ 𝙜𝙞𝙫𝙚𝙖𝙡𝙡𝙝𝙖𝙧𝙚𝙢 + [@usuario]
⤷ Regalar todos tus personajes

﹙✐﹚ ⚘ 𝙜𝙞𝙫𝙚𝙘𝙝𝙖𝙧 • 𝙜𝙞𝙫𝙚𝙬𝙖𝙞𝙛𝙪 + [@usuario] [nombre]
⤷ Regalar personaje

﹙✐﹚ ⚘ 𝙧𝙤𝙗𝙬𝙖𝙞𝙛𝙪 • 𝙧𝙤𝙗𝙖𝙧𝙬𝙖𝙞𝙛𝙪 + [@usuario]
⤷ Robar personaje a usuario

﹙✐﹚ ⚘ 𝙝𝙖𝙧𝙚𝙢 • 𝙬𝙖𝙞𝙛𝙪𝙨 • 𝙘𝙡𝙖𝙞𝙢𝙨 + <@usuario>
⤷ Ver personajes reclamados

﹙✐﹚ ⚘ 𝙝𝙖𝙧𝙚𝙢𝙨𝙝𝙤𝙥 • 𝙬𝙨𝙝𝙤𝙥 + <Página>
⤷ Ver personajes en venta

﹙✐﹚ ⚘ 𝙧𝙚𝙢𝙤𝙫𝙚𝙨𝙖𝙡𝙚 + [precio] [nombre]
⤷ Eliminar personaje en venta

﹙✐﹚ ⚘ 𝙧𝙤𝙡𝙡𝙬𝙖𝙞𝙛𝙪 • 𝙧𝙬 • 𝙧𝙤𝙡𝙡
⤷ Personaje aleatorio

﹙✐﹚ ⚘ 𝙨𝙚𝙡𝙡 • 𝙫𝙚𝙣𝙙𝙚𝙧 + [precio] [nombre]
⤷ Poner personaje a la venta

﹙✐﹚ ⚘ 𝙨𝙚𝙧𝙞𝙚𝙞𝙣𝙛𝙤 • 𝙖𝙞𝙣𝙛𝙤 + [nombre]
⤷ Información de anime

﹙✐﹚ ⚘ 𝙨𝙚𝙧𝙞𝙚𝙡𝙞𝙨𝙩 • 𝙨𝙡𝙞𝙨𝙩
⤷ Listar series del bot

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙘𝙡𝙖𝙞𝙢𝙢𝙨𝙜 • 𝙨𝙚𝙩𝙘𝙡𝙖𝙞𝙢 + [mensaje]
⤷ Modificar mensaje de claim

﹙✐﹚ ⚘ 𝙩𝙧𝙖𝙙𝙚 • 𝙞𝙣𝙩𝙚𝙧𝙘𝙖𝙢𝙗𝙞𝙖𝙧 + [personaje1] / [personaje2]
⤷ Intercambiar personajes

﹙✐﹚ ⚘ 𝙫𝙤𝙩𝙚 • 𝙫𝙤𝙩𝙖𝙧 + [nombre]
⤷ Votar por personaje

﹙✐﹚ ⚘ 𝙬𝙖𝙞𝙛𝙪𝙨𝙗𝙤𝙖𝙧𝙙 • 𝙬𝙖𝙞𝙛𝙪𝙨𝙩𝙤𝙥 • 𝙬𝙩𝙤𝙥
⤷ Top de personajes con mayor valor

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐈𝐎𝐍 𝐃𝐄 𝐒𝐔𝐁-𝐁𝐎𝐓 ❐
﹙✐﹚ Registra tu propio Bot

﹙✐﹚ ⚘ 𝙦𝙧 • 𝙘𝙤𝙙𝙚
⤷ Crear Sub-Bot con QR

﹙✐﹚ ⚘ 𝙗𝙤𝙩𝙨 • 𝙗𝙤𝙩𝙡𝙞𝙨𝙩
⤷ Ver bots activos

﹙✐﹚ ⚘ 𝙨𝙩𝙖𝙩𝙪𝙨 • 𝙚𝙨𝙩𝙖𝙙𝙤
⤷ Ver estado del bot

﹙✐﹚ ⚘ 𝙥 • 𝙥𝙞𝙣𝙜
⤷ Medir tiempo de respuesta

﹙✐﹚ ⚘ 𝙟𝙤𝙞𝙣 + [Invitación]
⤷ Unir bot a grupo

﹙✐﹚ ⚘ 𝙡𝙚𝙖𝙫𝙚 • 𝙨𝙖𝙡𝙞𝙧
⤷ Salir del grupo

﹙✐﹚ ⚘ 𝙡𝙤𝙜𝙤𝙪𝙩
⤷ Cerrar sesión del bot

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙥𝙛𝙥 • 𝙨𝙚𝙩𝙞𝙢𝙖𝙜𝙚
⤷ Cambiar imagen de perfil

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙨𝙩𝙖𝙩𝙪𝙨 + [estado]
⤷ Cambiar estado del bot

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙪𝙨𝙚𝙧𝙣𝙖𝙢𝙚 + [nombre]
⤷ Cambiar nombre de usuario

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐎𝐓𝐑𝐀𝐒 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 ❐
﹙✐﹚ Comandos útiles

﹙✐﹚ ⚘ 𝙝𝙚𝙡𝙥 • 𝙢𝙚𝙣𝙪
⤷ Ver menú de comandos

﹙✐﹚ ⚘ 𝙨𝙘 • 𝙨𝙘𝙧𝙞𝙥𝙩
⤷ Link del repositorio

﹙✐﹚ ⚘ 𝙨𝙪𝙜 • 𝙨𝙪𝙜𝙜𝙚𝙨𝙩
⤷ Sugerir nuevas funciones

﹙✐﹚ ⚘ 𝙧𝙚𝙥𝙤𝙧𝙩𝙚 • 𝙧𝙚𝙥𝙤𝙧𝙩𝙖𝙧
⤷ Reportar fallas del bot

﹙✐﹚ ⚘ 𝙘𝙖𝙡𝙘𝙪𝙡𝙖𝙧 • 𝙘𝙖𝙡
⤷ Calcular ecuaciones

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙢𝙚𝙩𝙖
⤷ Restablecer meta de stickers

﹙✐﹚ ⚘ 𝙜𝙚𝙩𝙥𝙞𝙘 • 𝙥𝙛𝙥 + [@usuario]
⤷ Ver foto de perfil

﹙✐﹚ ⚘ 𝙨𝙖𝙮 + [texto]
⤷ Repetir mensaje

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙢𝙚𝙩𝙖 + [autor] | [pack]
⤷ Establecer meta de stickers

﹙✐﹚ ⚘ 𝙨𝙩𝙞𝙘𝙠𝙚𝙧 • 𝙨 • 𝙬𝙢 + {citar imagen/video}
⤷ Convertir a sticker

﹙✐﹚ ⚘ 𝙩𝙤𝙞𝙢𝙜 • 𝙞𝙢𝙜 + {citar sticker}
⤷ Convertir sticker a imagen

﹙✐﹚ ⚘ 𝙗𝙧𝙖𝙩 • 𝙗𝙧𝙖𝙩𝙫 • 𝙦𝙘 • 𝙚𝙢𝙤𝙟𝙞𝙢𝙞𝙭
⤷ Crear stickers con texto

﹙✐﹚ ⚘ 𝙜𝙞𝙩𝙘𝙡𝙤𝙣𝙚 + [Link]
⤷ Descargar repositorio de Github

﹙✐﹚ ⚘ 𝙚𝙣𝙝𝙖𝙣𝙘𝙚 • 𝙧𝙚𝙢𝙞𝙣𝙞 • 𝙝𝙙
⤷ Mejorar calidad de imagen

﹙✐﹚ ⚘ 𝙡𝙚𝙩𝙧𝙖 • 𝙨𝙩𝙮𝙡𝙚
⤷ Cambiar fuente de letras

﹙✐﹚ ⚘ 𝙧𝙚𝙖𝙙 • 𝙧𝙚𝙖𝙙𝙫𝙞𝙚𝙬𝙤𝙣𝙘𝙚
⤷ Ver imágenes viewonce

﹙✐﹚ ⚘ 𝙨𝙨 • 𝙨𝙨𝙬𝙚𝙗
⤷ Ver estado de página web

﹙✐﹚ ⚘ 𝙩𝙧𝙖𝙣𝙨𝙡𝙖𝙩𝙚 • 𝙩𝙧𝙖𝙙𝙪𝙘𝙞𝙧 • 𝙩𝙧𝙖𝙙
⤷ Traducir palabras

﹙✐﹚ ⚘ 𝙞𝙖 • 𝙜𝙚𝙢𝙞𝙣𝙞
⤷ Preguntar a IA

﹙✐﹚ ⚘ 𝙩𝙤𝙪𝙧𝙡 • 𝙘𝙖𝙩𝙗𝙤𝙭
⤷ Convertir imagen/video a URL

﹙✐﹚ ⚘ 𝙬𝙞𝙠𝙞 • 𝙬𝙞𝙠𝙞𝙥𝙚𝙙𝙞𝙖
⤷ Investigar en Wikipedia

﹙✐﹚ ⚘ 𝙙𝙖𝙡𝙡𝙚 • 𝙛𝙡𝙪𝙭
⤷ Crear imágenes con IA

﹙✐﹚ ⚘ 𝙣𝙥𝙢𝙙𝙡 • 𝙣𝙢𝙥𝙟𝙨
⤷ Descargar paquetes de NPMJS

﹙✐﹚ ⚘ 𝙜𝙤𝙤𝙜𝙡𝙚
⤷ Realizar búsquedas en Google

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐏𝐄𝐑𝐅𝐈𝐋 ❐
﹙✐﹚ Configura tu perfil

﹙✐﹚ ⚘ 𝙡𝙚𝙖𝙙𝙚𝙧𝙗𝙤𝙖𝙧𝙙 • 𝙡𝙗𝙤𝙖𝙧𝙙 • 𝙩𝙤𝙥 + <Página>
⤷ Top de usuarios con más XP

﹙✐﹚ ⚘ 𝙡𝙚𝙫𝙚𝙡 • 𝙡𝙫𝙡 + <@Mencion>
⤷ Ver nivel y experiencia

﹙✐﹚ ⚘ 𝙢𝙖𝙧𝙧𝙮 • 𝙘𝙖𝙨𝙖𝙧𝙨𝙚 + <@Mencion>
⤷ Casarte con alguien

﹙✐﹚ ⚘ 𝙥𝙧𝙤𝙛𝙞𝙡𝙚 + <@Mencion>
⤷ Ver tu perfil

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙗𝙞𝙧𝙩𝙝 + [fecha]
⤷ Establecer fecha de cumpleaños

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙙𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣 • 𝙨𝙚𝙩𝙙𝙚𝙨𝙘 + [Descripción]
⤷ Establecer descripción

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙜𝙚𝙣𝙧𝙚 + Hombre | Mujer
⤷ Establecer género

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙜𝙚𝙣𝙧𝙚 • 𝙙𝙚𝙡𝙜𝙚𝙣𝙚𝙧𝙤
⤷ Eliminar género

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙗𝙞𝙧𝙩𝙝 + [fecha]
⤷ Borrar fecha de cumpleaños

﹙✐﹚ ⚘ 𝙙𝙞𝙫𝙤𝙧𝙘𝙚
⤷ Divorciarte de tu pareja

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙛𝙖𝙫𝙤𝙪𝙧𝙞𝙩𝙚 • 𝙨𝙚𝙩𝙛𝙖𝙫 + [Personaje]
⤷ Establecer claim favorito

﹙✐﹚ ⚘ 𝙙𝙚𝙡𝙙𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣 • 𝙙𝙚𝙡𝙙𝙚𝙨𝙘
⤷ Eliminar descripción

﹙✐﹚ ⚘ 𝙥𝙧𝙚𝙢 • 𝙫𝙞𝙥
⤷ Comprar membresía premium

꒰⌢ ʚ˚₊‧ ✎ ꒱ ❐ 𝐆𝐄𝐒𝐓𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒 ❐
﹙✐﹚ Comandos para administradores

﹙✐﹚ ⚘ 𝙩𝙖𝙜 • 𝙝𝙞𝙙𝙚𝙩𝙖𝙜 • 𝙞𝙣𝙫𝙤𝙘𝙖𝙧 + [mensaje]
⤷ Mencionar a todos los usuarios

﹙✐﹚ ⚘ 𝙙𝙚𝙩𝙚𝙘𝙩 • 𝙖𝙡𝙚𝙧𝙩𝙖𝙨 + [enable/disable]
⤷ Activar/desactivar alertas

﹙✐﹚ ⚘ 𝙖𝙣𝙩𝙞𝙡𝙞𝙣𝙠 • 𝙖𝙣𝙩𝙞𝙚𝙣𝙡𝙖𝙘𝙚 + [enable/disable]
⤷ Activar/desactivar antienlace

﹙✐﹚ ⚘ 𝙗𝙤𝙩 + [enable/disable]
⤷ Activar/desactivar bot

﹙✐﹚ ⚘ 𝙘𝙡𝙤𝙨𝙚 • 𝙘𝙚𝙧𝙧𝙖𝙧
⤷ Cerrar el grupo

﹙✐﹚ ⚘ 𝙙𝙚𝙢𝙤𝙩𝙚 + <@usuario>
⤷ Quitar admin a usuario

﹙✐﹚ ⚘ 𝙚𝙘𝙤𝙣𝙤𝙢𝙮 + [enable/disable]
⤷ Activar/desactivar economía

﹙✐﹚ ⚘ 𝙜𝙖𝙘𝙝𝙖 + [enable/disable]
⤷ Activar/desactivar gacha

﹙✐﹚ ⚘ 𝙬𝙚𝙡𝙘𝙤𝙢𝙚 • 𝙗𝙞𝙚𝙣𝙫𝙚𝙣𝙞𝙙𝙖 + [enable/disable]
⤷ Activar/desactivar bienvenida

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙗𝙮𝙚 + [texto]
⤷ Mensaje de despedida personalizado

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙥𝙧𝙞𝙢𝙖𝙧𝙮 + [@bot]
⤷ Establecer bot primario

﹙✐﹚ ⚘ 𝙨𝙚𝙩𝙬𝙚𝙡𝙘𝙤𝙢𝙚 + [texto]
⤷ Mensaje de bienvenida personalizado

﹙✐﹚ ⚘ 𝙠𝙞𝙘𝙠 + <@usuario>
⤷ Expulsar usuario

﹙✐﹚ ⚘ 𝙤𝙣𝙡𝙮𝙖𝙙𝙢𝙞𝙣 + [enable/disable]
⤷ Solo admins usan comandos

﹙✐﹚ ⚘ 𝙤𝙥𝙚𝙣 • 𝙖𝙗𝙧𝙞𝙧
⤷ Abrir el grupo

﹙✐﹚ ⚘ 𝙥𝙧𝙤𝙢𝙤𝙩𝙚 + <@usuario>
⤷ Hacer admin a usuario

﹙✐﹚ ⚘ 𝙖𝙙𝙙 • 𝙖ñ𝙖𝙙𝙞𝙧 + {número}
⤷ Invitar usuario al grupo

﹙✐﹚ ⚘ 𝙖𝙙𝙢𝙞𝙣𝙨 • 𝙖𝙙𝙢𝙞𝙣 + [texto]
⤷ Mencionar admins

﹙✐﹚ ⚘ 𝙧𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧 • 𝙧𝙚𝙫𝙤𝙠𝙚
⤷ Restablecer enlace

﹙✐﹚ ⚘ 𝙖𝙙𝙙𝙬𝙖𝙧𝙣 • 𝙬𝙖𝙧𝙣 + <@usuario>
⤷ Advertir usuario

﹙✐﹚ ⚘ 𝙪𝙣𝙬𝙖𝙧𝙣 • 𝙙𝙚𝙡𝙬𝙖𝙧𝙣 + <@usuario>
⤷ Quitar advertencias

﹙✐﹚ ⚘ 𝙖𝙙𝙫𝙡𝙞𝙨𝙩 • 𝙡𝙞𝙨𝙩𝙖𝙙𝙫
⤷ Ver usuarios advertidos

﹙✐﹚ ⚘ 𝙞𝙣𝙖𝙘𝙩𝙞𝙫𝙤𝙨 • 𝙠𝙞𝙘𝙠𝙞𝙣𝙖𝙘𝙩𝙞𝙫𝙤𝙨
⤷ Ver/eliminar inactivos

﹙✐﹚ ⚘ 𝙡𝙞𝙨𝙩𝙣𝙪𝙢 • 𝙠𝙞𝙘𝙠𝙣𝙪𝙢 [texto]
⤷ Eliminar usuarios por prefijo

﹙✐﹚ ⚘ 𝙜𝙥𝙗𝙖𝙣𝙣𝙚𝙧 • 𝙜𝙧𝙤𝙪𝙥𝙞𝙢𝙜
⤷ Cambiar imagen del grupo

﹙✐﹚ ⚘ 𝙜𝙥𝙣𝙖𝙢𝙚 • 𝙜𝙧𝙤𝙪𝙥𝙣𝙖𝙢𝙚 [texto]
⤷ Cambiar nombre del grupo

﹙✐﹚ ⚘ 𝙜𝙥𝙙𝙚𝙨𝙘 • 𝙜𝙧𝙤𝙪𝙥𝙙𝙚𝙨𝙘 [texto]
⤷ Cambiar descripción del grupo

﹙✐﹚ ⚘ 𝙙𝙚𝙡 • 𝙙𝙚𝙡𝙚𝙩𝙚 + {citar mensaje}
⤷ Eliminar mensaje

﹙✐﹚ ⚘ 𝙡𝙞𝙣𝙚𝙖 • 𝙡𝙞𝙨𝙩𝙤𝙣𝙡𝙞𝙣𝙚
⤷ Ver usuarios en línea

﹙✐﹚ ⚘ 𝙜𝙥 • 𝙞𝙣𝙛𝙤𝙜𝙧𝙪𝙥𝙤
⤷ Ver información del grupo

﹙✐﹚ ⚘ 𝙡𝙞𝙣𝙠
⤷ Ver enlace de invitación

𝑵𝑰𝒏𝒐 𝑵𝒂𝒌𝒂𝒏𝒐 𝑩𝒚 𝑮𝒍𝒐𝒃𝒂𝒍-𝑵𝑲 🍒✨
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
