// require express
// require error types and their references
// require 404 from the errors
const express = require('express')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

// create an express router
// require passport
// require the animal schema from models
const router = express.Router()
const passport = require('passport')
const Animal = require('../models/animal')

// define the requireToken variable via passport
// define the requireOwnership variable via the custom_errors folder
const requireToken = passport.authenticate('bearer', { session: false })
const requireOwnership = customErrors.requireOwnership

// CREATE a new animal
router.post('/animals', requireToken, (req, res, errors) => {
  req.body.animal.owner = req.user.id
  Animal.create(req.body.animal)
    .then(animal => {
      res.status(201).json({ animal: animal.toObject() })
    })
    .catch(errors)
})

// UPDATE an existing animal
router.patch('/animals/:id', requireToken, (req, res, errors) => {
  delete req.body.animal.owner
  Animal.findById(req.params.id)
    .then(handle404)
    .then(animal => {
      requireOwnership(req, animal)
      return animal.updateOne(req.body.animal)
    })
    .then(() => res.sendStatus(204))
    .catch(errors)
})

// DESTROY an existing animal (ah!)
router.delete('/animals/:id', requireToken, (req, res, errors) => {
  Animal.findById(req.params.id)
    .then(handle404)
    .then(animal => {
      requireOwnership(req, animal)
      animal.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(errors)
})

// INDEX existing animals
router.get('/animals', requireToken, (req, res, errors) => {
  Animal.find()
    .then(animal => {
      return animal.map(animal => animal.toObject())
    })
    .then(animal => res.status(200).json({ animal: animal }))
    .catch(errors)
})

// SHOW existing animals
router.get('/animals/:id', requireToken, (req, res, errors) => {
  req.body.animal.owner = req.user.id
  Animal.findById(req.params.id)
    .then(handle404)
    .then(animal => res.status(200).json({ animal: animal.toObject() }))
    .catch(errors)
})

module.exports = router
