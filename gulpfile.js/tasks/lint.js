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
    .pipe(plugins.xo({quiet: false}))
    .pipe(plugins.xo.format());
}


/**
 * Lint Javascript files
 */

function lintJS() {
  return gulp.src(paths.base.src + paths.patterns.js.all, {since: gulp.lastRun(lintJS)})
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.notice}))
    .pipe(plugins.xo({quiet: false}))
    .pipe(plugins.xo.format());
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
    .pipe(plugins.phpcs({
      standard: 'Wordpress-Core',
      showSniffCode: true,
      warningSeverity: 0,
      ignore: '*/www/*'
    }))
    .pipe(plugins.phpcs.reporter('log'));
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
  stylus: config.enabled.lint.css ? lintStylus : utils.noop,

  // Lint HTML according to config
  html: config.enabled.lint.html ? lintHTML : utils.noop,

  // Lint PHP according to config
  php: config.enabled.lint.php ? lintPHP : utils.noop,

  app: lintApp
};


/**
 * Gulp lint tasks
 */

lintApp.displayName = 'lint';
lintApp.description = 'Lints Stylus, Gulp, JS, Nunjucks, PHP files for errors.';
gulp.task(lintApp);

lintJS.displayName = 'lint:js';
lintJS.description = 'Lints JS files for errors.';
gulp.task(lintJS);

lintStylus.displayName = 'lint:stylus';
lintStylus.description = 'Lints Stylus files for errors.';
gulp.task(lintStylus);

lintHTML.displayName = 'lint:html';
lintHTML.description = 'Lints HTML files for errors.';
gulp.task(lintHTML);

lintPHP.displayName = 'lint:php';
lintPHP.description = 'Lints PHP files for errors.';
gulp.task(lintPHP);
