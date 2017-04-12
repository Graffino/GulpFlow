'use strict';

/**
 * Gulp backstop file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();


// Gulp requires
const paths = require('../modules/paths');


/**
 * Backstop reference
 */

function backstopReference() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('backstop reference'))
    .pipe(plugins.exec.reporter());
}


/**
 * Backstop config
 */

function backstopConfig() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('backstop genConfig'))
    .pipe(plugins.exec.reporter());
}


/**
 * Backstop bless
 */

function backstopBless() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('backstop bless'))
    .pipe(plugins.exec.reporter());
}


/**
 * Backstop test
 */

function backstopTest() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('backstop test'))
    .pipe(plugins.exec.reporter());
}


/**
 * Backstop report
 */

function backstopReport() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('backstop openReport'))
    .pipe(plugins.exec.reporter());
}


/**
 * Export module functions
 */

module.exports = {
  reference: backstopReference,
  config: backstopConfig,
  bless: backstopBless,
  test: backstopTest,
  report: backstopReport
};


/**
 * Gulp Backstop tasks
 */

backstopReference.displayName = 'backstop:reference';
backstopReference.description = 'Generates Backstop reference in `./tests/backstop`.';
gulp.task(backstopReference);

backstopConfig.displayName = 'backstop:config';
backstopConfig.description = 'Generates Backstop config in `./backstop.json`.';
gulp.task(backstopConfig);

backstopBless.displayName = 'backstop:bless';
backstopBless.description = 'Bless-es Backstop previous references in `./tests/backstop` even if they don\'t validate.';
gulp.task(backstopBless);

backstopTest.displayName = 'backstop:test';
backstopTest.description = 'Generate Backstop report based on current versus references in `./tests/backstop`.';
gulp.task(backstopTest);
gulp.task('backstop', backstopTest);

backstopReport.displayName = 'backstop:report';
backstopReport.description = 'Opens last Backstop report available in `./tests/backstop`.';
gulp.task(backstopReport);
