// acquire the mongoose library
const mongoose = require('mongoose')

// create the animal schema to reference in other files with the required and specific types of data to define input for the animals
const animalSchema = new mongoose.Schema({
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
  token: String
})

module.exports = mongoose.model('Animal', animalSchema)
