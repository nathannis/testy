const express = require('express')
const app = express()
const config = require('./config.json')
const port = config.port
const secrets =  require('./secrets.json')

app.get('/', (req, res) => res.send('Welcome to the garage door manager!'))

console.log(`Secret: ${secrets.secret}`)
app.listen(port, () => console.log(`Listening on port ${port}!`))
