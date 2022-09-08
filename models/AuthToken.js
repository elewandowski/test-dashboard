const mongoose = require('mongoose')
const { Schema } = mongoose
const dayjs = require('dayjs')

const authTokenSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    authToken: { type: String },
    expiresAt: { type: Date },
  },
  {
    methods: {
      isValid() {
        return dayjs().isBefore(dayjs(this.expiresAt))
      },
      invalidate() {
        this.expiresAt = dayjs()
      },
    },
  }
)

authTokenSchema.pre('save', function (next) {
  if (!this.authToken) this.authToken = crypto.randomBytes(30).toString('hex')
  if (!this.expiresAt) this.expiresAt = dayjs().add(7, 'days').toDate()
  next()
})

const AuthToken = mongoose.model('AuthToken', authTokenSchema)

module.exports = AuthToken
