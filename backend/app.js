const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const xmlparser = require('express-xml-bodyparser')
const AuthToken = require('./models/AuthToken')
const User = require('./models/User')

const indexRouter = require('./routes/index')
const testRunsRouter = require('./routes/test-runs')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')

const protectedRoute = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

const app = express()

const mongoURL = 'mongodb://localhost:27017/test-dashboard'

async function main() {
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')

  app.use(logger('dev'))
  app.use(express.json())
  app.use(xmlparser())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))

  app.use(async (req, res, next) => {
    // Get auth token from header
    const authToken = req.headers?.['authorization']
    if (typeof authToken === 'string') {
      const authTokenDB = await AuthToken.findOne({
        authToken,
      })

      if (authTokenDB?.isValid()) {
        const user = await User.findOne({
          _id: authTokenDB.user,
        })
        if (user) {
          // Inject the user to the request
          req.user = user
        }
      }
    }

    next()
  })

  app.use('/', indexRouter)
  app.use('/test-runs', protectedRoute, testRunsRouter)
  app.use('/login', loginRouter)
  app.use('/signup', signupRouter)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })
}

main().catch(console.error)

module.exports = app
