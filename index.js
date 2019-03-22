const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config();

const dbName = process.env.NODE_ENV === 'dev' ? process.env.MONGO_INITDB_DEV_DATABASE: process.env.MONGO_INITDB_DATABASE
const dbUrl  = process.env.NODE_ENV === 'dev' ? process.env.DB_DEV_URL: process.env.DB_URL
//const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${dbName}:27017?authMechanism=SCRAM-SHA-1&authSource=admin`

const options = {
  useNewUrlParser: true, 
  reconnectTries: 60, 
  reconnectInterval: 1000
}
const routes = require('./routes/routes.js')
const port = process.env.PORT || 80
const app = express()
const http = require('http').Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)
app.use((req, res) => {
  res.status(404)
})

MongoClient.connect(dbUrl, options, (err, database) => {
  if (err) {
    console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
    process.exit(1)
  }
  app.locals.db = database.db(dbName)
  http.listen(port, () => {
    console.log("Listening on port " + port)
    console.log("DB URL: " + dbUrl)

    app.emit('APP_STARTED')
  })
})

module.exports = app