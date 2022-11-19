exports.run = {
   usage: ['top'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      let rows = [{
         title: 'TOP GLOBAL',
         rowId: `${isPrefix}topglobal`,
         description: ``
      }, {
         title: 'TOP LIMIT',
         rowId: `${isPrefix}toplimit`,
         description: ``
      }, {
         title: 'TOP LOCAL',
         rowId: `${isPrefix}toplocal`,
         description: ``
      }, {
         title: 'TOP USER',
         rowId: `${isPrefix}topuser`,
         description: ``
      }, {
         title: 'TOP USER LOCAL',
         rowId: `${isPrefix}topuserlocal`,
         description: ``
      }]
      await client.sendList(m.chat, '', `Pilih data rank yang ingin ditampilkan.`, 'melbot.my.id', 'Lihat!', [{
         rows
      }], m)
   },
   error: false
}