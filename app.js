const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { MongoClient } = require('mongodb')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

const mongoURL = 'mongodb://localhost:27017/test-dashb-db'
const client = new MongoClient(mongoURL)

// MongoClient.connect(
//   "mongodb://localhost:27017/test-dashb-db",
//   (err, client) => {
//     if (err) throw err;

//     const db = client.db("test-dashb-db");

//     db.createCollection("test-runs", function (err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   }
// );

async function main() {
    await client.connect()

    const db = client.db('test-dashb-db')

    const testRunsColl = db.collection('test-runs')

    // db.createCollection("test-runs", function (err, res) {
    //   if (err) throw err;
    //   console.log("Collection created!");
    //   // db.close();
    // });

    // testRunsColl.insertOne({ a: 1 })

    const findAllResults = await testRunsColl.find({}).toArray()
    console.log('all results: ', findAllResults)

    // view engine setup
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))

    app.use('/', indexRouter)
    app.use('/users', usersRouter)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404))
    })

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.render('error')
    })

    process.on('SIGTERM', () => {
        console.error('SIGTERM signal received: closing HTTP server')
        client.close()
        server.close(() => {
            debug('HTTP server closed')
        })
    })

    process.on('exit', function () {
        // You need to use a synchronous, blocking function, here.
        // Not streams or even console.log, which are non-blocking.
        console.error('Something bad happened\n')
    })

    return findAllResults
}

main().then(console.log).catch(console.error)

module.exports = app
