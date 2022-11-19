let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['stat', 'botstat'],
   async: async (m, {
      client
   }) => {
      try { 
      let groups = await (await client.groupList()).length
      let chats = Object.keys(global.db.chats).filter(v => v.endsWith('.net')).length
      let users = Object.keys(global.db.users).length
      let premium = Object.entries(global.db.users).filter(([jid, data]) => data.premium).length
      let stat = Object.keys(global.db.statistic)
      class Hit extends Array {
         total(key) {
            return this.reduce((a, b) => a + (b[key] || 0), 0)
         }
      }
      let sum = new Hit(...Object.values(global.db.statistic))
      let hitstat = sum.total('hitstat') != 0 ? sum.total('hitstat') : 0
      let system = global.db.setting
      let procUp = process.uptime() * 1000
      let uptime = Func.toTime(procUp)
      let banned = 0
      for (let jid in global.db.users) global.db.users[jid].banned ? banned++ : ''
      let whitelist = 0
      for (let jid in global.db.users) global.db.users[jid].whitelist ? whitelist++ : ''
      let point = [...new Set(Object.entries(global.db.users).filter(([v, x]) => v.point != 0).map(([v, x]) => x.point))]
      let limit = [...new Set(Object.entries(global.db.users).filter(([v, x]) => v.limit != 0).map(([v, x]) => x.limit))]
      let hit = [...new Set(Object.entries(global.db.users).filter(([v, x]) => v.hit != 0).map(([v, x]) => x.hit))]
      let online = [...new Set(Object.entries(global.db.users).filter(([v, x]) => v.lastseen != 0).map(([v, x]) => x.lastseen))]
      let avg = {
         point: Func.formatNumber((point.reduce((a, b) => a + b) / point.length).toFixed(0)),
         limit: Func.formatNumber((limit.reduce((a, b) => a + b) / limit.length).toFixed(0)),
         hit: Func.formatNumber((hit.reduce((a, b) => a + b) / hit.length).toFixed(0)),
         online: (online.reduce((a, b) => a + b) / online.length).toFixed(0),
      }
      client.sendMessageModify2(m.chat, await botstat(groups, chats, users, premium, system, banned, whitelist, hitstat, uptime, avg), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/8867e719abfc69f0489ff.jpg'),
      })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

let botstat = async (groups, chats, users, premium, system, banned, whitelist, hitstat, uptime, avg) => {
   return `乂  *B O T S T A T*

	◦  ${Func.texted('bold', groups)} Groups Joined
	◦  ${Func.texted('bold', chats)} Personal Chats
	◦  ${Func.texted('bold', users)} Users In Database
	◦  ${Func.texted('bold', banned)} Users Banned
   ◦  ${Func.texted('bold', premium)} Users Premium
	◦  ${Func.texted('bold', whitelist)} Whitelist
	◦  ${Func.texted('bold', setting.errorCmd.length)} Plugin Error
	◦  Runtime : ${Func.texted('bold', uptime)}

乂  *S Y S T E M*

	◦  ${Func.switcher(system.autodownload, '[ √ ]', '[ × ]')}  Auto Download
	◦  *[ × ]*  Chat AI
	◦  *[ × ]*  Debug Mode
	◦  ${Func.switcher(system.games, '[ √ ]', '[ × ]')}  Game Features
	◦  ${Func.switcher(system.self, '[ √ ]', '[ × ]')}  Self Mode
   ◦  ${Func.switcher(system.online, '[ √ ]', '[ × ]')}  Always Online
   ◦  ${Func.switcher(system.groupmode, '[ √ ]', '[ × ]')}  Group Mode
   ◦  ${Func.switcher(system.autobackup, '[ √ ]', '[ × ]')}  Auto Backup
	◦  Prefix : ${system.multiprefix ? ' ( ' + system.prefix.map(v => v).join(' ') + ' )' : ' ( ' + system.onlyprefix + ' )'}

乂  *M E S S A G E*

	◦  ${Func.texted('bold', Func.formatNumber(system.messageSent))} Message Send
	◦  ${Func.texted('bold', Func.formatNumber(system.messageReceive))} Message Received
	◦  ${Func.texted('bold', await Func.getSize(setting.uploadSize))} Media Sent
	◦  ${Func.texted('bold', await Func.getSize(setting.receiveSize))} Media Received

${global.db.setting.footer}`
}