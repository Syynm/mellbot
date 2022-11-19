const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['hitstat', 'hitdaily'],
   async: async (m, {
      client,
      isPrefix,
      command
   }) => {
      const types = command == 'hitstat' ? global.db.statistic : Object.fromEntries(Object.entries(global.db.statistic).filter(([_, prop]) => moment(prop.lasthit).format('DDMMYY') == moment(new Date).format('DDMMYY')))
      let stat = Object.keys(types)
      if (stat.length == 0) return client.reply(true, Func.texted('bold', `🚩 No command used.`), m)
      class Hit extends Array {
         total(key) {
            return this.reduce((a, b) => a + (b[key] || 0), 0)
         }
      }
      let sum = new Hit(...Object.values(types))
      let sorted = command == 'hitstat' ? Object.entries(types).sort((a, b) => b[1].hitstat - a[1].hitstat) : Object.entries(types).sort((a, b) => b[1].today - a[1].today)
      let prepare = sorted.map(v => v[0])
      let show = Math.min(10, prepare.length)
      let teks = `乂  *H I T S T A T*\n\n`
      teks += Func.texted('bold', `“Total command hit statistics ${command == 'hitstat' ? 'are currently' : 'for today'} ${Func.formatNumber(command == 'hitstat' ? sum.total('hitstat') : sum.total('today'))} hits.”`) + '\n\n'
      teks += sorted.slice(0, show).map(([cmd, prop], i) => (i + 1) + '. ' + '*Command*' + ' :  ' + isPrefix + cmd + '\n    ' + '*Hit*' + ' : ' + Func.formatNumber(command == 'hitstat' ? prop.hitstat : prop.today) + 'x\n    ' + moment(prop.lasthit).format('DD/MM/YY HH:mm:ss')).join`\n`
      teks += `\n\n${global.footer}`
      client.sendMessageModify2(m.chat, teks, m, {
         largeThumb: true,
         thumbnail: await Func.fetchBuffer('https://telegra.ph/file/2b6ac6553a76e9d725a5b.jpg')
      })
   },
   error: false,
   cache: true,
   location: __filename
}