exports.run = {
   usage: ['hidetag','h'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      participants
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'ah ah'), m)
      let member = participants.map(v => v.id)
      client.reply(m.chat, text, null, {
               mentions: member
            })
   },
   admin: true,
   group: true
}
