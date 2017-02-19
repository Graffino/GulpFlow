'use strict';

/**
 * Gulp JS file
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
var env = require('../modules/env');
var paths = require('../modules/paths');
var utils = require('../modules/utils');
var error = require('../modules/error');


/**
 * Compile JS files
 */

function compileJS() {
  return gulp.src(paths.base.src + paths.patterns.js.all)
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(plugins.babel(config.modules.babel))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init()
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.js.root))
    .pipe(plugins.livereload());
}


/**
 * Process JS
 */

var processJS = gulp.parallel(
  config.enabled.js ? compileJS : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.js ? processJS : utils.noop
};


/**
 * Gulp JS task
 */

gulp.task('js', processJS);
