// require express
const express = require('express')
// require crypto
const crypto = require('crypto')
// require error types
const errors = require('../../lib/custom_errors')
// require 404 from the errors
const handle404 = require('../../lib/custom_errors')

// create an express router
const router = express.Router()

// reference the parameters variable and files
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
// require the animal schema from models
const Animal = require('../models/animal')

// CREATE a new animal
router.post('/animals', (req, res, next) => {
  // set owner of new example to be current user
  req.body.animal.owner = req.user.id
  Animal.create(req.body.example)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(animal => {
      res.status(201).json({ example: animal.toObject() })
    })
    .catch(next)
})

// UPDATE an existing animal
router.patch('/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(handle404)
    .then(animal => {
      return animal.updateOne(req.body.animal)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY an existing animal (ah!)
router.delete('/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(handle404)
    .then(animal => {
      animal.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
