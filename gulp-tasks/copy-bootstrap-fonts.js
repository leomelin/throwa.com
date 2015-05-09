var gulp = require('gulp'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  return gulp.src('./public/javascripts/lib/bootstrap/dist/fonts/**')
    .pipe(gulp.dest(RELEASE_FOLDER + '/public/fonts'))
}
