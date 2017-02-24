'use strict';

/**
 * Gulp lint file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var path = require('path');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('../config');
var error = require('../modules/error');
var paths = require('../modules/paths');
var utils = require('../modules/utils');


/**
 * Lint javascript files
 */

function lintJS() {
  return gulp.src(paths.base.src + paths.patterns.js.all)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.xo({quiet: false}));
}


/**
 * Lint stylus files
 */

function lintStylus() {
  var configStylus = {
    config: '.stylintrc',
    reporter: 'stylint-stylish',
    reporterOptions: {
      verbose: true
    }
  };
  return gulp.src(paths.base.src + paths.patterns.stylus.all)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.stylint(configStylus))
    .pipe(plugins.stylint.reporter());
}


/**
 * Lint HTML files
 */

function lintHTML() {
  var exclude = path.normalize('!**/{' + paths.patterns.nunjucks.html.exclude.join(',') + '}');

  return gulp.src([paths.base.src + paths.patterns.nunjucks.html.all, exclude])
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.htmlhint('.htmlhintrc'))
    .pipe(plugins.htmlhint.reporter('htmlhint-stylish'));
}


/**
 * Lint function
 */

var lintApp = gulp.parallel(
  // Lint JS according to config
  config.enabled.lint.js ? lintJS : utils.noop,

  // Lint CSS according to config
  config.enabled.lint.js ? lintStylus : utils.noop,

  // Lint HTML according to config
  config.enabled.lint.html ? lintHTML : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Lint JS according to config
  js: config.enabled.lint.js ? lintJS : utils.noop,

  // Lint CSS according to config
  stylus: config.enabled.lint.js ? lintStylus : utils.noop,

  // Lint HTML according to config
  html: config.enabled.lint.html ? lintHTML : utils.noop,

  app: lintApp
};


/**
 * Gulp lint task
 */

gulp.task('lint', lintApp);
