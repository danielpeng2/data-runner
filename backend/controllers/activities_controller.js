const formidable = require('formidable')
const fs = require('fs')

const activitiesRepo = require('../repositories/activities_repo')
const usersRepo = require('../repositories/users_repo')
const gpxParser = require('../utils/gpx_parser')

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
  const fields = {}
  const files = []

  form
    .on('error', (err) => {
      return next(err)
    })
    .on('field', (field, value) => {
      fields[field] = value
    })
    .on('file', (field, file) => {
      files.push(file)
    })
    .on('end', async() => {
      if (!fields.userId) return next(Error('No userId given with activity'))
      savedActivities = []
      try {
        const user = await usersRepo.getUserById(fields.userId)
        for (const file of files) {
          const data = fs.readFileSync(file.path)
          const activityData = await gpxParser.parse(data.toString())
          activityData.user = user._id
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
