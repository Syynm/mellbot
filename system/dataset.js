const mongoose = require('mongoose')
const { Pool } = require('pg')

if (/mongo/.test(process.env.DATABASE_URL)) {
   module.exports = class MongoDB {
      options = {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }
      connection = process.env.DATABASE_URL
      model = {
         database: {}
      }
      data = {}
      
      fetch = async () => {
         mongoose.connect(this.connection, {
            ...this.options
         })
         try {
            const schemaData = new mongoose.Schema({
               data: {
                  type: Object,
                  required: true,
                  default: {}
               }
            })
            this.model.database = mongoose.model('data', schemaData)
         } catch {
            this.model.database = mongoose.model('data')
         }
         this.data = await this.model.database.findOne({})
         if (!this.data) {
            (new this.model.database({
               data: {}
            })).save()
            this.data = await this.model.database.findOne({})
            return this.data.data
         } else return this.data.data
      }

      save = async (data) => {
         const obj = data ? data : global.db
         if (this.data && !this.data.data) return (new this.model.database({
            data: obj
         })).save()
         this.model.database.findById(this.data._id, (error, document) => {
            if (error) return
            if (!document.data) document.data = {}
            document.data = global.db
            document.save()
         })
      }
   }
} else if (/postgres/.test(process.env.DATABASE_URL)) {
   module.exports = class Postgres {
      sql = new Pool({
         connectionString: process.env.DATABASE_URL,
         ssl: {
            rejectUnauthorized: false
         }
      })
      auth = {}
      data = {}

      async execute(query) {
         if (query) {
            return await (await this.sql.query(query))
         } else {
            await this.sql.query('CREATE TABLE IF NOT EXISTS database(id integer, data json)')
            await this.sql.query('CREATE TABLE IF NOT EXISTS authentication(id integer, auth json)')
            return 1
         }
      }

      fetchAuth = async (id = 1) => {
         try {
            this.auth = await (await this.sql.query('SELECT * FROM authentication WHERE id = $1', [id])).rows[0]
            return this.auth.auth
         } catch {
            await this.execute()
         }
      }

      updateAuth = async (data, id = 1) => {
         try {
            const creds = await this.fetchAuth()
            if (creds) {
               await this.sql.query('UPDATE authentication SET auth = $1 WHERE id = $2', [data, id])
               await this.sql.query('commit')
            } else {
               await this.sql.query('INSERT INTO authentication VALUES($1, $2)', [id, data])
               await this.sql.query('commit')
            }
         } catch {
            await this.execute()
         }
      }

      drop = async () => {
         try {
            await this.sql.query('DROP TABLE authentication')
         } catch {
            await this.execute()
         }
      }

      fetch = async (id = 1) => {
         try {
            this.data = await (await this.sql.query('SELECT data FROM database WHERE id = $1', [id])).rows[0]
            return this.data.data
         } catch {
            await this.execute()
         }
      }

      async insert(object = {}, id = 1) {
         try {
            await this.sql.query('INSERT INTO database VALUES($1,$2)', [id, object])
            await this.sql.query('commit')
         } catch {
            await this.execute()
         }
      }

      async update(object = {}, id = 1) {
         try {
            await this.sql.query('UPDATE database SET data = $1 WHERE id = $2', [object, id])
            await this.sql.query('commit')
         } catch {
            await this.execute()
         }
      }

      save = async (object, id = 1) => {
         try {
            const check = await this.sql.query('SELECT data FROM database WHERE id = $1', [id])
            if (check.rowCount == 0) {
               await this.insert(object ? object : global.db, id)
            } else {
               await this.update(object ? object : global.db, id)
            }
         } catch {
            await this.execute()
         }
      }
   }
}