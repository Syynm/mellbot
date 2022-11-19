exports.run = {
   usage: ['dnsiii', 'donasi'],
   async: async (m, {
      client
   }) => {
      client.sendMessageModify2(m.chat, info(), m, {
            title: 'D O N A S I',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/56c627227d18b193e986b.jpg')
            })         
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `*❏ D O N A S I*
┏━━⬣ 
┃Mari berdonasi bersama kami
┃untuk meringankan user beban
┃
┃Bagi Anda yang memiliki saldo lebih
┃bisa di donasikan melalui berikut ini.
┃
┃P U L S A : [ 0851-5697-2228 ]
┗⬣

note : *donasi seikhlasnya aja*`
}
