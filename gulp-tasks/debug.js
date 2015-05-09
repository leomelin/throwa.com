var gulp = require('gulp')
var runSequence = require('run-sequence')

/* Debug tasks */

module.exports = function () {
  return gulp.task('debug', function (cb) {
    runSequence(
      'javascript-linter',
      'sass',
      'nodemon-debug',
      cb
    )
  })
}
