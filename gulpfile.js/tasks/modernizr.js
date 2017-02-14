/**
 * Gulp modernizr file
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
var config = require('../config');
var error = require('../modules/error');
var utils = require('../modules/utils');

/**
 * Compile modernizr files
 */

function compileModernizr() {
  var configModernizr = {
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
 * Modernizr function
 */

var buildModernizr = gulp.parallel(
  // Run modernizr according to config
  config.enabled.modernizr ? compileModernizr : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  build: config.enabled.modernizr ? buildModernizr : utils.noop
};


/**
 * Gulp modernizr task
 */

gulp.task('modernizr', buildModernizr);
