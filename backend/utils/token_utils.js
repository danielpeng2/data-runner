const jwt = require('jsonwebtoken')

const getDecodedTokenFromRequest = (req) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    throw { name: 'RequestTokenError', message: 'token missing' }
  }
  const token = authorization.substring(7)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    throw { name: 'RequestTokenError', message: 'token invalid' }
  }
  return decodedToken
}

module.exports = {
  getDecodedTokenFromRequest,
}
