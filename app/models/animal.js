// acquire the mongoose library
const mongoose = require('mongoose')

// create the animal schema to reference in other files with the required and specific types of data to define input for the animals
const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    unique: true
  },
  breed: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
    unique: true
  },
  health: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Animal', animalSchema)
