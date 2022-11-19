exports.run = {
   usage: ['fb', 'facebook', 'fbdl'],
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
         client.reply(m.chat, global.status.getdata, m)
         let json = await Api.fb(args[0])
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         if (command == 'fb') {
            let result = json.data.find(v => v.quality == 'HD')
            if (result.response == 200) {
               client.sendVideo(m.chat, result.url, `乂  *F A C E B O O K - D O W N L O A D E R*\n\n	◦  Kualitas : ${json.data.quality}\n	◦  Bytes : ${json.data.bytes}\n	◦  Ukuran : ${json.data.size}\n	◦  Extension : ${json.data.type}\n\n${global.db.setting.footer}`, m)
            } else {
               let result = json.data.find(v => v.quality == 'SD')
               if (result.response != 200) return client.reply(m.chat, global.status.fail, m)
               client.sendVideo(m.chat, result.url, `乂  *F A C E B O O K - D O W N L O A D E R*\n\n	◦  Kualitas : ${json.data.quality}\n	◦  Bytes : ${json.data.bytes}\n	◦  Ukuran : ${json.data.size}\n	◦  Extension : ${json.data.type}\n\n${global.db.setting.footer}`, m)
            }
         }
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}	