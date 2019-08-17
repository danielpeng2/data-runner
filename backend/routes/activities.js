const activitiesRouter = require('express').Router()
const activitiesController = require('../controllers/activities_controller')

activitiesRouter.get('/', activitiesController.getActivities)
activitiesRouter.post('/upload', activitiesController.uploadActivity)

module.exports = activitiesRouter