const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')
const tokenUtils = require('../utils/token_utils')

const getUser = async(req, res, next) => {
  try {
    var decodedToken = tokenUtils.getDecodedTokenFromRequest(req)
    const user = await usersRepo.getUserById(decodedToken.id)
    res.json(user)
  } catch(err) {
    next(err)
  }
}

module.exports = {
  getUser,
}
