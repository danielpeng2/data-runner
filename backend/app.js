const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')

const activitiesRouter = require('./routes/activities')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const usersRouter = require('./routes/users')
const middleware = require('./utils/middleware')

mongoose.set('useCreateIndex', true);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.send('<div>a<div>')
})

app.use('/api/activities', activitiesRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)
app.use('/api/user', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app