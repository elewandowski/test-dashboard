const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const kittySchema = new mongoose.Schema({
  name: Object,
})

const Kitten = mongoose.model('Kitten', kittySchema)

/* GET users listing. */
router
  .get('/', async (req, res, next) => {
    const kittens = await Kitten.find()
    console.log(kittens)

    res.render('test-runs', { output: JSON.stringify(kittens, undefined, 2) })
  })
  .post('/', async (req, res, next) => {
    const kitty = new Kitten({ name: req.body })

    kitty.save()

    res.send(req.body)
  })

module.exports = router
