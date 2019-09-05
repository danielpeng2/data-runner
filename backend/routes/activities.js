const activitiesRouter = require('express').Router()
const activitiesController = require('../controllers/activities_controller')

activitiesRouter.post('/upload', activitiesController.uploadActivity)
activitiesRouter.delete('/:id', activitiesController.deleteActivity)

module.exports = activitiesRouter
