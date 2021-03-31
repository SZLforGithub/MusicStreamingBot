const auth = require('./src/config.json');

const { Client } = require('pg')
const client = new Client(
  {
    user: auth.dbUser,
    host: 'database',
    database: auth.db,
    password: auth.dbPassword,
    port: auth.dbPort,
  }
)

client.connect()

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})