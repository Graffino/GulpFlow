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
 * Link Wordpress Admin
 */

function linkAdmin() {
  var options = {
    cwd: '../../../../../'
  };

  return gulp.src(
    paths.modules.wordpress.theme + 'inc/admin/theme/www',
    options
  )
  .pipe(gulp.symlink('../../../../../' + paths.base.www + 'inc/admin/theme'));
}


/**
 * Process Wordpress function
 */

var processWordpress = gulp.series(
  config.enabled.wordpress.theme ? copyWordpress : utils.noop,
  config.enabled.wordpress.admin ? linkAdmin : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Copy Wordpress according to config
  process: processWordpress,
  copy: config.enabled.wordpress.theme ? copyWordpress : utils.noop,
  admin: config.enabled.wordpress.admin ? linkAdmin : utils.noop
};


/**
 * Gulp wordpress task
 */

processWordpress.displayName = 'wordpress';
processWordpress.description = 'Copies all Wordpress theme files into the build folder.';
gulp.task(processWordpress);
