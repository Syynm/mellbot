exports.run = {
   usage: ['tqto', 'thanksto'],
   async: async (m, {
      client
   }) => {
      client.sendMessageModify(m.chat, info(), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/e80c7a0204757f5ac0021.jpg'),
            url: global.db.setting.link
            })         
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `*BIG THANKS TO*

➠ wildan Izzuddin  

➠ acuy

➠ mel       

➠ adara cantik

➠ aprildv 

➠ DiaryNikiiAll

➠ Revan

*ALL CREATOR BOT*`
}
