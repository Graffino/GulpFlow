'use strict';

/**
 * Gulp Critical file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');
const error = require('../modules/error');

let returnStream;

/**
 * Generate Critical CSS
 */

function criticalCSSSingle(criticalPath) {
  // Node requires
  const critical = require('critical').stream;

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
  const languages = paths.languages;
  if (languages.length > 0) {
    languages.forEach(language => {
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

const processCritical = gulp.parallel(
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

processCritical.displayName = 'critical';
processCritical.description = 'Generates and inserts (or writes [filename].css files) into the HTML templates. Can be configured via `config.js`.';
gulp.task(processCritical);
