const loginRouter = require('express').Router()
const loginController = require('../controllers/login_controller')

loginRouter.post('/', loginController.login)

module.exports = loginRouter
