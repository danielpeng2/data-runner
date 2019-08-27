const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (err.name === 'RequestTokenError') {
    return res.status(401).json({
      error: err.message
    })
  } else if (err.name === 'UnauthorizedTokenError') {
    return res.status(401).json({
      error: 'unauthorized token to perform this operation'
    })
  } else if (err.name === 'NotFoundError') {
    return res.status(404).json({
      error: err.message
    })
  } else if (err.name === 'InvalidCredentialsError') {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  console.error(err.message)
  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint,
}
