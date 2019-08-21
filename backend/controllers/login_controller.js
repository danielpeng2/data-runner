const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')

const login = async(req, res, next) => {
  const body = req.body
  let passwordCorrect
  let user
  try {
    user = await usersRepo.getUserByUsername(body.username)
  } catch(err) {
    return next(err)
  }

  passwordCorrect = !user ? false : await bcrypt.compare(body.password, user.passwordHash)
  
  if (!user || !passwordCorrect) {
    return res
      .status(401)
      .json({ error: 'invalid username or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
    })
}

module.exports = {
  login,
}
