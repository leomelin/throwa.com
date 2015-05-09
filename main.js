var http = require('http')
var config = require('./config')

var frontendApp = require('./frontendApp')
var apiApp = require('./apiApp')

var mongoose = require('mongoose')
mongoose.connect(config.mongoDBConnectionURI, function (err) {
  if (err) {
    console.log('DB connection error', err)
  } else {
    console.log('DB connection successful')
  }
})

/**
 * Create HTTP frontendServer.
 */
var frontendServer = http.createServer(frontendApp)
var apiServer = http.createServer(apiApp)

/**
 * Listen on provided port, on all network interfaces.
 */
frontendServer.listen(frontendApp.get('port'))
apiServer.listen(apiApp.get('port'))

/**
 * Event listener for HTTP frontendServer "listening" event.
 */
frontendServer.on('listening', function () {
  var addr = frontendServer.address()
  console.log('Frontend -server Listening on ' + addr.port)
})

/**
 * Event listener for HTTP frontendServer "listening" event.
 */

apiServer.on('listening', function () {
  var addr = apiServer.address()
  console.log('API -server Listening on ' + addr.port)
})
