const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')

const SALT_ROUNDS = 10

const createUserAndLogin = async(req, res, next) => {
  const body = req.body
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS)
  const userData = {
    username: body.username,
    name: body.name,
    passwordHash,
  }
  let user
  try {
    user = await usersRepo.saveUser(userData)
  } catch(err) {
    return next(error)
  }
  const token = _getUserToken(user)
  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
    })
}

const login = async(req, res, next) => {
  const body = req.body
  let user
  try {
    user = await usersRepo.getUserByUsername(body.username)
  } catch(err) {
    return next(err)
  }
  const passwordCorrect = !user ? false : await bcrypt.compare(body.password, user.passwordHash)
  if (!user || !passwordCorrect) {
    return res
      .status(401)
      .json({ error: 'invalid username or password' })
  }

  const token = _getUserToken(user)
  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
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
