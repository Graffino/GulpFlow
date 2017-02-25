'use strict';

/**
 * Gulp stylus file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var autoprefixer = require('autoprefixer');
var postcssQuantityQueries = require('postcss-quantity-queries');

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
 * Compile Stylus files
 */

function compileStylus() {
  var processors = [
    autoprefixer(config.modules.autoprefixer),
    plugins.combineMq,
    postcssQuantityQueries
  ];

  return gulp.src(paths.base.src + paths.modules.stylus.app)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    // Create sourcemaps only if environment is development
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init({loadMaps: true})
      )
    )
    .pipe(plugins.stylus())
    .pipe(plugins.postcss(processors))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.css.common));
}


/**
 * Process Stylus
 */

var processStylus = gulp.parallel(
  config.enabled.stylus ? compileStylus : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.stylus ? processStylus : utils.noop
};


/**
 * Gulp Stylus task
 */

processStylus.displayName = 'stylus';
processStylus.description = 'Compiles stylus files into `/css/common/app.css`.';
processStylus.flags = {
  '--development': 'Builds CSS sourcemaps.',
  '--staging': 'Doesn\'t build CSS sourcemaps.',
  '--production': 'Doesn\'t build CSS sourcemaps.'
};
gulp.task(processStylus);
