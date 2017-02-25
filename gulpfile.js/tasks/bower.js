'use strict';

/**
 * Gulp bower file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var path = require('path');
var mainBowerFiles = require('main-bower-files');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('../config');
var env = require('../modules/env');
var paths = require('../modules/paths');
var utils = require('../modules/utils');
var error = require('../modules/error');


/**
 * Fetch Bower packages
 */

function fetchBower() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('bower install && bower prune'))
    .pipe(plugins.exec.reporter());
}


/**
 * Compile Bower packages
 */

function compileBower() {
  var excludeCSS = path.normalize('!**/{' + paths.patterns.css.exclude.join(',') + '}');
  var excludeJS = path.normalize('!**/{' + paths.patterns.js.exclude.join(',') + '}');

  var jsFiles = plugins.filter([
    '**/*.js',
    excludeJS
  ], {restore: true});
  var cssFiles = plugins.filter([
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

var processBower = gulp.series(
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
  '--development': 'Builds CSS and JS sourcemaps.',
  '--staging': 'Doesn\'t build CSS and JS sourcemaps.',
  '--production': 'Doesn\'t build CSS and JS sourcemaps.'
};
gulp.task(processBower);
