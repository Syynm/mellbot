// Symbols that are excluded when adding a prefix (Don't change it)
global.evaluate_chars = ['=>', '~>', '~', '>', '$']
global.owner = '6287823406145'
global.resetTime = 180000 // 5 Jam
global.limit = 1000 // limit default
global.max_upload = 200 // 200MB (1 = 1MB)
global.status = {
   wait: Func.texted('bold', 'Tunggu sebentar . . .'),
   invalid: Func.texted('bold', 'Link salah kak!'),
   wrong: Func.texted('bold', 'Wrong format!'),
   getdata: Func.texted('bold', 'Tunggu beberapa detik...'),
   fail: Func.texted('bold', 'Can\'t get metadata!'),
   error: Func.texted('bold', 'Terjadi kesalahan!'),
   autodl: Func.texted('bold', '➠ auto download file sedang dikirim...'),
   vip: Func.texted('bold', 'Fitur ini khusus untuk pengguna VIP'),
   vn: Func.texted('bold', '🤡 convert to voice...'),
   ds: Func.texted('bold', 'Kamu User VIP File Sedang Dikirim...*\n\n*Jika dalam 5 menit belum terkirim, server error!'),
   xxx: Func.texted('bold', '️search random indo...'),
   hentai: Func.texted('bold', 'sedang ️mencari...*\n\n*Jika dalam 5 menit belum terkirim, server error!'),
   errorF: Func.texted('bold', 'Fitur ini masih dalam perbaikan 🙏.'),
   premium: Func.texted('bold', 'Upgrade premium 🛍️*\n\n*Untuk menggunakan fitur ini'),
   owner: Func.texted('bold', 'Fitur ini khusus untuk owner.'),
   mod: Func.texted('bold', 'Fitur ini khusus untuk moderator dan owner.'),
   god: Func.texted('bold', 'Fitur ini khusus untuk master.'),
   group: Func.texted('bold', 'Fitur ini khusus untuk di dalam grup.'),
   botAdmin: Func.texted('bold', 'Jadikan bot sebagai admin terlebih dahulu.'),
   admin: Func.texted('bold', 'Lu admin bang?'),
   private: Func.texted('bold', 'Fitur ini khusus untuk di chat pribadi bot.')
}
global.users = global.db.users
global.groups = global.db.groups
global.chats = global.db.chats
global.sticker = global.db.sticker
global.statistic = global.db.statistic
global.setting = global.db.setting
