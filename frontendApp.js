var express = require('express')
var config = require('./config')
var path = require('path')
/*var favicon = require('serve-favicon')*/
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Save apiURI from config as local variable to make it available in all views
app.locals.apiURI = config.apiURI

// Find scripts and stylesheets to be injected to <head></head> from json config files
app.locals.scripts = require('./scripts.json')
app.locals.css = require('./css.json')

// Set EJS as view engine
app.engine('html', require('ejs').renderFile)

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'))

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set public folder
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 365 * 24 * 60 * 60 * 1000 }))

// Frontend route config
app.use('/', require('./routes/frontend'))

// catch 404 and forward to corresponding throwa.com folder
app.use(function (req, res, next) {
  var folder = req.url.substring(1)

  // If folder name has a slash, the route is invalid
  if (folder.indexOf('/') !== -1) {
    return next({
      status: 404,
      message: 'Resource not found'
    })
  }
  res.render('folder', { templateName: 'folder', folder: folder })
})

// error handler for all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    status: err.status,
    templateName: 'error'
  })
})

// Get port from environment and store in Express.
app.set('port', config.frontendServerPort)

module.exports = app
