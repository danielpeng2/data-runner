const formidable = require('formidable')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const activitiesRepo = require('../repositories/activities_repo')
const usersRepo = require('../repositories/users_repo')
const gpxParser = require('../utils/gpx_parser')

const _getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const getActivities = async(req, res, next) => {
  try {
    activities = await activitiesRepo.getActivities()
    res.json(activities)
  } catch(err) {
    next(err)
  }
}

const uploadActivity = async(req, res, next) => {
  var form = new formidable.IncomingForm()
  const files = []

  const token = _getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid' })
  }

  form
    .on('error', (err) => {
      return next(err)
    })
    .on('file', (field, file) => {
      files.push(file)
    })
    .on('end', async() => {
      savedActivities = []
      try {
        const user = await usersRepo.getUserById(decodedToken.id)
        for (const file of files) {
          const data = fs.readFileSync(file.path)
          const activityData = await gpxParser.parse(data.toString())
          const savedActivity = await activitiesRepo.saveActivity(activityData)

          user.activities = user.activities.concat(savedActivity._id)
          await usersRepo.updateUser(user)
          savedActivities.push(savedActivity)
        }
        res.json(savedActivities)
      } catch(err) {
        next(err)
      }
    })
  form.parse(req)
}

module.exports = {
  getActivities,
  uploadActivity
}
