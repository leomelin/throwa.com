var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  return gulp.src(require('../scripts.json').map(function (src) { return './public/' + src }))
    .pipe(uglify({
      mangle: false,
      compress: {
        drop_console: true
      }
    }))
    .pipe(concat('main.min.js'))
    .pipe(rev())
    .pipe(gulp.dest(RELEASE_FOLDER + '/public/javascripts'))
    .pipe(rev.manifest('rev-manifest-js.json'))
    .pipe(gulp.dest(RELEASE_FOLDER))
}
