const crypto = require('node:crypto')
const mongoose = require('mongoose')
const dayjs = require('dayjs')

const signupTokenSchema = new mongoose.Schema(
  {
    token: { type: String },
    expiresAt: { type: Date },
  },
  {
    methods: {
      isValid() {
        return dayjs().isBefore(dayjs(this.expiresAt))
      },
      invalidate(callback) {
        this.expiresAt = dayjs().toDate()
        this.save(callback)
      },
    },
  }
)

signupTokenSchema.pre('save', function (next) {
  if (!this.token) this.token = crypto.randomBytes(30).toString('hex')
  if (!this.expiresAt) this.expiresAt = dayjs().add(7, 'days').toDate()
  next()
})

const SignupToken = mongoose.model('SignupToken', signupTokenSchema)

module.exports = SignupToken
