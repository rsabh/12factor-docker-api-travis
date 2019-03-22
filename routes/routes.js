
const express = require('express')
const Musician = require('../models/Musician')
const router = express.Router()
const ObjectID=require('mongodb').ObjectID

router.get('/musicians/all', (req, res, next) => {
  req.app.locals.db.collection('musicians').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No records in database'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/musicians/:id', (req, res, next) => {
  req.app.locals.db.collection('musicians').findOne({'_id': ObjectID(req.params.id)}, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined) {
      res.status(400).send({'error':'No record matching that id was found'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/musicians/new', (req, res, next) => {
  req.app.locals.db.collection('musicians').insertOne({
      name: req.body.name,
      band: req.body.band,
      instrument: req.body.instrument
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.delete('/musicians/delete/:id', (req, res, next) => {
  req.app.locals.db.collection('musicians').deleteOne({'_id': ObjectID(req.params.id)}, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.patch('/musicians/edit/:id', (req, res, next) => {
  req.app.locals.db.collection('musicians').updateOne({'_id': ObjectID(req.params.id)}, 
  {$set:
    {
      name: req.body.name,
      band: req.body.band,
      instrument: req.body.instrument
    }
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router