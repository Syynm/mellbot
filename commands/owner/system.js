exports.run = {
   usage: ['autodownload', 'games', 'groupmode', 'online', 'multiprefix', 'self'],
   async: async (m, {
      client,
      args,
      command,
      isGod
   }) => {
      let system = global.db.setting
      if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `Select option on / off.`), m)
      let type = command.toLowerCase()
      let option = args[0].toLowerCase()
      let optionList = ['on', 'off']
      if (!optionList.includes(option)) return client.reply(m.chat, Func.texted('bold', `Select option on / off.`), m)
      let status = option != 'on' ? false : true
      if (type == 'autodownload') {
         if (system.autodownload == status) return client.reply(m.chat, Func.texted('bold', `Auto Download sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.autodownload = status
         return client.reply(m.chat, Func.texted('bold', `Auto Download berhasil ${args[0].toUpperCase()}.`), m)
      } else if (type == 'games') {
         if (system.games == status) return client.reply(m.chat, Func.texted('bold', `Fitur Game sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.games = status
         return client.reply(m.chat, Func.texted('bold', `Fitur Game berhasil ${args[0].toUpperCase()}.`), m)
      } else if (type == 'groupmode') {
         if (system.groupmode == status) return client.reply(m.chat, Func.texted('bold', `Group Mode sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.groupmode = status
         return client.reply(m.chat, Func.texted('bold', `Group Mode berhasil ${args[0].toUpperCase()}.`), m)
      } else if (type == 'online') {
         if (system.online == status) return client.reply(m.chat, Func.texted('bold', `Online sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.online = status
         return client.reply(m.chat, Func.texted('bold', `Online berhasil ${args[0].toUpperCase()}.`), m)
      } else if (type == 'multiprefix') {
         if (system.multiprefix == status) return client.reply(m.chat, Func.texted('bold', `Multi Prefix sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.multiprefix = status
         delete global.myPrefix
         return client.reply(m.chat, Func.texted('bold', `Multi Prefix berhasil ${args[0].toUpperCase()}.`), m)
      } else if (type == 'self') {
         if (system.self == status) return client.reply(m.chat, Func.texted('bold', `Self Mode sebelumnya sudah ${args[0].toUpperCase()}.`), m)
         system.self = status
         return client.reply(m.chat, Func.texted('bold', `Self Mode berhasil ${args[0].toUpperCase()}.`), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}