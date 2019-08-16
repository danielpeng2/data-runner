const formidable = require('formidable')
const fs = require('fs')

const activitiesRouter = require('express').Router()
const Activity = require('../models/activity')
const gpxParser = require('../utils/gpx_parser')

activitiesRouter.get('/', async (req, res) => {
  const activities = await Activity.find({})
  res.json(activities)
})

activitiesRouter.post('/upload', async (req, res) => {
  var form = new formidable.IncomingForm()

  form.on('file', (field, file) => {
    fs.readFile(file.path, async (err, data) => {
      if (err) next(err)
      try {
        const activityData = await gpxParser.parse(data.toString())
        const activity = new Activity(activityData)
        await activity.save()
      } catch (err) {
        next(err)
      }
    })
  })

  form.on('end', () => {
    res.json()
  })

  form.on('error', (err) => {
    console.error('Error uploading file', err)
    next(err)
  })

  form.parse(req)
})

module.exports = activitiesRouter
