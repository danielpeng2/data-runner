const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const activitiesRouter = require('./routes/activities')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.get('/', async (req, res) => {
  res.send('<div>a<div>')
})

app.use('/api/activities', activitiesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app