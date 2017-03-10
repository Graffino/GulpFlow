'use strict';

/**
 * Gulp wordpress file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var path = require('path');

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
  var exclude = path.normalize('!**/{' + paths.patterns.wordpress.exclude.join(',') + '}');
  return gulp.src([
    paths.base.root + paths.patterns.wordpress.all,
    exclude
  ]
  )
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Process Wordpress function
 */

var processWordpress = gulp.parallel(
  config.enabled.wordpress ? copyWordpress : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Copy Wordpress according to config
  process: config.enabled.wordpress ? copyWordpress : utils.noop
};


/**
 * Gulp wordpress task
 */

processWordpress.displayName = 'wordpress';
processWordpress.description = 'Copies all Wordpress theme files into the build folder.';
gulp.task(processWordpress);
