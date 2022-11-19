exports.run = {
   usage: ['clown'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, 'Reply potonya!', m)
      let img = await q.download()
      if (!img) return client.reply(m.chat, global.status.wrong, m)
      client.reply(m.chat, global.status.wait, m)
      let result = await Api.ie(command, text)
      client.sendFile(m.chat, result, '', '', m)
   },
   error: false,
   cache: true,
   location: __filename
}