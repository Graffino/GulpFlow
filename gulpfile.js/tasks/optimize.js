'use strict';

/**
 * Gulp Optimize file
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
var error = require('../modules/error');


/**
 * Compile Images files
 */

function optimizeImages() {
  return gulp.src(paths.base.www + paths.modules.images.root)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.imagemin(config))
    .pipe(gulp.dest(paths.base.www + paths.modules.images.root));
}

/**
 * Compile Images files
 */

function optimizeStatic() {
  return gulp.src(paths.base.www + paths.patterns.images.static)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.imagemin(config))
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Process Images
 */

var optimizeApp = gulp.parallel(
  optimizeImages,
  optimizeStatic
);


/**
 * Export module functions
 */

module.exports = {
  app: optimizeApp
};


/**
 * Gulp Optimize task
 */

gulp.task('optimize', optimizeApp);
