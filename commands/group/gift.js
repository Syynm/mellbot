exports.run = {
   usage: ['gf', 'gift'],
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      let history = global.db.transfer_history ? global.db.transfer_history : global.db.transfer_history = []
      if (m.quoted) {
         if (m.quoted.isBot) return client.reply(m.chat, Func.texted('bold', `Tidak bisa melakukan gift kepada bot.`), m)
         if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `Berikan nominal limit yang akan di gift.`), m)
         if (isNaN(args[0])) return client.reply(m.chat, Func.texted('bold', `Limit harus berupa angka.`), m)
         let nominal = parseInt(args[0])
         let limit = global.db.users[m.sender].limit
         let target = client.decodeJid(m.quoted.sender)
         if (target == m.sender) return client.reply(m.chat, Func.texted('bold', `Tidak bisa melakukan gift kepada diri sendiri.`), m)
         if (nominal > limit) return client.reply(m.chat, Func.texted('bold', `Limitmu tidak cukup untuk melakukan gift.`), m)
         if (nominal < 10) return client.reply(m.chat, Func.texted('bold', `Nominal limit untuk di gift minimal 10.`), m)
         global.db.users[m.sender].limit -= nominal
         global.db.users[target].limit += nominal
         const sn = Func.makeId(30)
         history.push({
            sn,
            fromJid: m.sender,
            toJid: target,
            nominal,
            ppn: '-',
            type: 'TF_LIMIT',
            date: new Date * 1
         })
         let teks = `❏  *G I F T*\n\n`
         teks += `“Berhasil melakukan gift kepada *@${target.replace(/@.+/g, '')}* dengan nominal _${Func.formatNumber(nominal)} limit_”\n\n`
         teks += `➠ *Sisa Limit* : ${Func.formatNumber(global.db.users[m.sender].limit)}\n`
         teks += `➠ *SN* : ${sn}`
         client.reply(m.chat, teks, m)
      } else if (m.mentionedJid.length != 0) {
         if (!args || !args[1]) return client.reply(m.chat, Func.texted('bold', `Berikan nominal limit yang akan di gift.`), m)
         if (isNaN(args[1])) return client.reply(m.chat, Func.texted('bold', `Limit harus berupa angka.`), m)
         let nominal = parseInt(args[1])
         let limit = global.db.users[m.sender].limit
         let target = client.decodeJid(m.mentionedJid[0])
         if (target == client.decodeJid(client.user.id)) return client.reply(m.chat, Func.texted('bold', `Tidak bisa melakukan gift kepada bot.`), m)
         if (target == m.sender) return client.reply(m.chat, Func.texted('bold', `Tidak bisa melakukan gift kepada diri sendiri.`), m)
         if (Func.level(global.db.users[target].limit + nominal)[0] >= 50) return client.reply(m.chat, Func.texted('bold', `Tidak bisa melakukan gift karena target telah mencapai batas maximum.`), m)
         if (nominal > limit) return client.reply(m.chat, Func.texted('bold', `Limitmu tidak cukup untuk melakukan gift.`), m)
         if (nominal < 10) return client.reply(m.chat, Func.texted('bold', `Nominal limit untuk di gift minimal 10K.`), m)
         global.db.users[m.sender].limit -= nominal
         global.db.users[target].limit += nominal
         const sn = Func.makeId(30)
         history.push({
            sn,
            fromJid: m.sender,
            toJid: target,
            nominal,
            ppn: '-',
            type: 'TF_LIMIT',
            date: new Date * 1
         })
         let teks = `❏  *G I F T*\n\n`
         teks += `“Berhasil melakukan gift kepada *@${target.replace(/@.+/g, '')}* dengan nominal _${Func.formatNumber(nominal)} limit_”\n\n`
         teks += `➠ *Sisa Limit* : ${Func.formatNumber(global.db.users[m.sender].limit)}\n`
         teks += `➠ *SN* : ${sn}`
         client.reply(m.chat, teks, m)
      } else {
         let teks = `• *Example* :\n\n`
         teks += `${isPrefix + command} @0 10\n`
         teks += `${isPrefix + command} 10 (reply chat target)`
         client.reply(m.chat, teks, m)
      }
   },
   error: false,
   group: true
}