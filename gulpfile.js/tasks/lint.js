'use strict';

/**
 * Gulp lint file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const error = require('../modules/error');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Lint Gulp files
 */

function lintGulp() {
  return gulp.src(paths.base.root + 'gulpfile.js/**/*.js', {since: gulp.lastRun(lintGulp)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.xo({quiet: false}));
}


/**
 * Lint Javascript files
 */

function lintJS() {
  return gulp.src(paths.base.src + paths.patterns.js.all, {since: gulp.lastRun(lintJS)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.xo({quiet: false}));
}


/**
 * Lint Stylus files
 */

function lintStylus() {
  const configStylus = {
    config: '.stylintrc',
    reporter: 'stylint-stylish',
    reporterOptions: {
      verbose: true
    }
  };
  return gulp.src(paths.base.src + paths.patterns.stylus.all, {since: gulp.lastRun(lintStylus)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.stylint(configStylus))
    .pipe(plugins.stylint.reporter());
}


/**
 * Lint HTML files
 */

function lintHTML() {
  const exclude = path.normalize('!**/{' + paths.patterns.nunjucks.exclude.join(',') + '}');

  return gulp.src([paths.base.src + paths.patterns.nunjucks.all, exclude], {base: '.', since: gulp.lastRun(lintHTML)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.htmlhint('.htmlhintrc'))
    .pipe(plugins.htmlhint.reporter('htmlhint-stylish'));
}


/**
 * Lint PHP files
 */

function lintPHP() {
  const exclude = path.normalize('!**/{' + paths.patterns.php.exclude.join(',') + '}');
  return gulp.src([paths.base.root + paths.patterns.php.all, exclude], {base: '.', since: gulp.lastRun(lintPHP)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.phplint('', {skipPassedFiles: true, useCache: true}))
    .pipe(plugins.phplint.reporter('fail'));
}


/**
 * Lint function
 */

const lintApp = gulp.parallel(
  lintGulp,

  // Lint JS according to config
  config.enabled.lint.js ? lintJS : utils.noop,

  // Lint CSS according to config
  config.enabled.lint.js ? lintStylus : utils.noop,

  // Lint HTML according to config
  config.enabled.lint.html ? lintHTML : utils.noop,

  // Lint PHP according to config
  config.enabled.lint.php ? lintPHP : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  gulp: lintGulp,

  // Lint JS according to config
  js: config.enabled.lint.js ? lintJS : utils.noop,

  // Lint CSS according to config
  stylus: config.enabled.lint.js ? lintStylus : utils.noop,

  // Lint HTML according to config
  html: config.enabled.lint.html ? lintHTML : utils.noop,

  // Lint PHP according to config
  php: config.enabled.lint.php ? lintPHP : utils.noop,

  app: lintApp
};


/**
 * Gulp lint task
 */

lintApp.displayName = 'lint';
lintApp.description = 'Lints Stylus, Gulp, JS, Nunjucks, PHP files for errors.';
gulp.task(lintApp);
