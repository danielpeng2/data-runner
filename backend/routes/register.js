const registerRouter = require('express').Router()
const loginController = require('../controllers/login_controller')

registerRouter.post('/', loginController.createUserAndLogin)

module.exports = registerRouter
