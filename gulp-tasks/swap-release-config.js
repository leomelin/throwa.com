var gulp = require('gulp'),
  shell = require('gulp-shell'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  return gulp.src('./config-release.js')
    .pipe(shell([
      "cp <%=file.path%> <%='" + RELEASE_FOLDER + "/config.js'%>"
    ]))
}
