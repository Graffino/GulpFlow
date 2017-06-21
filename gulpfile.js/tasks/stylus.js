'use strict';

/**
 * Gulp stylus file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const autoprefixer = require('autoprefixer');
const postcssQuantityQueries = require('postcss-quantity-queries');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const env = require('../modules/env');
const paths = require('../modules/paths');
const utils = require('../modules/utils');
const error = require('../modules/error');


/**
 * Compile Stylus files
 */

function compileStylus() {
  const processors = [
    autoprefixer(),
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

const processStylus = gulp.parallel(
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
