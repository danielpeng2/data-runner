const usersRepo = require('../repositories/users_repo')
const tokenUtils = require('../utils/token_utils')

const getUser = async(req, res, next) => {
  try {
    const decodedToken = tokenUtils.getDecodedTokenFromRequest(req)
    var user = await usersRepo.getUserById(decodedToken.id)
    if (!user) throw { name: 'NotFoundError', message: 'user from token not found' }
  } catch(err) {
    return next(err)
  }
  res.json(user)
}

module.exports = {
  getUser,
}
