'use strict';

/**
 * Gulp notice file
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
const utils = require('../modules/utils');


/**
 * Notice handling
 */

// Send notice
function sendNotice(message) {
  return gulp.src(paths.base.root)
  .pipe(plugins.notify({
    message: utils.pumped(message)
  }));
}

// Cleaned
function cleaned() {
  return gulp.src(paths.base.root)
  .pipe(plugins.notify({
    message: utils.pumped('Application build (www) folder has been cleaned.'),
    onLast: true
  }));
}


// Finished
function finished() {
  return gulp.src(paths.base.root)
  .pipe(plugins.notify({
    message: utils.pumped('Application has been built.'),
    onLast: true
  }));
}

// Watching
function watching() {
  return gulp.src(paths.base.root)
  .pipe(plugins.notify({
    message: utils.pumped('Entering watch mode.'),
    onLast: true
  }));
}

// Rebuilt
function rebuilt() {
  return gulp.src(paths.base.root)
  .pipe(plugins.notify({
    message: utils.pumped('Detected changes have been applied. Entering watch mode.'),
    onLast: true
  }));
}


/**
 * Export handler
 */

module.exports = {
  send: config.enabled.notice ? sendNotice : utils.noop,
  cleaned: config.enabled.notice ? cleaned : utils.noop,
  finished: config.enabled.notice ? finished : utils.noop,
  rebuilt: config.enabled.notice ? rebuilt : utils.noop,
  watching: config.enabled.notice ? watching : utils.noop
};
