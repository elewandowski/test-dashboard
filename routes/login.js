const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const AuthToken = require('../models/AuthToken')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })

  const passwordsMatch = bcrypt.compareSync(req.body.password, user.password)

  if (passwordsMatch) {
    const authToken = await AuthToken.create({
      user: user._id,
    })
    res.send({ authToken: authToken.authToken, user })
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
