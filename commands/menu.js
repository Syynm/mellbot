exports.run = {
   usage: ['menu', 'help', 'bot', 'admintools', 'tools'],
   async: async (m, {
      client,
      isPrefix,
      command,
      isOwner
   }) => {
      try {
         if (/menu|help|bot/.test(command)) {
            let menuType = global.db.setting.setmenu
            const link = global.db.setting.link          
            client.menu = client.menu ? client.menu : {}
            let id = m.chat
            try {
               pic = await Func.fetchBuffer(await client.profilePictureUrl(m.sender, 'image'))
            } catch {
               pic = await Func.fetchBuffer('./media/images/thumb.jpg')
            }
            if (!isOwner && (id in client.menu)) {
               global.db.statistic[command].hitstat -= 1
               return client.reply(m.chat, `Ma'af @${m.sender.split`@`[0]} ^\nUntuk menghindari spam, menu di tampilkan setiap *3 menit* sekali.`, client.menu[id][0])
            }
            let button = [{
                buttonId: `${isPrefix}owner`,
                buttonText: {
                   displayText: 'OWNER'
                },
                type: 1
            },
            {
                 buttonId: `${isPrefix}dnsiii`,
                 buttonText: {
                    displayText: 'DONASI'
            },
            type: 1
            }]
            let buttons = [{
               urlButton: {
                        displayText: `OWNER`,
                        url: `https://wa.me/84888725073?text=order+bot+bang`
                     }
                  },
                  {
                     quickReplyButton: {
                        displayText: 'DONASI',
                        id: `${isPrefix}dnsiii`
                     }
                  },
                  {
                     quickReplyButton: {
                        displayText: 'PREMIUM',
                        id: `${isPrefix}premium`
                     }
                  }
               ]
            if (menuType == 1) {
               client.menu[id] = [
                  await client.sendMessageModify2(m.chat, await menu(m, readmore, global.db.setting, isPrefix), m, {
            largeThumb: true,
            thumbnail: global.db.setting.cover
            }),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 2) {
               client.menu[id] = [
                  await client.sendButton(m.chat, global.db.setting.cover, await menu(m, readmore, global.db.setting, isPrefix), '', null, button, {
                    document: true
            }, {
                thumbnail: await Func.fetchBuffer(global.db.setting.cover),
                fileName: Func.greeting(m.pushName)
            })
               ]
            } else if (menuType == 3) {
               client.menu[id] = [
                  await client.sendTemplateButton(m.chat, global.db.setting.cover, await menu(m, readmore, global.db.setting, isPrefix), '                       Ⓟ premium | Ⓛ limit', buttons, {
                     document: true,
                     name: '𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘰𝘵'
                  }),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 4) {
               client.menu[id] = [
                  await client.sendTemplateButton(m.chat, global.db.setting.cover, await menu(m, readmore, global.db.setting, isPrefix), '                       ワッツアップ ', buttons, {
                     location: true
                  }),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 5) {
               client.menu[id] = [
                  await client.sendTemplateButton(m.chat, await Func.fetchBuffer('./media/video/video.mp4'), await menu(m, readmore, global.db.setting, isPrefix), '                         Ⓟ premium | Ⓛ limit', buttons, {
                     gif: true
                  }),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 6) {
               client.menu[id] = [
                  await client.sendTemplateButton(m.chat, global.db.setting.cover, await menu(m, readmore, global.db.setting, isPrefix), '                       Ⓟ premium | Ⓛ limit', buttons),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 7) {
               client.menu[id] = [
                  await client.sendTemplateButton(m.chat, await Func.fetchBuffer('./media/video/video.mp4'), await menu(m, readmore, global.db.setting, isPrefix), '                         Ⓟ premium | Ⓛ limit', buttons),
                  setTimeout(() => {
                     delete client.menu[id]
                  }, 180000)
               ]
            } else if (menuType == 8) {
            	let rows = [{
            		title: '𝗨𝗔𝗡𝗚 & 𝗟𝗜𝗠𝗜𝗧',
            		rowId: `${isPrefix}submenu 1`,
            		description: ``
            	}, {
            		title: '𝗦𝗘𝗔𝗥𝗖𝗛',
            		rowId: `${isPrefix}submenu 2`,
            		description: ``
            	}, {
            		title: '𝗙𝗨𝗡 𝗚𝗔𝗠𝗘',
            		rowId: `${isPrefix}submenu 3`,
            		description: ``
            	}, {
            		title: '𝗥𝗔𝗡𝗗𝗢𝗠 𝗜𝗠𝗔𝗚𝗘',
            		rowId: `${isPrefix}submenu 4`,
            		description: ``
            	}, {
            		title: '𝗢𝗧𝗛𝗘𝗥',
            		rowId: `${isPrefix}submenu 5`,
            		description: ``
            	}, {
            		title: '𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥',
            		rowId: `${isPrefix}submenu 6`,
            		description: ``
            	}, {
            		title: '𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
            		rowId: `${isPrefix}submenu 7`,
            		description: ``
            	}, {
            		title: '𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥',
            		rowId: `${isPrefix}submenu 8`,
            		description: ``
            	}, {
            		title: '𝗚𝗥𝗢𝗨𝗣',
            		rowId: `${isPrefix}submenu 9`,
            		description: ``
            	}, {
            		title: '𝗢𝗪𝗡𝗘𝗥',
            		rowId: `${isPrefix}submenu 10`,
            		description: ``
            	}]
            	await client.sendList(m.chat, '', `Hai ${m.pushName || Beib} 🏅\n\n“${setting.msg}”\n\nUntuk bisa menggunakan bot di personal chat (PC) kamu harus  upgrade ke premium user\nJika ingin upgrade ke premium silahkan ketik *.premium*\n\nTap Dibawah Untuk menampilkan list menu 📮`, '', 'Tap!', rows, m)  
            }
         }
         if (/admintools/.test(command)) return client.fakeStory(m.chat, admin(isPrefix), global.db.setting.header)
         if (/tools/.test(command)) {
            if (!isOwner) return client.reply(m.chat, global.status.owner, m)
            return client.fakeStory(m.chat, tools(isPrefix), global.db.setting.header)
         }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

const readmore = String.fromCharCode(8206).repeat(4001)
const menu = async (m, readmore, setting, prefix) => {
   let point = [...new Set(Object.entries(global.db.users).filter(([v, x]) => x.point > 0).map(([v, x]) => x.point))]
   let limit = [...new Set(Object.entries(global.db.users).filter(([v, x]) => x.limit > 0).map(([v, x]) => x.limit))]
   return `${/8|9/.test(global.db.setting.setmenu) ? Func.greeting('@' + m.sender.replace(/@.+/,'')) : Func.greeting(m.pushName || 'Beib')} (Lv. ${Func.level(global.db.users[m.sender].point)[0]})
Saldo Rp. ${Func.h2k(Func.formatNumber(global.db.users[m.sender].point))}

Im simple WhatsApp bot, *gunakan bot di private chat agar bot dapat merespon dengan cepat.*

◦ *Database* : Multi Database
◦ *Received* : ${Func.texted('bold', await Func.getSize(global.db.setting.receiveSize))}
◦ *Upload* : ${Func.texted('bold', await Func.getSize(global.db.setting.uploadSize))}
◦ *Runtime* : ${Func.toTime(process.uptime() * 1000)}
◦ *Mode* : ${setting.groupmode ? '*Khusus Group*' : '*Public*'}

Jika Anda menemukan kesalahan atau ingin meningkatkan paket premium, hubungi owner!
${readmore}
❏  *P O I N T & L I M I T*

	◦  ${prefix}buy
	◦  ${prefix}buyguard
	◦  ${prefix}claim
	◦  ${prefix}guard
	◦  ${prefix}transfer *@tag* nominal
	◦  ${prefix}limit
	◦  ${prefix}me
	◦  ${prefix}point
	◦  ${prefix}profile
	◦  ${prefix}toplocal
	◦  ${prefix}topglobal
	◦  ${prefix}topuser
	◦  ${prefix}topuserlocal 
	
❏  *I M A G E - E F F E C T*

	◦  ${prefix}alien
	◦  ${prefix}brick
	◦  ${prefix}bunny
	◦  ${prefix}caricature
	◦  ${prefix}clown
	◦  ${prefix}ink
	◦  ${prefix}latte
	◦  ${prefix}letter
	◦  ${prefix}pencil
	◦  ${prefix}puzzle
	◦  ${prefix}roses
	◦  ${prefix}sketch
	◦  ${prefix}splash
	◦  ${prefix}staco	

❏  *S E A R C H*

	◦  ${prefix}alquran
	◦  ${prefix}whatanime
	◦  ${prefix}wattpad *judul*
	◦  ${prefix}drakor *judul*
	◦  ${prefix}anime *judul*
	◦  ${prefix}film *judul*
	◦  ${prefix}google <query>
	◦  ${prefix}githubstalk
	◦  ${prefix}igstalk
	◦  ${prefix}ytsearch <query> 
	◦  ${prefix}whatmusic <caption / reply> 
  
❏  *F U N - G A M E*

	◦  ${prefix}attack
	◦  ${prefix}adventure
	◦  ${prefix}barbar
	◦  ${prefix}brainout
	◦  ${prefix}coin *A* / *B*
	◦  ${prefix}math *mode*
	◦  ${prefix}riddle
	◦  ${prefix}slot
	◦  ${prefix}spin *point*
	◦  ${prefix}ttt
	◦  ${prefix}ttt *room*
	◦  ${prefix}tictactoe
	◦  ${prefix}tebaklirik
	◦  ${prefix}tebaktebakan
	◦  ${prefix}caklontong
	◦  ${prefix}whatsong
	◦  ${prefix}whatword
	◦  ${prefix}whoami
	◦  ${prefix}truth
	◦  ${prefix}dare
	◦  ${prefix}apakah
	◦  ${prefix}kapankah
	◦  ${prefix}siapakah
	◦  ${prefix}susunkata 
	◦  ${prefix}tebakkata
	◦  ${prefix}tebakbom
	◦  ${prefix}tebakgambar 
 
❏  *S O S M E D - S H O P*

	◦  .panel
	◦  .panel2

❏  *T E X T - M A K E R*

	◦  .blackpink
	◦  .blood
	◦  .breakwall
	◦  .glow
	◦  .joker
	◦  .magma
	◦  .matrix
	◦  .multicolor
	◦  .neon
	◦  .papercut
	◦  .slice	 
  
❏  *N S F W* 

	◦  .loli
	◦  .waifu 
	◦  ${prefix}ahegao
	◦  ${prefix}ass
	◦  ${prefix}bdsm
	◦  ${prefix}blowjob
	◦  ${prefix}cuckold
	◦  ${prefix}cum
	◦  ${prefix}ero
	◦  ${prefix}femdom
	◦  ${prefix}foot
	◦  ${prefix}gangbang
	◦  ${prefix}glasses
	◦  ${prefix}hentaigifs
	◦  ${prefix}jahy
	◦  ${prefix}manga
	◦  ${prefix}masturbation
	◦  ${prefix}nsfwNeko
	◦  ${prefix}orgy
	◦  ${prefix}pussy
	◦  ${prefix}yuri

❏  *O T H E R*

	◦  ${prefix}sadboy
	◦  ${prefix}sadgirl
	◦  ${prefix}bucin
	◦  ${prefix}senja
	◦  ${prefix}fakta
	◦  ${prefix}tag *text*
	◦  ${prefix}tagme
	◦  ${prefix}wame *text*
	◦  ${prefix}react *emoji*
	◦  ${prefix}artinama *nama*
	◦  ${prefix}artinama2 *nama* 	
	◦  ${prefix}urban *word*
	◦  ${prefix}sindiran
	◦  ${prefix}kataanime
	◦  ${prefix}desahancewek
	◦  ${prefix}desahancowok
  
❏  *C O N V E R T E R*

	◦  ${prefix}toimg <reply> 
	◦  ${prefix}tomp4 <reply> 
	◦  ${prefix}ocr 
	◦  ${prefix}tourl <caption / reply> 
	◦  ${prefix}tovn *reply audio* 
	◦  ${prefix}short ​<url> 
 
❏  *S T I C K E R*

	◦  ${prefix}emo *emoticon*
	◦  ${prefix}emojimix
	◦  ${prefix}flat *emoticon*
	◦  ${prefix}smeme *text | text*
	◦  ${prefix}sticker/s/sk	
	◦  ${prefix}swm *pack | author*

❏  *D O W N L O A D E R*
	◦  ${prefix}play <query> 
	◦  ${prefix}alquran 
	◦  ${prefix}wallpaper <query>
	◦  ${prefix}ig ​<url>	
	◦  ${prefix}igstory *username*
	◦  ${prefix}mediafire ​<url>
	◦  ${prefix}asupan *request* / *hastag*
	◦  ${prefix}bokep
	◦  ${prefix}ometv
	◦  ${prefix}viral 
	◦  ${prefix}fb ​<url>
	◦  ${prefix}pin ​<url>	
	◦  ${prefix}apk <query>
	◦  ${prefix}pinterest <query>	
	◦  ${prefix}sticker <query>
	◦  ${prefix}tiktok ​<url>
	◦  ${prefix}tikmp3 ​<url>
	◦  ${prefix}tikwm ​<url>
	◦  ${prefix}twitter ​<url>
	◦  ${prefix}video <query>
	◦  ${prefix}ythd ​<url>
	◦  ${prefix}ytmp3 ​<url>
	◦  ${prefix}ytmp4 ​<url>
	◦  ${prefix}twitter <url> 
	◦  ${prefix}tiktok <url> 
	◦  ${prefix}nhentaipdf <code> 
	◦  ${prefix}pinterest <query / url> 
	◦  ${prefix}soundcloud <query / url> 
  
❏  *K H U S U S - G R O U P*

	◦  ${prefix}link 
	◦  ${prefix}leave 
	◦  ${prefix}revoke
	◦  ${prefix}afk *alasan* 
	◦  ${prefix}pacaran
	◦  ${prefix}groupinfo
	◦  ${prefix}tagall [teks] 
	◦  ${prefix}hidetag [teks] 
	◦  ${prefix}group [option] 
	◦  ${prefix}mute
	◦  ${prefix}tagall
	◦  ${prefix}hidetag
	◦  ${prefix}kick
	◦  ${prefix}demote
	◦  ${prefix}mark
	◦  ${prefix}unmark
	◦  ${prefix}revoke
	◦  ${prefix}absen
	◦  ${prefix}link
	◦  ${prefix}sider
	◦  ${prefix}kicksider
	◦  ${prefix}anti212
	◦  ${prefix}antilink *on / off*
	◦  ${prefix}antivirtex *on / off*
	◦  ${prefix}filter *on / off*
	◦  ${prefix}game *on / off*
	◦  ${prefix}localonly *on / off*
	◦  ${prefix}left *on / off*
	◦  ${prefix}notify *on / off*
	◦  ${prefix}protect *on / off*
	◦  ${prefix}welcome *on / off*
	◦  ${prefix}group *close / open*
	◦  ${prefix}contact *@tag*
	◦  ${prefix}setdesc *text*
	◦  ${prefix}setname *text*
	◦  ${prefix}textwel *text*
	◦  ${prefix}textleft *text*
	◦  ${prefix}demote <@tag / reply> 
	◦  ${prefix}setppgrup 
  
❏  *M I S C*

	◦  ${prefix}cekprefix 
	◦  ${prefix}rvo *reply view once* 
	◦  ${prefix}ping 
	◦  ${prefix}runtime 
	◦  ${prefix}listgroup 
	◦  ${prefix}get <url> 
	◦  ${prefix}res <url> 
	◦  ${prefix}translate *id text* 
	◦  ${prefix}ssweb <url> 
	◦  ${prefix}sshp <url> 
	◦  ${prefix}delete <reply> 
  
❏  *O W N E R*

    ◦   $ 
    ◦   > / >> 
	◦  ${prefix}oautodownload *on / off*
	◦  ${prefix}oantilink *on / off*
	◦  ${prefix}oantivirtex *on / off*
	◦  ${prefix}ofilter *on / off*
	◦  ${prefix}ogame *on / off*
	◦  ${prefix}olocalonly *on / off*
	◦  ${prefix}oleft *on / off*
	◦  ${prefix}onotify *on / off*
	◦  ${prefix}oprotect *on / off*
	◦  ${prefix}omute *1 / 0*
	◦  ${prefix}ohidetag *text*
	◦  ${prefix}oleave
	◦  ${prefix}okick *reply / mention*
	◦  ${prefix}otagall *text*
	◦  ${prefix}owelcome
	◦  ${prefix}addown
	◦  ${prefix}delown
	◦  ${prefix}addmod
	◦  ${prefix}delmod
	◦  ${prefix}listcmd
	◦  ${prefix}setcmd 
	◦  ${prefix}delcmd
	◦  ${prefix}setprefix *prefix*
	◦  ${prefix}setmsg *text*
	◦  ${prefix}setcover *reply foto*
	◦  ${prefix}setheader *text*
	◦  ${prefix}setfooter *text*
	◦  ${prefix}setlink 
	◦  ${prefix}backup
	◦  ${prefix}ban
	◦  ${prefix}bcgc
	◦  ${prefix}block
	◦  ${prefix}db
	◦  ${prefix}unblock
	◦  ${prefix}unban
	◦  ${prefix}omark
	◦  ${prefix}ounmark
	◦  ${prefix}spamtag
	◦  ${prefix}addlist
	◦  ${prefix}getlist
	◦  ${prefix}dellist
	◦  ${prefix}self 
	◦  ${prefix}public 
	◦  ${prefix}restart 
	◦  ${prefix}join <url> 
	◦  ${prefix}setprefix [prefix] 
	◦  ${prefix}setppbot <caption / reply / url>
	◦  ${prefix}setmenu
	◦  ${prefix}storage
	◦  ${prefix}check
	◦  ${prefix}stat
	◦  ${prefix}groups
	◦  ${prefix}list
	◦  ${prefix}tools`}

const admin = (prefix) => {
   return `❏  *GROUP SETTING*

	◦  ${prefix}mute *1 / 0*
	◦  ${prefix}everyone
	◦  ${prefix}hidetag *text*
	◦  ${prefix}kick *reply / mention*
	◦  ${prefix}demote *reply / mention*
	◦  ${prefix}mark *reply / mention*
	◦  ${prefix}unmark *reply / mention*
	◦  ${prefix}revoke
	◦  ${prefix}autosticker *on / off*
	◦  ${prefix}antilink *on / off*
	◦  ${prefix}antivirtex *on / off*
	◦  ${prefix}filter *on / off*
	◦  ${prefix}game *on / off*
	◦  ${prefix}localonly *on / off*
	◦  ${prefix}left *on / off*
	◦  ${prefix}notify *on / off*
	◦  ${prefix}protect *on / off*
	◦  ${prefix}welcome *on / off*
	◦  ${prefix}group *close / open*
	◦  ${prefix}setdesc *text*
	◦  ${prefix}setname *text*
	◦  ${prefix}textwel *text*
	◦  ${prefix}textout *text*

${global.db.setting.footer}
`
}

const tools = (prefix) => {
   return `乂  *B Y P A S S*

	◦  ${prefix}oautosticker *on / off*
	◦  ${prefix}oantilink *on / off*
	◦  ${prefix}oantivirtex *on / off*
	◦  ${prefix}ofilter *on / off*
	◦  ${prefix}ogame *on / off*
	◦  ${prefix}olocalonly *on / off*
	◦  ${prefix}oleft *on / off*
	◦  ${prefix}onotify *on / off*
	◦  ${prefix}oprotect *on / off*
	◦  ${prefix}omute *1 / 0*
	◦  ${prefix}ohidetag *text*
	◦  ${prefix}oleave
	◦  ${prefix}okick *reply / mention*
	◦  ${prefix}otagall *text*
	◦  ${prefix}welcome *on / off*

乂  *M O D E R A T I O N*

	◦  ${prefix}addown *reply / mention*
	◦  ${prefix}delown *reply / mention*
	◦  ${prefix}addmod *reply / mention*
	◦  ${prefix}delmod *reply / mention*
	◦  ${prefix}listcmd
	◦  ${prefix}setcmd *reply sticker*
	◦  ${prefix}delcmd *reply sticker*  

乂  *H E L P E R S*

	◦  ${prefix}backup
	◦  ${prefix}ban *reply / mention*
	◦  ${prefix}bcgc *reply chat*
	◦  ${prefix}block  *reply / mention*
	◦  ${prefix}db
	◦  ${prefix}unblock  *reply / mention*
	◦  ${prefix}unban *reply / mention*
	◦  ${prefix}omark *reply / mention*
	◦  ${prefix}ounmark *reply / mention*
	◦  ${prefix}spamtag *amount | text*
	◦  ${prefix}tax *percent* (optional)
	◦  ${prefix}topup *amount* (optional)

乂  *A D V A N C E*

	◦  >  -- (JS Eval)
	◦  => -- (JS Eval w/ Return)
	◦  $ -- (Command Line)

${global.db.setting.footer}
`
}