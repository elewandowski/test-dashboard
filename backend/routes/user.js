const express = require('express')
const router = express.Router()

router.get('/me', async (req, res) => {
  res.send(req.user)
})

module.exports = router
