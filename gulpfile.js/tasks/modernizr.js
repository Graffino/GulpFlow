'use strict';

/**
 * Gulp modernizr file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const paths = require('../modules/paths');
const config = require('../config');
const error = require('../modules/error');
const utils = require('../modules/utils');

/**
 * Compile modernizr files
 */

function buildModernizr() {
  const configModernizr = {
    cache: true,
    crawl: false,
    uglify: false,
    devFile: false,
    options: [
      'setClasses'
    ],
    tests: config.modules.modernizr
  };
  return gulp.src(paths.base.src + paths.patterns.js.all)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.modernizr(configModernizr))
    .pipe(gulp.dest(paths.base.www + paths.modules.js.vendor));
}


/**
 * Build modernizr function
 */

const processModernizr = gulp.parallel(
  config.enabled.modernizr ? buildModernizr : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.modernizr ? buildModernizr : utils.noop
};


/**
 * Gulp modernizr task
 */

processModernizr.displayName = 'modernizr';
processModernizr.description = 'Generates Modernizr library file based on `config.js` settings.';
gulp.task(processModernizr);
