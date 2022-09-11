const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/me', async (req, res) => {
  res.send(req.user)
})

module.exports = router
