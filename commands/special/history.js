const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['history', 'tfpoint', 'gflimit'],
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      if (command == 'tfpoint') {
         let data = global.db.transfer_history
         if (data.length == 0) return client.reply(m.chat, `Kamu belum pernah transfer kepada siapapun!!`, m)
         let TF_P = args[0] ? data.filter(v => v.type == 'TF_POINT' && v.fromJid == args[0]) : data.filter(v => v.type == 'TF_POINT')
         if (TF_P.length == 0) return client.reply(m.chat, `Kamu belum pernah transfer kepada siapapun!`, m)
         TF_P.sort((a, b) => b.date - a.date)
         let teks = `❏  *T F - H I S T O R Y*\n\n`
         teks += TF_P.slice(0, 20).map((v, i) => (i + 1) + '. Transfer saldo kepada @' + v.toJid.replace(/@.+/,'') + '\n	◦  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◦  *PPN* :  ' + Func.formatNumber(v.ppn) + '\n	◦  *Date* :  ' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '\n	◦  *SN* :  ' + v.sn).join`\n\n`
         teks += `\n\n${global.db.setting.footer}`
         client.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/a525fb257836df427e66e.jpg')
         })
      } else if (command == 'gflimit') {
         let data = global.db.transfer_history
         if (data.length == 0) return client.reply(m.chat, `Kamu belum pernah gift limit kepada siapapun!!`, m)
         let TF_L = args[0] ? data.filter(v => v.type == 'TF_LIMIT' && v.fromJid == args[0]) : data.filter(v => v.type == 'TF_LIMIT')
         if (TF_L.length == 0) return client.reply(m.chat, `Kamu belum pernah gift limit kepada siapapun!`, m)
         TF_L.sort((a, b) => b.date - a.date)
         let teks = `❏  *G I F T - L I M I T - H I S T O R Y*\n\n`
         teks += TF_L.slice(0, 20).map((v, i) => (i + 1) + '. Gift limit kepada @' + v.toJid.replace(/@.+/,'') + '\n	◦  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◦  *PPN* :  -\n	◦  *Date* :  ' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '\n	◦  *SN* :  ' + v.sn).join`\n\n`
         teks += `\n\n${global.db.setting.footer}`
         client.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/a525fb257836df427e66e.jpg')
         })
      } else if (command == 'history') {
         let rows = [{
            title: 'LIMIT',
            rowId: `${isPrefix}gflimit`,
            description: ``
         }, {
            title: 'POINT',
            rowId: `${isPrefix}tfpoint`,
            description: ``
         }]
         await client.sendList(m.chat, '', info(), '© melbot', 'Tap!', rows, m)
      }
   },
   error: false
}

let info = () => {
   return `📊 Riwayat / history transfer & gift limit

➠ info tf saldo 

➠ riwayat gift limit

➠ *Penting!* simpan nomor owner dan gabung ke dalam grup official : (https://chat.whatsapp.com/EARvthLENgw2yxhDUKDuMr)`
}