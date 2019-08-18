const User = require('../models/user')

const getUserById = async(userId) => {
  return await User.findById(userId)
}

const saveUser = async(userData) => {
  const user = new User(userData)
  return await user.save()
}

const updateUser = async(user) => {
  return await user.save()
}

module.exports = {
  getUserById,
  saveUser,
  updateUser,
}
