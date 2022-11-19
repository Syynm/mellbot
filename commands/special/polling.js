exports.run = {
   usage: ['poll'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         client.relayMessage(m.chat, {
   pollCreationMessage: {
      name: "Test tag @⁨WhatsApp Business⁩",
      options: [{
         optionName: "Vote 1"
      }, {
         optionName: "Vote 2"
      }, {
         optionName: "Vote 3"
      }],
      contextInfo: {
      	mentionedJid: ["0@s.whatsapp.net"]
      },
      selectableOptionsCount: 1
   },
}, {})
      } catch (e) {
         console.log(e)
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}