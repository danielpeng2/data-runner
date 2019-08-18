const bcrypt = require('bcrypt')
const usersRepo = require('../repositories/users_repo')

const SALT_ROUNDS = 10

const createUser = async(req, res, next) => {
  const body = req.body
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS)

  try {
    const user = {
      username: body.username,
      name: body.name,
      passwordHash,
    }
    const savedUser = await usersRepo.saveUser(user)
    res.json(savedUser)
  } catch(err) {
    next(err)
  }
}

module.exports = {
  createUser,
}
