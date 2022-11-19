let fs = require('fs')
exports.run = {
   usage: ['orgy', 'orgynext'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      if (!global.db.groups[m.chat].nsfw) return client.reply(m.chat, Func.texted('bold', `Mode NSFW tidak aktif di group ini`), m)
      client.reply(m.chat, global.status.getdata, m)
      let _fun = JSON.parse(fs.readFileSync('./media/json/orgy.json'))
      let loli = Func.random(_fun)
      client.sendButton(m.chat, loli, 'sange kok sama kartun, stress...', global.db.setting.footer, m, [{
               buttonId: `${isPrefix}orgynext`,
               buttonText: {
                  displayText: 'NEXT'
               },
               type: 1
            }])
   },
   limit: true
}