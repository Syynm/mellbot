module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users[m.sender]
   if (user) {
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('banned' in user)) user.banned = false
      if (!('banTemp' in user)) user.banTemp = false
      if (!('whitelist' in user)) user.whitelist = false
      if (!('premium' in user)) user.premium = false
      if (!('vip' in user)) user.vip = false
      if (!('tabungan' in user)) user.tabungan = 0
      if (!('history_nabung' in user)) user.history_nabung = []
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.limit)) user.limit = 25
      if (!isNumber(user.point)) user.point = 0
      if (!isNumber(user.guard)) user.guard = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.lastclaim)) user.lastclaim = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.usebot)) user.usebot = 0
      if (!isNumber(user.spam)) user.spam = 0
      if (!isNumber(user.warning)) user.warning = 0
      if (!('taken' in user)) user.taken = false
      if (!('pasangan' in user)) user.pasangan = ''
   } else {
      global.db.users[m.sender] = {
         afk: -1,
         afkReason: '',
         banned: false,
         banTemp: false,
         whitelist: false,
         premium: false,
         vip: false,
         tabungan: 0,
         history_nabung: [],
         expired: 0,
         limit: 25,
         point: 0,
         guard: 0,
         hit: 0,
         lastclaim: 0,
         lastseen: 0,
         usebot: 0,
         spam: 0,
         warning: 0,
         taken: false,
         pasangan: ''
      }
   }
   
   if (m.isGroup) {
      let group = global.db.groups[m.chat]
      if (group) {
         if (!isNumber(group.activity)) group.activity = new Date * 1
         if (!('autoread' in group)) group.autoread = false
         if (!('banned' in group)) group.banned = false
         if (!('mute' in group)) group.mute = false
         if (!('game' in group)) group.game = false
         if (!('nsfw' in group)) group.game = false
         if (!('welcome' in group)) group.welcome = true
         if (!('textwel' in group)) group.textwel = ''
         if (!('left' in group)) group.left = true
         if (!('textleft' in group)) group.textleft = ''
         if (!('notify' in group)) group.notify = false
         if (!('spamProtect' in group)) group.spamProtect = false
         if (!('localonly' in group)) group.localonly = false
         if (!('nodelete' in group)) group.nodelete = false
         if (!('nobadword' in group)) group.nobadword = false
         if (!('nolink' in group)) group.nolink = true
         if (!('antitagall' in group)) group.antitagall = false
         if (!('novirtex' in group)) group.novirtex = false
         if (!('anti212' in group)) group.anti212 = false
         if (!('adminmode' in group)) group.adminmode = false
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
         if (!('antidelete' in group)) group.antidelete = true
         if (!('member' in group)) group.member = {}
      } else {
         global.db.groups[m.chat] = {
            activity: new Date * 1,
            autoread: false,
            banned: false,
            mute: false,
            game: false,
            nsfw: false,
            welcome: true,
            textwel: '',
            left: true,
            textleft: '',
            notify: false,
            spamProtect: false,
            localonly: false,
            nodelete: true,
            nobadword: false,
            nolink: true,
            antitagall: false,
            novirtex: false,
            anti212: false,
            adminmode: false,
            expired: 0,
            stay: false,
            antidelete: true,
            member: {}
         }
      }
   }
   let chat = global.db.chats[m.chat]
   if (chat) {
      if (!isNumber(chat.command)) chat.command = 0
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
   } else {
      global.db.chats[m.chat] = {
         command: 0,
         chat: 0,
         lastseen: 0
      }
   }
   
   let setting = global.db.setting
   if (setting) {
      if (!('setmenu' in setting)) setting.setmenu = 1
      if (!('autobackup' in setting)) setting.autobackup = false
      if (!isNumber(setting.backupTime)) setting.backupTime = 36000
      if (!('autodelete' in setting)) setting.autodelete = true
      if (!isNumber(setting.deleteTime)) setting.deleteTime = 60000
      if (!('autodownload' in setting)) setting.autodownload = false
      if (!('online' in setting)) setting.online = false
      if (!('debug' in setting)) setting.debug = false
      if (!('direct' in setting)) setting.direct = false
      if (!('games' in setting)) setting.games = true
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('self' in setting)) setting.self = false
      if (!('errorCmd' in setting)) setting.errorCmd = []
      if (!isNumber(setting.messageSent)) setting.messageSent = 10
      if (!isNumber(setting.messageReceive)) setting.messageReceive = 10
      if (!isNumber(setting.uploadSize)) setting.uploadSize = 0
      if (!isNumber(setting.receiveSize)) setting.receiveSize = 0
      if (!('asupan' in setting)) setting.asupan = ["fyp", "kucing"]
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"]
      if (!('sk_pack' in setting)) setting.sk_pack = 'Sticker'
      if (!('sk_author' in setting)) setting.sk_author = '@armandd__'
      if (!isNumber(setting.setmenu)) setting.setmenu = 1
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = ['6287823406145', '6287823406145', '6287823406145']
      if (!('mods' in setting)) setting.mods = []
      if (!('link' in setting)) setting.link = 'https://chat.whatsapp.com/CmJkktfVp0H2Gl4v11VOLW'
      if (!('cover' in setting)) setting.cover = 'https://telegra.ph/file/b277cff79c78eba2d9661.jpg'
      if (!('header' in setting)) setting.header = 'NuxL BOT-WHATSAPP'
      if (!('msg' in setting)) setting.msg = 'I am a Whatsapp BOT, use a bot in private chat so that bots can respond quickly.'
      if (!('footer' in setting)) setting.footer = 'ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ᴡᴀɴɢsᴀғ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴀʀᴍᴀɴᴅ_'
   } else {
      global.db.setting = {
         setmenu: 1,
         autobackup: true,
         backupTime: 2000,
         autodelete: true,
         deleteTime: 60000,
         autodownload: true,
         online: true,
         debug: false,
         direct: false,
         games: true,
         groupmode: false,
         self: false,
         errorCmd: [],
         uploadSize: 0,
         receiveSize: 0,
         asupan: ["pargoy", "soibah"],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"],
         sk_pack: 'Sticker',
         sk_author: '@armand__',
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         onlyprefix: '+',
         owners: ['6287823406145', '6287823406145', '6287823406145'],
         mods: [],
         link: 'https://chat.whatsapp.com/CmJkktfVp0H2Gl4v11VOLW',
         cover: 'https://telegra.ph/file/b277cff79c78eba2d9661.jpg',
         header: 'NuxL BOT-WHATSAPP',
         msg: 'I am a Whatsapp BOT, use a bot in private chat so that bots can respond quickly.',
         footer: 'ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ᴡᴀɴɢsᴀғ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴀʀᴍᴀɴᴅ'
      }
   }
}
