exports.run = {
   usage: ['me'],
   async: async (m, {
      client,
      isPrefix,
      blockList
   }) => {
      let user = global.db.users[m.sender]
      let pic = await Func.fetchBuffer('./media/images/default.jpg')
      let _own = [...new Set([global.owner, ...global.db.setting.owners])]
      let _mods = [...new Set([global.mods, ...global.db.setting.mods])]
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(m.sender, 'image'))
      } catch {} finally {
      let blocked = blockList.includes(m.sender) ? true : false
      let buttons = [{
               buttonId: `${isPrefix}gflimit ${m.sender}`,
               buttonText: {
                 displayText: 'RIWAYAT GIFT LIMIT'
               },
              type: 1
              }, {
                 buttonId: `${isPrefix}tfpoint ${m.sender}`,
                 buttonText: {
                   displayText: 'RIWAYAT TF SALDO'
               },
              type: 1
            }]
         let name = m.pushName || 'No Name'
         let now = new Date() * 1
         let lastseen = (user.lastseen == 0) ? 'Never' : Func.toDate(now - user.lastseen)
         let usebot = (user.usebot == 0) ? 'Never' : Func.toDate(now - user.usebot)
         let caption = `❏  *U S E R - P R O F I L E*\n\n`
         caption += `*Nama* : ${name}\n`
         caption += `*Saldo* : Rp. ${Func.h2k(Func.formatNumber(user.point))}\n`
         caption += `*Limit* : ${(user.premium || _own.includes(m.sender.split`@`[0])) ? '( ∞ ) Unlimited' : Func.formatNumber(user.limit)}\n`
         caption += `*Guard* : ${Func.formatNumber(user.guard)}\n`
         caption += `*Level* : ${Func.level(global.db.users[m.sender].point)[0]}\n`
         caption += `*Warning* : ${(m.isGroup) ? (typeof global.db.groups[m.chat].member[m.sender] != 'undefined' ? global.db.groups[m.chat].member[m.sender].warning : 0) + ' / 5' : user.warning + ' / 5'}\n`
         caption += `*Pakai bot* : ${Func.formatNumber(user.hit)}\n`
         caption += `*Aktif* : ${usebot}\n`
         caption += `*Terakhir dilihat* : ${lastseen}\n\n`
         caption += `❏  *U S E R - S T A T U S*\n\n`
         caption += `*Banned* : ${Func.switcher(user.banned, 'iya', 'tidak')}\n`
         caption += `*Whitelist* : ${Func.switcher(user.whitelist, 'iya', 'tidak')}\n`
         caption += `*Moderator* : ${Func.switcher(_mods.includes(m.sender.split`@`[0]), 'iya', 'bukan')}\n`
         caption += `*Owner* : ${Func.switcher(_own.includes(m.sender.split`@`[0]), 'iya', 'bukan')}\n`
         caption += `*Pesan pribadi* : ${Func.switcher(Object.keys(global.db.chats).includes(m.sender), 'bisa', 'tidak')}\n`
         caption += `*User vip* : ${Func.switcher(user.vip, 'iya', 'tidak')}\n`
         caption += `*Premium* : ${Func.switcher(user.premium, 'iya', 'tidak')}\n`
         caption += `*Sisa premium* : ${user.expired == 0 ? '-' : Func.timeReverse(user.expired - new Date * 1)}\n` 
         caption += `*Pacar* : ${typeof user.taken != 'undefined' && user.taken ? '@' + user.pasangan.split('@')[0] : 'jomblo'}\n`
         client.sendButton(m.chat, pic, caption, '⏱️ reset limit jam 00:00', m, buttons, {
                    document: true
            }, {
                thumbnail: pic,
                fileName: 'Simple WhatsApp BOT'
            })
      }
   },
   error: false,
   cache: true,
   location: __filename
}