'use strict';

/**
 * Gulp bower file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');
const mainBowerFiles = require('main-bower-files');

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
 * Fetch Bower packages
 */

function fetchBower() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec(
      paths.node.bower + '/bower install --allow-root && ' +
      paths.node.bower + '/bower prune --allow-root')
    )
    .pipe(plugins.exec.reporter());
}


/**
 * Compile Bower packages
 */

function compileBower() {
  const excludeCSS = path.normalize('!**/{' + paths.patterns.css.exclude.join(',') + '}');
  const excludeJS = path.normalize('!**/{' + paths.patterns.js.exclude.join(',') + '}');

  const jsFiles = plugins.filter([
    '**/*.js',
    excludeJS
  ], {restore: true});
  const cssFiles = plugins.filter([
    '**/*.css',
    excludeCSS
  ], {restore: true});

  return gulp.src(mainBowerFiles({
    includeDev: true,
    includeSelf: true,
    debugging: env.NODE_DEBUG
  }))
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init()
      )
    )
    .pipe(cssFiles)
    .pipe(plugins.groupConcat({'bower.css': [
      '**/*.css',
      excludeCSS
    ]}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.css.vendor))
    .pipe(cssFiles.restore)
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init()
      )
    )
    .pipe(jsFiles)
    .pipe(plugins.groupConcat({'bower.js': [
      '**/*.js',
      excludeJS
    ]}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.js.vendor));
}


/**
 * Process Bower
 */

const processBower = gulp.series(
  config.enabled.bower ? fetchBower : utils.noop,
  config.enabled.bower ? compileBower : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.bower ? processBower : utils.noop,
  fetch: config.enabled.bower ? fetchBower : utils.noop,
  compile: config.enabled.bower ? compileBower : utils.noop
};


/**
 * Gulp Bower task
 */

processBower.displayName = 'bower';
processBower.description = 'Fetches and concatenates bower dependencies into `/css/vendor/bower.css` and `/js/vendor/bower.js` .';
processBower.flags = {
  '--env development': 'Builds CSS and JS sourcemaps.',
  '--env staging': 'Doesn\'t build CSS and JS sourcemaps.',
  '--env production': 'Doesn\'t build CSS and JS sourcemaps.'
};
gulp.task(processBower);
