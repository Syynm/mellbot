exports.run = {
   usage: ['toplocal'],
   async: async (m, {
      client,
      participants
   }) => {
      let member = participants.map(u => u.id)
      let kontol = {}
      for (i = 0; i < member.length; i++) {
         if (typeof global.db.users[member[i]] != 'undefined' && member[i] != client.user.id.split(':')[0] + '@s.whatsapp.net') {
            kontol[member[i]] = {
               point: global.db.users[member[i]].point,
               level: Func.level(global.db.users[member[i]].point),
               limit: global.db.users[member[i]].limit
            }
         }
      }
      let point = Object.entries(kontol).sort((a, b) => b[1].point - a[1].point)
      let limit = Object.entries(kontol).sort((a, b) => b[1].limit - a[1].limit)
      let rankPoint = point.map(v => v[0])
      let rankLimit = limit.map(v => v[0])
      let isPoint = Math.min(10, point.length)
      let isLimit = Math.min(10, limit.length)
      let teks = `❏  *T O P - L O C A L*\n\n`
      teks += `“Kamu berada diperingkat *${rankPoint.indexOf(m.sender) + 1}* dari *${member.length}* anggota grup ${await (await client.groupMetadata(m.chat)).subject}.”\n\n`
      teks += point.slice(0, isPoint).map(([user, data], i) => (i + 1) + '. @' + user.split`@` [0] + '\n    *Uang  :  ' + Func.h2k(Func.formatNumber(data.point)) + ' (' + Func.formatNumber(data.point) + ')*\n    *Level️  :  ' + data.level[0] + ' [ ' + Func.formatNumber(data.level[3]) + ' / ' + Func.h2k(data.level[1]) + ' ]*').join`\n`
      // teks += `\n\n`
      // teks += `“Your limits are ranked *${rankLimit.indexOf(m.sender) + 1}* out of *${member.length}* ${await (await client.groupMetadata(m.chat)).subject} group members.”\n\n`
      // teks += limit.slice(0, isLimit).map(([user, data], i) => (i + 1) + '. @' + user.split`@` [0] + '\n    *🧱  :  ' + Func.formatNumber(data.limit) + '*').join`\n`
      teks += `\n\n${global.db.setting.footer}`
      client.reply(m.chat, teks, m)
   },
   error: false,
   group: true
}