'use strict';

/**
 * Gulp Optimize file
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
const error = require('../modules/error');


/**
 * Optimize JS files
 */

function optimizeJS() {
  return gulp.src(paths.base.www + paths.modules.js.main)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.optimizeJs())
    .pipe(gulp.dest(paths.base.www + paths.modules.js.root));
}


/**
 * Optimize App
 */

const optimizeApp = gulp.parallel(
  optimizeJS
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

optimizeApp.displayName = 'optimize';
optimizeApp.description = 'Optimizes JS files via OptimizeJS for production.';
gulp.task(optimizeApp);
