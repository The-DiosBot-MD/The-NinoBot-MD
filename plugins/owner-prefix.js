const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🍓 No se encontró ningún prefijo. Por favor, escribe un prefijo.\n> *Ejemplo: ${usedPrefix + command} !*`;

  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

return conn.reply(m.chat, `🍉 Prefijo actualizado con éxito. Prefijo ➩ ${text}`, m)
};

handler.help = ['prefix']
handler.command = ['prefix']
handler.tags = ['owner']

export default handler;