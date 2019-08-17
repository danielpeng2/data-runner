const Activity = require('../models/activity')

const getActivities = async() => {
  return await Activity.find({})
}

const saveActivity = async(activityData) => {
  const activity = new Activity(activityData)
  await activity.save()
}

module.exports = {
  getActivities,
  saveActivity,
}
