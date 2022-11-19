exports.run = {
   usage: ['apk', 'getapk'],
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'apk') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'fb lite'), m)
            client.reply(m.chat, global.status.getdata, m)
            let json = await Api.apk(text)
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let rows = []
            json.data.map(async (v, i) => {
               rows.push({
                  title: v.name,
                  rowId: `${isPrefix}getapk ${text}—${v.no}`,
                  description: `${v.size} • ${v.version}`
               })
            })
            client.sendList(m.chat, '', `Menampilkan hasil pencarian untuk : “${text}”, silahkan pilih dibawah aplikasi yang ingin kamu unduh. 🍟`, '', 'Tap!', [{
               rows
            }], m)
         } else if (command == 'getapk') {
            if (!text) return client.reply(m.chat, global.status.invalid, m)
            let [query, no] = text.split`—`
            client.reply(m.chat, global.status.getdata, m)
            let json = await Api.apk(query, no)  
            let teks = `⬣━━━━⬡  *P L A Y S T O R E*\n\n`
            teks += '	⬡  *Nama* : ' + json.data.name + '\n'
            teks += '	⬡  *Versi* : ' + json.data.version + '\n'
            teks += '	⬡  *Ukuran* : ' + json.file.size + '\n'
            teks += '	⬡  *Kategori* : ' + json.data.category + '\n'
            teks += '	⬡  *Dev* : ' + json.data.developer + '\n'
            teks += '	⬡  *Requirement* : ' + json.data.requirement + '\n'
            teks += '	⬡  *Upload* : ' + json.data.publish + '\n'
            teks += '	⬡  *Link* : ' + json.data.playstore + '\n\n'
            teks += `⬣━━━⬡\n\n`
            teks += global.footer
            let chSize = Func.sizeLimit(json.file.size, global.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `Ukuran file (${json.file.size}) melebihi batas maksimum, silahkan download sendiri melalui link berikut : ${await (await Func.shorten(json.file.url)).data.url}`, m)
            client.sendFile(m.chat, json.data.thumbnail, '', teks, m).then(() => {
               client.sendFile(m.chat, json.file.url, json.file.filename, '', m)
            })
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}