'use strict';

/**
 * Gulp JS file
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
const env = require('../modules/env');
const paths = require('../modules/paths');
const utils = require('../modules/utils');
const error = require('../modules/error');


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
    .pipe(gulp.dest(paths.base.www + paths.modules.js.root));
}


/**
 * Process JS
 */

const processJS = gulp.parallel(
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

processJS.displayName = 'js';
processJS.description = 'Convert application JS files to ES6.';
processJS.flags = {
  '--env development': 'Builds CSS and JS sourcemaps.',
  '--env staging': 'Doesn\'t build CSS and JS sourcemaps.',
  '--env production': 'Doesn\'t build CSS and JS sourcemaps.'
};
gulp.task(processJS);
