exports.run = {
   usage: ['toplimit'],
   async: async (m, {
      client,
      participants
   }) => {
      let limit = Object.entries(global.db.users).sort((a, b) => b[1].limit - a[1].limit)
      let getUser = limit.map(v => v[0])
      let show = Math.min(10, limit.length)
      let teks = `❏  *T O P - L I M I T*\n\n`
      teks += limit.slice(0, show).map(([user, data], i) => (i + 1) + '. @' + user.split`@` [0] + '\n    *Limit  :  ' + Func.formatNumber(data.limit) + '*').join`\n`
      teks += `\n\n${global.db.setting.footer}`
      client.reply(m.chat, teks, m)
   },
   error: false
}