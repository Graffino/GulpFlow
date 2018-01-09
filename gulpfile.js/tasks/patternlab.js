'use strict';

/**
 * Gulp Patternlab file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const patternlab = require('@pattern-lab/patternlab-node');

// Gulp requires
const paths = require('../modules/paths');
const config = require('../config');
const error = require('../modules/error');
const utils = require('../modules/utils');


// Start patternlab build task
const buildPatternlab = function (done) {
  const paternlabInstance = patternlab(config.modules.patternlab);

  try {
    return paternlabInstance.build(done, {});
  } catch (err) {
    console.log(err);
    return done();
  }
};


/**
 * Convert fonts function
 */

const processPatternlab = gulp.parallel(
  config.enabled.patternlab ? buildPatternlab : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.patternlab ? processPatternlab : utils.noop
};


/**
 * Gulp fonts task
 */

processPatternlab.displayName = 'patternlab';
processPatternlab.description = 'Runs the build script for patternlab-node module.';
gulp.task(processPatternlab);
