const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')

const SALT_ROUNDS = 10

const createUserAndLogin = async(req, res, next) => {
  const body = req.body
  if (!body.username || !body.password) {
    return next({ name: 'InvalidCredentialsError' })
  }
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS)
  const userData = {
    username: body.username,
    passwordHash,
  }
  try {
    var user = await usersRepo.saveUser(userData)
  } catch(err) {
    return next(err)
  }
  const token = _getUserToken(user)
  res
    .status(200)
    .send({
      token,
      username: user.username,
    })
}

const login = async(req, res, next) => {
  const body = req.body
  try {
    var user = await usersRepo.getUserByUsername(body.username)
  } catch(err) {
    return next(err)
  }
  const passwordCorrect = !user ? false : await bcrypt.compare(body.password, user.passwordHash)
  if (!user || !passwordCorrect) {
    return next({ name: 'InvalidCredentialsError' }) 
  }
  const token = _getUserToken(user)
  res
    .status(200)
    .send({
      token,
      username: user.username,
    })
}

const _getUserToken = (user) => {
  const userForToken = {
    id: user._id,
    username: user.username,
  }
  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  createUserAndLogin,
  login,
}
