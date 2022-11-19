exports.run = {
   usage: ['limit'],
   async: async (m, {
      client,
      isPrefix,
      isOwner,
      isPrem
   }) => {
      let user = global.db.users[m.sender]
      if (user.limit < 1) return client.reply(m.chat, `limit kamu habis dan akan direset waktu 00.00\n\nUntuk mendapatkan lebih banyak limit, tingkatkan ke paket premium kirim *${isPrefix}infopremium*`, m)
      client.reply(m.chat, `🍟 Limit kamu : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nAnda bukan user premium\nLimit bot Anda akan direset jam 00.00\n\n*Upgrade premium ketik .infopremium*` : ''}`, m)
   },
   error: false
}