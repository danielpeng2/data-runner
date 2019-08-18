const usersRouter = require('express').Router()
const usersController = require('../controllers/users_controller')

usersRouter.post('/', usersController.createUser)

module.exports = usersRouter
