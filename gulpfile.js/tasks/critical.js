'use strict';

/**
 * Gulp Critical file
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
var error = require('../modules/error');

var returnStream;

/**
 * Generate Critical CSS
 */

function criticalCSSSingle(criticalPath) {
  // Node requires
  var critical = require('critical').stream;

  returnStream = gulp.src(criticalPath + paths.patterns.html.all)
    // Convert assets path to absolute path
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.replace('../assets', '/assets/'))
    .pipe(critical(config.modules.critical))
    // Correct assets path
    .pipe(plugins.replace('../', '/assets/'))
    .pipe(gulp.dest(criticalPath));

  return returnStream;
}


/**
 * Generate Critical CSS
 */

function criticalCSS() {
  var languages = paths.languages;
  if (languages.length > 0) {
    languages.forEach(function (language) {
      criticalCSSSingle(language);
    });
  } else {
    criticalCSSSingle(paths.base.www);
  }
  return returnStream;
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
