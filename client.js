const { useSingleFileAuthState, DisconnectReason, makeInMemoryStore, msgRetryCounterMap, delay } = require('baileys')
const session = process.argv[2] ? process.argv[2] + '.json' : 'session.json'
const { state, saveState } = useSingleFileAuthState(session)
const pino = require('pino'), path = require('path'), fs = require('fs'), colors = require('@colors/colors/safe'), qrcode = require('qrcode-terminal')
const spinnies = new (require('spinnies'))()
const { Socket, Serialize, Scandir } = require('./system/extra')
global.props = new (require('./system/dataset'))
const { Function } = require('./system/function')
global.Func = new Function
const { Scraper } = require('./system/scraper')
global.scrap = new Scraper
const { NeoxrApi } = require('./system/neoxrApi')
global.Api = new NeoxrApi('melbotvip')
global.store = makeInMemoryStore({
   logger: pino().child({
      level: 'silent',
      stream: 'store'
   })
})

const removeAuth = () => {
   try {
      fs.unlinkSync('./' + session)
   } catch {}
}

const connect = async () => {
   setInterval(removeAuth, 1000 * 60 * 1)
   let content = await props.fetch()
   if (!content || Object.keys(content).length === 0) {
      global.db = {
         users: {},
         chats: {},
         groups: {},
         statistic: {},
         sticker: {},
         setting: {},
         changelog: {},
         transfer_history: [],
         creds: {}
      }
      await props.save()
   } else {
      global.db = content
      try {
         if (global.db.creds) {
            credentials = {
               creds: content.creds
            }
            credentials.creds.noiseKey.private = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.noiseKey.private.buffer) : Buffer.from(credentials.creds.noiseKey.private)
            credentials.creds.noiseKey.public = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.noiseKey.public.buffer) : Buffer.from(credentials.creds.noiseKey.public)
            credentials.creds.signedIdentityKey.private = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signedIdentityKey.private.buffer) : Buffer.from(credentials.creds.signedIdentityKey.private)
            credentials.creds.signedIdentityKey.public = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signedIdentityKey.public.buffer) : Buffer.from(credentials.creds.signedIdentityKey.public)
            credentials.creds.signedPreKey.keyPair.private = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signedPreKey.keyPair.private.buffer) : Buffer.from(credentials.creds.signedPreKey.keyPair.private)
            credentials.creds.signedPreKey.keyPair.public = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signedPreKey.keyPair.public.buffer) : Buffer.from(credentials.creds.signedPreKey.keyPair.public)
            credentials.creds.signedPreKey.signature = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signedPreKey.signature.buffer) : Buffer.from(credentials.creds.signedPreKey.signature)
            credentials.creds.signalIdentities[0].identifierKey = /mongo/.test(process.env.DATABASE_URL) ? Buffer.from(content.creds.signalIdentities[0].identifierKey.buffer) : Buffer.from(credentials.creds.signalIdentities[0].identifierKey)
            //state.creds = credentials.creds
         } else {
            global.db.creds = state.creds
         }
      } catch (e) {
         console.log(e)
         global.db.creds = state.creds
      }
   }

   global.client = Socket({
      logger: pino({
         level: 'silent'
      }),
      printQRInTerminal: true,
      markOnlineOnConnect: true,
      msgRetryCounterMap,
      browser: ['@neoxr / neoxr-bot', 'Chrome', '1.0.0'],
      auth: state,
      // To see the latest version : https://web.whatsapp.com/check-update?version=1&platform=web
      version: [2, 2236, 10],
      getMessage: async (key) => {
         return await store.loadMessage(client.decodeJid(key.remoteJid), key.id)
      }
   })

   store.bind(client.ev)
   client.ev.on('connection.update', async (update) => {
      const {
         connection,
         lastDisconnect,
         qr
      } = update
      if (lastDisconnect == 'undefined' && qr != 'undefined') {
         qrcode.generate(qr, {
            small: true
         })
      }
      if (connection === 'connecting') spinnies.add('start', {
         text: 'Connecting . . .'
      })
      if (connection === 'open') {
         global.db.creds = client.authState.creds
         spinnies.succeed('start', {
            text: `Connected, you login as ${client.user.name || client.user.verifiedName}`
         })
      }
      if (connection === 'close') {
         if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
            spinnies.fail('start', {
               text: `Can't connect to Web Socket`
            })
            delete global.db.creds
            await props.save()
            process.exit(0)
         } else {
            connect().catch(() => connect())
         }
      }   
      // if (update.receivedPendingNotifications) await client.reply(global.owner + '@c.us', Func.texted('bold', `🚩 Successfully connected to WhatsApp.`))
   })

   client.ev.on('creds.update', () => saveState)

   client.ev.on('messages.upsert', async chatUpdate => {
      try {
         m = chatUpdate.messages[0]
         if (!m.message) return
         Serialize(client, m)
         Scandir('./commands').then(files => {
            global.client.commands = Object.fromEntries(files.filter(v => v.endsWith('.js')).map(file => [path.basename(file).replace('.js', ''), require(file)]))
         }).catch(e => console.error(e))
         require('./system/config'), require('./handler')(client, m)
      } catch (e) {
         console.log(e)
      }
   })

   client.ev.on('contacts.update', update => {
      for (let contact of update) {
         let id = client.decodeJid(contact.id)
         if (store && store.contacts) store.contacts[id] = {
            id,
            name: contact.notify
         }
      }
   })

   client.ev.on('group-participants.update', async (gc) => {
      let meta = await (await client.groupMetadata(gc.id))
      let member = gc.participants[0]
      let textwel = Func.texted('bold', `Welcome +tag to +grup.`)
      let textleft = Func.texted('bold', `+tag Sayonara`)
      let readmore = String.fromCharCode(8206).repeat(4001)
      let deskripsi = await (await client.groupMetadata(gc.id)).desc.toString()
      let groupSet = global.db.groups[gc.id]
      let prefixes = global.db.setting.multiprefix ? global.db.setting.prefix[0] : global.db.setting.onlyprefix
      let buttons = [{
         buttonId: `.ginfo`,
         buttonText: {
                  displayText: 'GROUP INFO'
               },
               type: 1
            }, {
               buttonId: `.swbtt`,
               buttonText: {
                  displayText: 'SEWA BOT'
               },
               type: 1
            }]
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(member, 'image'))
      } catch {
         pic = await Func.fetchBuffer('./media/images/default.jpg')
      }
      if (gc.action == 'promote') client.reply(gc.id, Func.texted('bold', `@${member.split`@`[0]} sekarang adalah admin 🗿`))
      if (gc.action == 'demote') client.reply(gc.id, Func.texted('bold', `@${member.split`@`[0]} yhaha di unadmin`))
      if (gc.action == 'add') {
         if (groupSet.localonly) {
            if (typeof global.db.users[member] != 'undefined' && !global.db.users[member].whitelist && !member.startsWith('62') || !member.startsWith('62')) {
               client.reply(gc.id, Func.texted('bold', `Sorry @${member.split`@`[0]}, this group is only for indonesian people and you will removed automatically.`))
               client.updateBlockStatus(member, 'block')
               return await Func.delay(2000).then(() => client.groupParticipantsUpdate(gc.id, [member], 'remove'))
            }
         }
         if (groupSet.anti212) {
            if (member.startsWith('212')) {
               client.reply(gc.id, Func.texted('bold', `Hai @${member.split`@`[0]} moroccoan people 🖕, you look like an idiot, sorry i kick`))
               client.updateBlockStatus(member, 'block')
               return await Func.delay(2000).then(() => client.groupParticipantsUpdate(gc.id, [member], 'remove'))
            }
         }
         let txt = (groupSet.textwel != '' ? groupSet.textwel : textwel).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.welcome) client.sendButton(gc.id, pic, `${txt}\n\n${readmore}${deskripsi}\n`, `${meta.subject}`, null, buttons, {
                    document: true
            }, {
                title: 'Tap! Join Group Official️',
                thumbnail: pic,
                fileName: 'Harap Baca Deskripsi'
            })
      } else if (gc.action == 'remove') {
         let txt = (groupSet.textleft != '' ? groupSet.textleft : textleft).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.left) client.sendMessageModify(gc.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: 'https://chat.whatsapp.com/EARvthLENgw2yxhDUKDuMr'
         })
      }
   })

   client.ws.on('CB:call', async json => {
      if (json.content[0].tag == 'offer') {
         let object = json.content[0].attrs['call-creator']
         await Func.delay(2000)
         await client.updateBlockStatus(object, 'block')
      }
   })

   setInterval(async () => {
      global.db.creds = client.authState.creds
      if (global.db) await props.save()
   }, 10_000)

   return client
}

connect().catch(() => connect())
