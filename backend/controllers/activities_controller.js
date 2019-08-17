const formidable = require('formidable')
const fs = require('fs')

const activitiesRepo = require('../repositories/activities_repo')
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

  form.on('file', async(field, file) => {
    try {
      const data = fs.readFileSync(file.path)
      const activityData = await gpxParser.parse(data.toString())
      await activitiesRepo.saveActivity(activityData)
    } catch(err) {
      next(err)
    }
  })

  form.on('end', () => {
    res.json()
  })

  form.on('error', (err) => {
    console.error('Error uploading file', err)
    next(err)
  })

  form.parse(req)
}

module.exports = {
  getActivities,
  uploadActivity
}
