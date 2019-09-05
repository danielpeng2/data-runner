const formidable = require('formidable')
const fs = require('fs')

const activitiesRepo = require('../repositories/activities_repo')
const usersRepo = require('../repositories/users_repo')
const gpxParser = require('../utils/gpx_parser')
const tokenUtils = require('../utils/token_utils')

const deleteActivity = async(req, res, next) => {
  try {
    const decodedToken = tokenUtils.getDecodedTokenFromRequest(req)
    const activity = await activitiesRepo.findActivity(req.params.id)
    if (!activity) {
      throw { name: 'NotFoundError', message: 'activity not found' }
    }
    if (decodedToken.id !== activity.user.toString()) {
      throw { name: 'UnauthorizedTokenError' }
    }
    await activitiesRepo.deleteActivity(req.params.id)
    await usersRepo.deleteActivityReference(req.params.id)
    res.status(204).end()
  } catch(err) {
    next(err)
  }
}

const getActivities = async(req, res, next) => {
  try {
    const activities = await activitiesRepo.getActivities()
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
      const savedActivities = []
      try {
        const user = await usersRepo.getUserById(decodedToken.id)
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
        return next(err)
      }
    })
  form.parse(req)
}

module.exports = {
  deleteActivity,
  getActivities,
  uploadActivity,
}
