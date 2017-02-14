/**
 * Gulp wordpress file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var config = require('../config');
var paths = require('../modules/paths');
var utils = require('../modules/utils');


/**
 * Copy Wordpress
 */

function copyWordpress() {
  return gulp.src(
    paths.base.root + paths.patterns.wordpress.all
  )
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Convert fonts function
 */

var processWordpress = gulp.parallel(
  config.enabled.wordpress ? copyWordpress : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Copy Wordpress according to config
  copy: config.enabled.wordpress ? processWordpress : utils.noop
};


/**
 * Gulp wordpress task
 */

gulp.task('wordpress', processWordpress);
