var del = require('del'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function (cb) {
  del([
    RELEASE_FOLDER + '/*',
    '!' + RELEASE_FOLDER + '/.git**',
    '!' + RELEASE_FOLDER + '/.git/**'
  ], {
    force: true
  }, cb)
}
