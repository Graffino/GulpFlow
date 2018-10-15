'use strict';

/**
 * Gulp composer file
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
 * Install composer
 */

function installComposer(done) {
  const composerPaths = paths.modules.composer.root;

  // Loop trough all defined paths
  composerPaths.map(
    composerPath => plugins.composer({
      'working-dir': paths.base.www + composerPath,
      'async': false
    })
  );
  done();
}

/**
 * Process Composer
 */

const processComposer = gulp.series(
  config.enabled.composer ? installComposer : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  install: config.enabled.composer ? processComposer : utils.noop
};


/**
 * Gulp Composer task
 */

processComposer.displayName = 'composer';
processComposer.description = 'Fetches and installs PHP composer dependencies.';
gulp.task(processComposer);
