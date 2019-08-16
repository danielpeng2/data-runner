const activitiesRouter = require('express').Router()
const Activity = require('../models/activity')

activitiesRouter.get('/', async (req, res) => {
  const activities = await Activity.find({})
  res.json(activities)
})

module.exports = activitiesRouter
