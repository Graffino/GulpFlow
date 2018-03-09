'use strict';

/**
 * Gulp fonts file
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
 * ConvertFonts
 */

// WOFF
function convertFontsWOFF() {
  return gulp.src(paths.base.src + paths.patterns.fonts.ttf)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.ttf2woff())
    .pipe(gulp.dest(paths.base.www + paths.modules.fonts.root));
}

// WOFF2
function convertFontsWOFF2() {
  return gulp.src(paths.base.src + paths.patterns.fonts.ttf)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.ttf2woff2())
    .pipe(gulp.dest(paths.base.www + paths.modules.fonts.root));
}


/**
 * Convert fonts function
 */

const processFonts = gulp.parallel(
  config.enabled.fonts ? convertFontsWOFF : utils.noop,
  config.enabled.fonts ? convertFontsWOFF2 : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.fonts ? processFonts : utils.noop
};


/**
 * Gulp fonts task
 */

processFonts.displayName = 'fonts';
processFonts.description = 'Generates WOFF and WOFF2 files from the available TTF font files.';
gulp.task(processFonts);
