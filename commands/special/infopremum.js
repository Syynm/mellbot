exports.run = {
   usage: ['infopremium', 'paket1', 'paket2', 'paket3'],
   async: async (m, {
      client,
      isPrefix,
      command
   }) => {
      if (command == 'infopremium') {
         let rows = [{
            title: 'Minimize',
            rowId: `${isPrefix}paket1`,
            description: `Harga : Rp. 5,000 | Limit : ( ∞ ) Unlimited | 7 hari`
         }, {
            title: 'Marvest',
            rowId: `${isPrefix}paket2`,
            description: `Harga : Rp. 10,000 | Limit : ( ∞ ) Unlimited | 30 hari`
         }, {
            title: 'Pandanium',
            rowId: `${isPrefix}paket3`,
            description: `Harga : Rp. 50,000 | Limit : ( ∞ ) Unlimited | 150 hari`
         }]
         await client.sendList(m.chat, '', info(), '© melbot', 'Tap!', rows, m)
         } else if (command == 'paket1') {
         let teks = `*H A R G A - P R E M I U M*\n\n`
         teks += `	◦ *Paket* : Minimize\n`
         teks += `	◦ *Harga* : Rp. 5,000\n`
         teks += `	◦ *Limit* : Unlimited\n`
         teks += `	◦ *Expired* : 7 hari\n\n`
         teks += global.db.setting.footer
         client.reply(m.chat, teks, m)
         } else if (command == 'paket2') {
         let teks = `*H A R G A - P R E M I U M*\n\n`
         teks += `	◦ *Paket* : Marvest\n`
         teks += `	◦ *Harga* : Rp. 10,000\n`
         teks += `	◦ *Limit* : Unlimited\n`
         teks += `	◦ *Expired* : 30 hari\n\n`
         teks += global.db.setting.footer
         client.reply(m.chat, teks, m)
         } else if (command == 'paket3') {
         let teks = `*H A R G A - P R E M I U M*\n\n`
         teks += `	◦ *Paket* : Pandanium\n`
         teks += `	◦ *Harga* : Rp. 50,000\n`
         teks += `	◦ *Limit* : Unlimited\n`
         teks += `	◦ *Expired* : 150 hari\n\n`
         teks += global.db.setting.footer
         client.reply(m.chat, teks, m)  
      }
   },
   error: false
}

let info = () => {
   return `*❏ INFO PREMIUM*
  
Dengan mendaftar menjadi user premium anda akan mendapatkan keuntungan sebagai berikut :

1. Bisa menggunakan semua fitur
2. mendapatkan unlimited limit
3. bisa memainkan di pesan pribadi

Silahkan hubungi owner ( *.owner* ) untuk melakukan upgrade premium hanya dengan Rp. 10.000 per bulan

Invite bot ke GC kalian ? ketik *.sewabot*`
}
