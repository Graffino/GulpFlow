/**
 * Gulp bower file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var paths = require('../modules/paths');


/**
 * Fetch bower packages
 */

function fetchBower() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('bower install && bower prune'))
    .pipe(plugins.exec.reporter());
}


/**
 * Export module functions
 */

module.exports = {
  fetch: fetchBower
};


/**
 * Gulp bower task
 */

gulp.task('bower', fetchBower);
