var gulp = require('gulp'),
  file = require('gulp-file'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  var manifest = require('../' + RELEASE_FOLDER + '/rev-manifest-css.json')
  var newCssJson = '["stylesheets/' + manifest['style.min.css'] + '"]'

  return file('css.json', newCssJson, { src: true })
    .pipe(gulp.dest(RELEASE_FOLDER))
}
