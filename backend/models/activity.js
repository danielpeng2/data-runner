const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  date: Date,
  coords: [{
    _id: false,
    lat: String,
    lon: String,
  }],
  distance: Number,
  name: String,
  pace: Number,
  time: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

activitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Activity', activitySchema)
