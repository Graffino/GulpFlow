/**
 * Gulp fonts file
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
 * ConvertFonts
 */

 // WOFF
function convertFontsWOFF() {
  return gulp.src(paths.base.src + paths.patterns.fonts.ttf)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.ttf2woff())
    .pipe(gulp.dest(paths.base.www + paths.modules.fonts.root))
    .pipe(plugins.livereload());
}

// WOFF2
function convertFontsWOFF2() {
  return gulp.src(paths.base.src + paths.patterns.fonts.ttf)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.ttf2woff2())
    .pipe(gulp.dest(paths.base.www + paths.modules.fonts.root))
    .pipe(plugins.livereload());
}


/**
 * Convert fonts function
 */

var convertFonts = gulp.parallel(
  config.enabled.fonts ? convertFontsWOFF : utils.noop,
  config.enabled.fonts ? convertFontsWOFF2 : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  build: config.enabled.fonts ? convertFonts : utils.noop
};


/**
 * Gulp fonts task
 */

gulp.task('fonts', convertFonts);
