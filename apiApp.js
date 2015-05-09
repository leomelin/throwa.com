var express = require('express')
var config = require('./config')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var busboy = require('connect-busboy') // middleware for form/file upload

var app = express()

app.use(logger('dev'))

// Initialize middleware
app.use(busboy())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Setup CORS and disable API-route caching
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  next()
})

// Initialize API-routes
app.use('/', require('./routes/api'))

// catch 404
app.use(function (req, res, next) {
  var err = {
    'status': 404,
    'message': 'Resource not found'
  }

  next(err)
})

// Error handler for other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err)
})

// Get port from config
app.set('port', config.apiServerPort)

module.exports = app
