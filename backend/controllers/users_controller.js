const jwt = require('jsonwebtoken')
const usersRepo = require('../repositories/users_repo')
const tokenUtils = require('../utils/token_utils')

const getUser = async(req, res, next) => {
  try {
    var decodedToken = tokenUtils.getDecodedTokenFromRequest(req)
  } catch(err) {
    return next(err)
  }
  const user = await usersRepo.getUserById(decodedToken.id)
  res.json(user)
}

module.exports = {
  getUser,
}
