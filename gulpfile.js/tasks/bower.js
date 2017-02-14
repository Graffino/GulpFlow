'use strict';

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
var config = require('../config');
var paths = require('../modules/paths');
var utils = require('../modules/utils');


/**
 * Fetch Bower packages
 */

function fetchBower() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('bower install && bower prune'))
    .pipe(plugins.exec.reporter());
}


/**
 * Process Bower
 */

var processBower = gulp.parallel(
  config.enabled.bower ? fetchBower : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.bower ? fetchBower : utils.noop
};


/**
 * Gulp Bower task
 */

gulp.task('bower', processBower);
