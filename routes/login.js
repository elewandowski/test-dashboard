const dayjs = require('dayjs')
const crypto = require('node:crypto')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const AuthToken = require('../models/AuthToken')

router.post('/', async (req, res) => {
  //   req.body.hashedPassword = bcrypt.hashSync(
  //     req.body.password,
  //     bcrypt.genSaltSync(10)
  //   )

  const user = await User.findOne({
    email: req.body.email,
  })

  const passwordsMatch = bcrypt.compareSync(
    req.body.password,
    user.hashedPassword
  )

  if (passwordsMatch) {
    const authToken = crypto.randomBytes(30).toString('hex')
    const expiresAt = dayjs().add(7, 'days').toDate()
    AuthToken.create({
      user: user._id,
      authToken: authToken,
      expiresAt,
    })
    res.cookie('AuthToken', authToken)
    res.send(user)
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
