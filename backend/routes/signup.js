const express = require('express')
const router = express.Router()
const AuthToken = require('../models/AuthToken')
const SignupToken = require('../models/SignupToken')
const User = require('../models/User')

router
  .post('/', async function (req, res) {
    if (!req.body.signupToken) {
      return res.status(400).send('Signup token missing')
    }

    const signupTokenDB = await SignupToken.findOne({
      token: req.body.signupToken,
    })

    if (!signupTokenDB || !signupTokenDB.isValid()) {
      return res.status(400).send('Signup token invalid')
    }

    const emailConflict = await User.findOne({ email: req.body.email })

    if (emailConflict) {
      return res.status(400).send('User with email already exists')
    }

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    })
    signupTokenDB.invalidate()

    const authToken = await AuthToken.create({
      user: user._id,
    })

    res.send({ authToken: authToken.authToken, user })
  })
  .get('/gettoken', async function (req, res) {
    const signupToken = await SignupToken.create({})
    res.send(signupToken.token)
  })

module.exports = router
