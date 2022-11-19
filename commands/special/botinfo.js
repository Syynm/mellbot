const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['sewabot', 'sewa', 'hargabot', 'swbtt'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      let groups = await client.groupList()
      let rows = []
      for (let i = 0; i < groups.length; i++) {
         if (groups[i].id in global.db.groups) {
            let v = global.db.groups[groups[i].id]
            rows.push({
               title: groups[i].subject,
               rowId: `${isPrefix}stel ${groups[i].id}`,
               description: `sewa bot : ${moment(v.activity).format('DD/MM/YY HH:mm:ss')}`
            })
         } else global.db.groups[groups[i].id] = {
            activity: new Date * 1,
            banned: false,
            mute: false,
            game: false,
            welcome: false,
            textwel: 'selamat datang +tag di +grup',
            left: false,
            textleft: '',
            notify: false,
            spamProtect: false,
            localonly: false,
            nodelete: true,
            nobadword: false,
            nolink: true,
            novirtex: false,
            expired: 0,
            stay: false,
            member: {}
         }
      }
      client.sendList(m.chat, '', info(), `Total Sewa BOT : ${groups.length}`, 'Lihat!', rows, m)
   },
   owner: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `*❏ SEWA BOT*

Untuk fitur bot bisa baca menu sampai selesai ya kak, dicoba coba dulu biar tau ( Ketik *.menu* )
Silahkan hubungi owner ( Ketik *.owner* ) jika ingin menyewa bot untuk grup chat kalian

➠ Sewa (Join Grup) harga 10K / bulan dan akan keluar otomatis saat masa aktif sudah habis, apabila bot di kick dari grup sengaja atau tidak sengaja tidak bisa di join kan lagi (Hangus).

➠ Pembayaran saat ini hanya tersedia via Dana dan Rekening Bank.

➠ Proses transaksi seperti pada umumnya, chat owner terlebih dahulu untuk menanyakan nomor tujuan transfer setelah itu screenshot bukti pembayaran.

➠ *Penting!* simpan nomor owner dan join ke dalam grup official dibawah untuk mengetahui update nomor bot terbaru apabila ter-banned.

Untuk upgrade premium hanya Rp. 10.000 per bulan ( *.infopremium* )`
}