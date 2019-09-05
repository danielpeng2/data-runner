const Activity = require('../models/activity')

const deleteActivity = async(id) => {
  await Activity.findByIdAndRemove(id)
}

const findActivity = async(id) => {
  return await Activity.findById(id)
}

const saveActivity = async(activityData) => {
  const activity = new Activity(activityData)
  return await activity.save()
}

module.exports = {
  deleteActivity,
  findActivity,
  saveActivity,
}
