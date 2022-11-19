exports.run = {
   usage: ['point', 'saldo', 'uang'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      let user = global.db.users[m.sender]
      if (user.point < 1) return client.reply(m.chat, `Kamu tidak mempunyai saldo, untuk mendapatkan saldo silahkan kirim *${isPrefix}claim*`, m)
      client.reply(m.chat, Func.texted('bold', `Kamu mempunyai saldo sebanyak ${Func.h2k(Func.formatNumber(user.point))} (${Func.formatNumber(user.point)})`), m)
   },
   error: false
}