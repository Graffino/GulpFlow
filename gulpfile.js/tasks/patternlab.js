'use strict';

/**
 * Gulp Patternlab file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const path = require('path');
const gulp = require('gulp');
const patternlab = require('patternlab-node');

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Copying dependency files
 */

// Font files
const copyFontFiles = function () {
  return gulp.src(
    [
      // Gulpflow processed font files
      path.normalize(paths.base.www + paths.modules.fonts.root + '/**/*')
    ]
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.fonts)));
};

// CSS files
const copyCssFiles = function () {
  return gulp.src(
    [
      // Stylus bundle
      path.normalize(paths.base.www + paths.modules.css.root + '/main.css'),
      // Patternlab custom css files
      path.normalize(config.modules.patternlab.paths.source.css) + '/**/*.css'
    ]
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.css)));
};

// Patternlab Styleguide
const copyStyleguide = function () {
  return gulp.src(path.normalize(config.modules.patternlab.paths.source.styleguide) + '/**/*')
    .pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.root)));
};


// Start patternlab build task
const buildPatternlab = function (done) {
  const paternlabInstance = patternlab(config.modules.patternlab);

  try {
    return paternlabInstance.build(done, {});
  } catch (err) {
    return done();
  }
};


/**
 * Convert fonts function
 */

const processPatternlab = gulp.series(
  config.enabled.patternlab ? copyFontFiles : utils.noop,
  config.enabled.patternlab ? copyCssFiles : utils.noop,
  config.enabled.patternlab ? copyStyleguide : utils.noop,
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
