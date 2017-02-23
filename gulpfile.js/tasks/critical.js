'use strict';

/**
 * Gulp Critical file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var critical = require('critical').stream;

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('../config');
var paths = require('../modules/paths');
var utils = require('../modules/utils');
var error = require('../modules/error');


/**
 * Generate Critical CSS
 */

function criticalCSS() {
  return gulp.src(paths.base.www + paths.patterns.html)
    // Convert assets path to absolute path
    .pipe(plugins.replace('../assets', '/assets/'))
    .pipe(critical({
      base: paths.base.www,
      inline: false,
      minify: true,
      width: 2000,
      height: 2000,
      css: paths.base.www + paths.modules.css.main,
      timeout: 1000 * 60 * 10
    }).on('error', function (err) {
      error.handle(err);
    }))
    // Correct assets path
    .pipe(plugins.replace('../', '/assets/'))
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Process Critical CSS
 */

var processCritical = gulp.parallel(
  config.enabled.critical ? criticalCSS : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.critical ? processCritical : utils.noop
};


/**
 * Gulp Critical task
 */

gulp.task('critical', processCritical);
