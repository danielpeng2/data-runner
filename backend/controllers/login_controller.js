const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')

const login = async(req, res) => {
  const body = req.body

  const user = await usersRepo.getUserByUsername(body.username)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  
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
