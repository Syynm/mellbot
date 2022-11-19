exports.run = {
   usage: ['coin'],
   async: async (m, {
      client,
      args
   }) => {
      let user = global.db.users[m.sender]
      if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `Berikan argumen A atau B.`), m)
      if (user.point == 0) return client.reply(m.chat, Func.texted('bold', `Kamu tidak punya point untuk bermain game ini.`), m)
      if (user.point < 300000) return client.reply(m.chat, Func.texted('bold', `Untuk bermain game ini kamu harus mempunyai minimal 300K point.`), m)
      let x = Func.ucword(args[0])
      if (x == 'A' || x == 'B') {
         var type = Func.random(['A', 'B'])
         if (Func.ucword(args[0]) == type) {
            let percent = Func.randomInt(5, 10)
            let reward = ((percent / 100) * user.point)
            user.point += reward
            let last = user.point
            let teks = `❏  *W I N*\n\n`
            teks += `	*System* : ${type}, *You* : ${Func.ucword(args[0])}!\n`
            teks += `	*+ ${Func.formatNumber(reward)}*\n\n`
            teks += `• *Total* : ${Func.formatNumber(last)} Point\n\n`
            teks += `*NB : “Anti-Spam jeda 5 detik untuk eksekusi selanjutnya.”*`
            client.reply(m.chat, teks, m)
         } else if (Func.ucword(args[0]) != type) {
            let percent = Func.randomInt(5, 15)
            let reward = ((percent / 100) * user.point)
            user.point -= reward
            let last = user.point
            let teks = `❏  *L O S E*\n\n`
            teks += `	*System* : ${type}, *You* : ${Func.ucword(args[0])}!\n`
            teks += `	*- ${Func.formatNumber(reward)}*\n\n`
            teks += `• *Total* : ${Func.formatNumber(last)} Point\n\n`
            teks += `*NB : “Anti-Spam jeda 5 detik untuk eksekusi selanjutnya.”*`
            client.reply(m.chat, teks, m)
         }
      } else {
         return client.reply(m.chat, Func.texted('bold', `Hanya A dan B Kids`), m)
      }
   },
   group: true,
   limit: true,
   game: true
}