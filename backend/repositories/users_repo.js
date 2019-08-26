const User = require('../models/user')

const deleteActivityReference = async(id) => {
  return await User.updateOne(
    { 'activities': id },
    { '$pull': { 'activities': id }}
  )
}

const getUserById = async(userId) => {
  return await User.findById(userId).populate('activities')
}

const getUserByUsername = async(name) => {
  return await User.findOne({ username: name })
}

const saveUser = async(userData) => {
  const user = new User(userData)
  return await user.save()
}

const updateUser = async(user) => {
  return await user.save()
}

module.exports = {
  deleteActivityReference,
  getUserById,
  getUserByUsername,
  saveUser,
  updateUser,
}
