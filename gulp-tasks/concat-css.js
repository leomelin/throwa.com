var gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  autoprefixer = require('gulp-autoprefixer'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  return gulp.src(require('../css.json').map(function (src) { return './public/' + src }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(RELEASE_FOLDER + '/public/stylesheets'))
    .pipe(rev.manifest('rev-manifest-css.json'))
    .pipe(gulp.dest(RELEASE_FOLDER))
}
