const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('./config/logger')

logger.info('Starting the application...')

const indexRouter = require('./src/routes/index')
const usersRouter = require('./src/routes/users')
const movieRouter = require('./src/routes/movie.routes')
const movieRouterApi = require('./src/routes/movie.routes.api')
const rentalRoutes = require('./src/routes/rental.routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'src', 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/movies', movieRouter)
app.use('/rentals', rentalRoutes)

// API routes
app.use('/api/movies', movieRouterApi)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error(`Route '${req.url}' was not found.`)
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    logger.error(
        'Error occurred: ',
        'Status:',
        err.status,
        'Message:',
        err.message
    )
    res.render('error', {
        title: 'Error',
        status: err.status,
        message: 'There was an error processing your request.',
        error: err
    })
})

module.exports = app
