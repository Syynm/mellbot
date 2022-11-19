let fs = require('fs')
exports.run = {
   usage: ['foot', 'footnext'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      if (!global.db.groups[m.chat].nsfw) return client.reply(m.chat, Func.texted('bold', `Mode NSFW tidak aktif di group ini`), m)
      client.reply(m.chat, global.status.getdata, m)
      let _fun = JSON.parse(fs.readFileSync('./media/json/foot.json'))
      let loli = Func.random(_fun)
      client.sendButton(m.chat, loli, 'sange kok sama kartun, stress...', global.db.setting.footer, m, [{
               buttonId: `${isPrefix}footnext`,
               buttonText: {
                  displayText: 'NEXT'
               },
               type: 1
            }])
   },
   limit: true
}