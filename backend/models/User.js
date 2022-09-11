const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  permissions: { type: [String] },
})

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
