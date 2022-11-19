exports.run = {
   usage: ['afk'],
   async: async (m, {
      client,
      text
   }) => {
      try {
         let user = global.db.users[m.sender]
         user.afk = +new Date
         user.afkReason = text
         let tag = m.sender.split`@` [0]
         client.sendMessageModify(m.chat, `*@${tag} SEKARANG KAMU AFK!!*`, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/6670af688a6c891d728fe.jpg')
            })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   group: true
}