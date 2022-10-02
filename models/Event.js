const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
  },
  mood: {
    type: String, 
    possibleValues: ['happy','meh','sad'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Event', EventSchema)
