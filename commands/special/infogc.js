let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['stel'],
   async: async (m, {
      client,
      args
   }) => {
      try { 
      let jid = args[0]
      let set = global.db.groups[jid]
      let time = set.stay ? 'PERMANEN' : (set.expired == 0 ? '-' : Func.timeReverse(set.expired - new Date() * 1))
      let member = groupMetadata.participants.map(u => u.id).length
      let pic = await Func.fetchBuffer(await client.profilePictureUrl(jid, 'image'))
          let data = {
          name: groupName,
          member,
          time,
          set,
          admin
      }
      client.sendMessageModify2(m.chat, pic, await steal(data), m, {
            largeThumb: true,
            thumbnail: pic
      })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

let steal = async (data) => {
   return `❏  *G R O U P - S T A L K*

	›  *Name* : ${data.name}
	
	›  *Member* : ${data.member}
	
	›  *Expired* : ${data.time}
	
	›  *Status* : ${Func.switcher(data.set.mute, 'OFF', 'ON')}
	
	›  *Bot Admin* : ${Func.switcher(data.admin, 'iya', 'tidak')}

${global.db.setting.footer}`
}