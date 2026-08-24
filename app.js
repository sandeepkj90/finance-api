const express = require('express')
const routes = require('./src/routes')
const errorHandler = require('./src/middlewares/error.middleware')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: '*',   // frontend origin
  credentials: true,                 // allow cookies / auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

module.exports = app
