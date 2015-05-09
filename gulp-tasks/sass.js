var gulp = require('gulp')
var sass = require('gulp-sass')

module.exports = function () {
  return gulp.src([
    './public/stylesheets/sass/*.scss'
  ])
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
}
