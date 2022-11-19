exports.run = {
   usage: ['topglobal'],
   async: async (m, {
      client,
      participants
   }) => {
      let point = Object.entries(global.db.users).sort((a, b) => b[1].point - a[1].point)
      let getUser = point.map(v => v[0])
      let show = Math.min(10, point.length)
      let teks = `❏  *T O P - G L O B A L*\n\n`
      teks += point.slice(0, show).map(([user, data], i) => (i + 1) + '. @' + user.split`@` [0] + '\n    *Uang  :  ' + Func.h2k(Func.formatNumber(data.point)) + '*\n    *Level  :  ' + Func.level(data.point)[0] + ' [ ' + Func.formatNumber(Func.level(data.point)[3]) + ' / ' + Func.h2k(Func.formatNumber(Func.level(data.point))[1]) + ' ]*').join`\n`
      teks += `\n\n${global.db.setting.footer}`
      client.reply(m.chat, teks, m)
   },
   error: false
}