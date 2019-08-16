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
})

module.exports = mongoose.model('Activity', activitySchema)
