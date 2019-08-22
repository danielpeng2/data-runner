const formidable = require('formidable')
const fs = require('fs')

const activitiesRepo = require('../repositories/activities_repo')
const usersRepo = require('../repositories/users_repo')
const gpxParser = require('../utils/gpx_parser')
const tokenUtils = require('../utils/token_utils')

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
  try {
    var decodedToken = tokenUtils.getDecodedTokenFromRequest(req)
  } catch(err) {
    return next(err)
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
