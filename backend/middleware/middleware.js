const AuthToken = require('../models/AuthToken')
const User = require('../models/User')

module.exports = {
  authenticationProtectedRoute: (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.sendStatus(401)
    }
  },

  authorizationProtectedRoute: function (requiredAuthorizations) {
    if (!Array.isArray(requiredAuthorizations))
      throw new TypeError(
        '`requiredAuthorizations` argument must be of type Array'
      )
    return (req, res, next) => {
      const userHasAuthorization = requiredAuthorizations.every(
        (requiredAuth) => {
          return req.user.permissions.includes(requiredAuth)
        }
      )
      if (userHasAuthorization) {
        next()
      } else {
        res.sendStatus(401)
      }
    }
  },

  injectUserToReq: async (req, res, next) => {
    // Get auth token from header
    const authToken = req.headers?.['authorization']
    console.log(authToken)

    if (typeof authToken === 'string') {
      const authTokenDB = await AuthToken.findOne({
        authToken,
      })

      if (authTokenDB?.isValid()) {
        console.log('authtoken is valid')
        const user = await User.findOne({
          _id: authTokenDB.user,
        }).select('-password')

        if (user) {
          console.log(user)
          // Inject the user to the request
          req.user = user
        }
      }
      console.log('authtoken is not valid')
    }

    next()
  },
}
