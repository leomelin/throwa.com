var gulp = require('gulp'),
  RELEASE_FOLDER = require('../gulp-config.json').RELEASE_FOLDER

module.exports = function () {
  // Copy folder structure to release omitting unneeded development files
  return gulp.src([
    './**',
    '!./.git/**',
    '!./.git**',
    '!./gulpfile.js',
    '!./public/javascripts/**',
    '!./public/stylesheets/**',
    '!./node_modules/gulp**',
    '!./node_modules/gulp/**',
    '!./node_modules/gulp-copy/**',
    '!./node_modules/gulp-nodemon/**',
    '!./node_modules/gulp-sass/**',
    '!./node_modules/gulp-shell/**',
    '!./node_modules/gulp-concat/**',
    '!./node_modules/gulp-minify-css/**',
    '!./node_modules/gulp-rev/**',
    '!./node_modules/gulp-file/**',
    '!./node_modules/gulp-uglify/**',
    '!./node_modules/gulp-autoprefixer/**',
    '!./node_modules/run-sequence**',
    '!./node_modules/run-sequence/**',
    '!./node_modules/del**',
    '!./node_modules/del/**',
    '!./build**',
    '!./build/**'
  ]).pipe(gulp.dest(RELEASE_FOLDER))
}
