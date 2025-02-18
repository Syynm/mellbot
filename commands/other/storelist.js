const { writeFileSync: write, readFileSync: read } = require('fs')
const mime = require('mime-types')
const phone = require('awesome-phonenumber')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['addlist', 'getlist', 'dellist', 'shop'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      isOwner
   }) => {
      try {
         const database = await Func.fetchJson(client.server + '/lists.json')
         if (command == 'addlist') {
            if (!isOwner) return client.reply(m.chat, global.status.owner, m)
            let q = m.quoted ? m.quoted : m
            let [n, c] = text.split`|`
            let name = n.trim()
            let content = (c || m.quoted.text).trim() || ''
            if (!name) return client.reply(m.chat, Func.texted('bold', `Berikan nama list yang akan di simpan.`), m)
            if (name.length > 30) return client.reply(m.chat, Func.texted('bold', `Nama list terlalu panjang, maksimal 30 karakter.`), m)
            if (/conversation|extended/.test(q.mtype)) {
               if (!content) return client.reply(m.chat, Func.texted('bold', `Berikan teks yang akan di simpan.`), m)
               database.push({
                  name,
                  content,
                  mime: 'text/plain',
                  author: m.sender,
                  uploaded_at: new Date * 1
               })
               client.storelist = database
               const data = write('./lists.json', JSON.stringify(database, null, 3))
               let save = await Func.uploadToServer(read('./lists.json'), 'lists.json')
               if (!save.status) return client.reply(m.chat, Func.texted('bold', `Database gagal di perbarui.`), m)
               return client.reply(m.chat, `List berhasil tersimpan dengan nama : *${name}*, untuk menampilkan konten gunakan *${isPrefix}getlist*`, m)
            } else if (/video|image/.test(q.mtype) && !/webp/.test(q.mtype)) {
               let file = await q.download()
               let filesize = typeof q.fileLength == 'undefined' ? q.msg.fileLength.low : q.fileLength.low
               let chSize = Func.sizeLimit(await Func.getSize(filesize), isOwner ? 5 : 1)
               if (chSize.oversize) return client.reply(m.chat, Func.texted('bold', `Ukuran file tidak boleh lebih dari ${isOwner ? 5 : 1} MB.`), m)
               let check = database.some(v => v.name == name)
               if (check) return client.reply(m.chat, Func.texted('bold', `List sudah ada di dalam daftar.`), m)
               client.reply(m.chat, global.status.wait, m)
               const extension = /video/.test(q.mimetype) ? 'mp4' : mime.extension(q.mimetype)
               const filename = Func.uuid() + '.' + extension
               let json = await Func.uploadToServer(file, filename)
               if (!json.status) return client.reply(m.chat, Func.texted('bold', `Gagal!, tidak bisa menyimpan ke dalam server.`), m)
               database.push({
                  name,
                  content,
                  filename,
                  mime: q.mimetype,
                  author: m.sender,
                  uploaded_at: new Date * 1
               })
               client.storelist = database
               const data = write('./lists.json', JSON.stringify(database, null, 3))
               let save = await Func.uploadToServer(read('./lists.json'), 'lists.json')
               if (!save.status) return client.reply(m.chat, Func.texted('bold', `Database gagal di perbarui.`), m)
               return client.reply(m.chat, `List berhasil tersimpan dengan nama : *${name} (${await Func.getSize(filesize)})*, untuk menampilkan konten gunakan *${isPrefix}getlist*`, m)
            } else return client.reply(m.chat, Func.texted('bold', `Hanya untuk menyimpan teks, foto, dan video.`), m)
         } else if (command == 'getlist') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'meow'), m)
            const lists = database.find(v => v.name == text)
            if (!lists) return client.reply(m.chat, Func.texted('bold', `List dengan nama "${text}" tidak ada didalam database.`), m)
            if (/text/.test(lists.mime)) {
               client.reply(m.chat, lists.content, m)
            } else client.sendFile(m.chat, await Func.fetchBuffer(`${client.server}/files/${lists.filename}`), lists.filename, lists.content, m)
         } else if (command == 'dellist') {
            if (!isOwner) return client.reply(m.chat, global.status.owner, m)
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'meow'), m)
            const lists = database.find(v => v.name == text)
            if (!lists) return client.reply(m.chat, Func.texted('bold', `File dengan nama "${text}" tidak ada didalam database.`), m)
            Func.removeItem(database, lists)
            client.storelist = database
            const data = write('./lists.json', JSON.stringify(database, null, 3))
            let save = await Func.uploadToServer(read('./lists.json'), 'lists.json')
            if (!save.status) return client.reply(m.chat, Func.texted('bold', `Database gagal di perbarui.`), m)
            if (!/text/.test(lists.mime)) {
               Func.fetchJson(`${client.server}/upload.php?del=files/${lists.filename}`)
            }
            return client.reply(m.chat, Func.texted('bold', `List dengan nama "${text}" berhasil dihapus.`), m)
         } else if (command == 'shop') {
            if (database.length == 0) return client.reply(m.chat, Func.texted('bold', `Tidak ada konten yang tersimpan.`), m)
            let rows = []
            database.sort((a, b) => a.name.localeCompare(b.name)).map(v => rows.push({
               title: v.name,
               rowId: `${isPrefix}getlist ${v.name}`,
               description: `© MELL STORE | AMANAH`
            }))
            let teks = `❝ Mudah & cepat Kamu hanya perlu hitungan detik untuk menyelesaikan pembelian di mell store❞\n\n`
            teks += `Harap Hubungi ( .owner ) sebelum transaksi\n`
            teks += `Pembayaran via dana dan rekening bank\n`
            teks += `Ultra Fast Order\n`
            teks += `Aman Dan Terpercaya 🍟\n\n`
            teks += `💻 Server : ${client.server}`
            client.sendList(m.chat, '', teks, '', 'Tap!', rows, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
