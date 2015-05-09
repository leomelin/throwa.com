var del = require('del'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function (cb) {
  del([
    RELEASE_FOLDER + '/rev-manifest-css.json',
    RELEASE_FOLDER + '/rev-manifest-js.json',
    RELEASE_FOLDER + '/config-release.js'
  ], {
    force: true
  }, cb)
}
