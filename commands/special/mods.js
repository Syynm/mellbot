exports.run = {
   usage: ['mods', 'mod'],
   async: async (m, {
      client,
      command
   }) => {
      // if (command == 'owner') return client.reply(m.chat, `Interkasi owner dengan user via WhatsApp sudah tidak tersedia lagi, jika ingin upgrade premium atau ada hal penting lainnya silahkan kirim pesan melalui email dengan subjek *"MINT"*\n\n✉️ : contact@neoxr.my.id`, m)
      if (command == 'mods') {
         const contact = [{
            name: 'Loli',
            number: '6281257735703',
            about: 'Moderator melbot'
         }, {
            name: 'Wildan ( neoxr-bot )',
            number: '6285221100126',
            about: 'Moderator melbot'
         }, {
            name: 'Mel',
            number: global.owner,
            about: 'Moderator melbot'
         }]
         const msg = await client.sendContact(m.chat, contact, m)
         await client.reply(m.chat, `Silahkan hubungi moderator jika nomor anda ter banned dan ter block oleh bot`, msg)
      }
      // if (command == 'owners') return client.sendContactArr(m.chat, global.db.setting.owners, m)
   },
   error: false,
   cache: true,
   location: __filename
}