var nodemon = require('gulp-nodemon')

module.exports = function () {
  return nodemon({
    script: './main.js'
  })
}
