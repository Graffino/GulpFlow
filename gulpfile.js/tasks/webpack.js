'use strict';

/**
 * Gulp webpack file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Node requires
var webpack = require('webpack');

// Gulp requires
var config = require('../config');
// var paths = require('../modules/paths');
// var utils = require('../modules/utils');


/**
 * Development
 */
/*
function processDevelopment() {
  return gulp.src(
    paths.base.root + paths.patterns.wordpress.all
  )
  .pipe(gulp.dest(paths.base.www));
}
*/


/**
 * Webpack development
 */

var webpackDevelopment = function (callback) {
  webpack(config, function(err, stats) {
    logger(err, stats)
    callback()
  });
};


/**
 * Webpack production
 */

var webpackProduction = gulp.parallel(
  // utils.noop()
);


/**
 * Export module functions
 */

module.exports = {
  develop: webpackDevelopment,
  production: webpackProduction
};


/**
 * Gulp wordpress task
 */

gulp.task('webpack', webpackDevelopment);
gulp.task('webpack:development', webpackDevelopment);
gulp.task('webpack:production', webpackProduction);
