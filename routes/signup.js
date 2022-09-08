const express = require('express')
const router = express.Router()
const SignupToken = require('../models/SignupToken')
const User = require('../models/User')

router
  .post('/', async function (req, res) {
    const signupTokenDB = SignupToken.findOne({
      token: req.body.signupToken,
    })
    if (signupTokenDB && signupTokenDB.isValid()) {
      const user = User.create({
        email: req.body.email,
        password: req.body.password,
      })
      signupTokenDB.invalidate()
      res.send(user)
    } else {
      res.sendStatus(401)
    }
  })
  .get('/gettoken', async function (req, res) {
    const signupToken = await SignupToken.create({})
    res.send(signupToken.token)
  })

module.exports = router
