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

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Copying dependency files
 */

// Patternlab Styleguide
const copyStyleguide = function () {
  return gulp.src(
    path.normalize(config.modules.patternlab.paths.source.styleguide + '/**/*'),
    {since: gulp.lastRun(copyStyleguide)}
  )
    .pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.root)));
};

// Font files
const copyFontFiles = function () {
  return gulp.src(
    [
      // Gulpflow processed font files
      path.normalize(paths.base.www + paths.modules.fonts.root + '/**/*')
    ],
    {since: gulp.lastRun(copyFontFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.fonts)));
};

// CSS files
const copyCssFiles = function () {
  return gulp.src(
    [
      // Stylus bundle
      path.normalize(paths.base.www + paths.modules.css.root + '/main.css'),
      // Patternlab custom css files
      path.normalize(config.modules.patternlab.paths.source.css + '/**/*.css')
    ],
    {since: gulp.lastRun(copyCssFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.css)));
};

// Copy Javascript files
const copyJsFiles = function () {
  return gulp.src(
    [
      // Gulpflow JS bundle
      path.normalize(paths.base.www + paths.modules.js.root + '/main.js'),
      // Patternlab custom js files
      path.normalize(config.modules.patternlab.paths.source.js + '/**/*.js')
    ],
    {since: gulp.lastRun(copyJsFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.js)));
};

// Copy images
const copyImageFiles = function () {
  return gulp.src(
    [
      // Gulpflow processed image files
      path.normalize(paths.base.www + paths.modules.images.root + '/**/*'),
      // Patternlab custom image files
      path.normalize(config.modules.patternlab.paths.source.images + '/**/*')
    ],
    {since: gulp.lastRun(copyImageFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.images)));
};

// Copy icon sprite file
const copyIconsSpriteFile = function () {
  return gulp.src(
    [
      // Gulpflow processed sprite and icon files
      path.normalize(paths.base.www + paths.modules.icons.root + '/**/*')
    ],
    {since: gulp.lastRun(copyIconsSpriteFile)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.icons)));
};


/**
 * Start patternlab build task
 */

const buildPatternlab = function (done) {
  const patternlab = require('patternlab-node');
  const paternlabInstance = patternlab(config.modules.patternlab);

  try {
    return paternlabInstance.build(done, {});
  } catch (err) {
    return done();
  }
};


/**
 * Gulp sequence for pattern-lab task
 */

const processPatternlab = gulp.series(
  config.enabled.patternlab ? copyStyleguide : utils.noop,
  config.enabled.patternlab ? copyJsFiles : utils.noop,
  config.enabled.patternlab ? copyCssFiles : utils.noop,
  config.enabled.patternlab ? copyFontFiles : utils.noop,
  config.enabled.patternlab ? copyImageFiles : utils.noop,
  config.enabled.patternlab ? copyIconsSpriteFile : utils.noop,
  config.enabled.patternlab ? buildPatternlab : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.patternlab ? processPatternlab : utils.noop
};


/**
 * Gulp task
 */

processPatternlab.displayName = 'patternlab';
processPatternlab.description = 'Runs the build script for patternlab-node module.';
gulp.task(processPatternlab);
