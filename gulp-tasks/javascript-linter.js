var gulp = require('gulp'),
  standard = require('gulp-standard')

module.exports = function () {
  return gulp.src(['**/*.js', '!**/*.json', '!./node_modules/**', '!./public/javascripts/lib/**', '!./build/**'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
}
