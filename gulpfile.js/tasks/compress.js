'use strict';

/**
 * Gulp Compress file
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
const error = require('../modules/error');


/**
 * Compile Images files
 */

function compressImages() {
  return gulp.src(paths.base.www + paths.modules.images.root)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.imagemin(config))
    .pipe(gulp.dest(paths.base.www + paths.modules.images.root));
}

/**
 * Compile Images files
 */

function compressStatic() {
  return gulp.src(paths.base.www + paths.patterns.images.static)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.imagemin(config))
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Process App
 */

const compressApp = gulp.parallel(
  compressImages,
  compressStatic
);


/**
 * Export module functions
 */

module.exports = {
  app: compressApp
};


/**
 * Gulp Optimize task
 */

compressApp.displayName = 'compress';
compressApp.description = 'Compresses images via Imagemin. Options are available in `config.js`.';
gulp.task(compressApp);
