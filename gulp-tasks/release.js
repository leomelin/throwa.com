var runSequence = require('run-sequence')

module.exports = function (cb) {
  runSequence(
    'javascript-linter',
    'sass',
    'clean-release',
    'copy-release-folders',
    'swap-release-config',
    'copy-bootstrap-fonts',
    'concat-css',
    'concat-js',
    'rewrite-css.json',
    'rewrite-scripts.json',
    'release-end-clean',
    cb
  )
}
