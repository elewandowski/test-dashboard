const mongoose = require('mongoose')
const { Schema } = mongoose

const authTokenSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  authToken: { type: String },
  expiresAt: { Type: Date },
})

const AuthToken = mongoose.model('AuthToken', authTokenSchema)

module.exports = AuthToken
