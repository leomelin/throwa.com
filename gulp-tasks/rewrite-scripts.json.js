var gulp = require('gulp'),
  file = require('gulp-file'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  var manifest = require('../' + RELEASE_FOLDER + '/rev-manifest-js.json')
  var newScriptsJson = '["javascripts/' + manifest['main.min.js'] + '"]'

  return file('scripts.json', newScriptsJson, { src: true })
    .pipe(gulp.dest(RELEASE_FOLDER))
}
