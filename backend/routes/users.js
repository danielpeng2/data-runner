const usersRouter = require('express').Router()
const usersController = require('../controllers/users_controller')

usersRouter.get('/', usersController.getUser)

module.exports = usersRouter
