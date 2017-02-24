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

function criticalCSSSingle(criticalPath) {
  return gulp.src(criticalPath + paths.patterns.html.all)
    // Convert assets path to absolute path
    .pipe(plugins.replace('../assets', '/assets/'))
    .pipe(critical(config.modules.critical).on('error', function (err) {
      error.handle(err);
    }))
    // Correct assets path
    .pipe(plugins.replace('../', '/assets/'))
    .pipe(gulp.dest(criticalPath));
}


/**
 * Generate Critical CSS
 */

function criticalCSS() {
  var languages = paths.languages;
  if (languages.length > 0) {
    languages.forEach(function (language) {
      return criticalCSSSingle(language);
    });
  } else {
    return criticalCSSSingle(paths.base.www);
  }
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
