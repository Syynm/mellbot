exports.run = {
   usage: ['demote', 'kick', 'kickall', 'add'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      participants
   }) => {
     if (command == 'kickall') {
       const member = participants.map(v => v.id)
       for (let jid of member) {
            if (jid != client.decodeJid(client.user.id)) {
               await Func.delay(1500)
               client.groupParticipantsUpdate(m.chat, [jid], 'remove')
            }
         }
      }
      let number = m.quoted ? m.quoted.sender : m.mentionedJid.length != 0 ? m.mentionedJid[0] : isNaN(text) ? text.replace(/[()+\s-]/g, '') + '@s.whatsapp.net' : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `Mention atau Reply chat target.`), m)
      if (await client.onWhatsApp(number).length == 0) return client.reply(m.chat, Func.texted('bold', `Nomor tidak terdaftar di WhatsApp.`), m)
      try {
         let mention = number.replace(/@.+/g, '')
         if (command == 'add') return client.groupParticipantsUpdate(m.chat, [number], 'add').then(res => client.reply(m.chat, Func.jsonFormat(res), m))
         let users = m.isGroup ? participants.find(u => u.id == number) : {}
         if (!users) return client.reply(m.chat, Func.texted('bold', `@${mention} sudah keluar / tidak ada digrup ini.`), m)
         if (number == client.decodeJid(client.user.id)) return client.reply(m.chat, Func.texted('bold', `??`), m)
         if (command == 'kick') return client.groupParticipantsUpdate(m.chat, [number], 'remove').then(res => client.reply(m.chat, Func.jsonFormat(res), m))
         if (command == 'demote') return client.groupParticipantsUpdate(m.chat, [number], 'demote').then(res => client.reply(m.chat, Func.jsonFormat(res), m))
      } catch (e) {
         console.log(e)
         client.reply(m.chat, global.status.error, m)
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}