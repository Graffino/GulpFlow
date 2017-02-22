'use strict';

/**
 * Gulp bundle file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var path = require('path');
var browserSync = require('browser-sync');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var env = require('../modules/env');
var paths = require('../modules/paths');
var error = require('../modules/error');


/**
 * Bundle JS files
 */

function bundleJS() {
  var exclude = path.normalize('!**/' + paths.patterns.js.exclude.join(','));

  return gulp.src([
    paths.base.www + paths.patterns.js.all,
    exclude
  ])
  // Fix pipe on error
  .pipe(plugins.plumber({errorHandler: error.handle}))
  .pipe(
    plugins.if(
      env.isDevelopment(),
      plugins.sourcemaps.init({loadMaps: true})
    )
  )
  .pipe(plugins.order([
    '**/bower.js',
    '**/app.js',
    '**/*.js'
  ]))
  .pipe(plugins.groupConcat({
    'main.js': [
      '**/*.js',
      exclude
    ]
  }))
  .pipe(
    plugins.if(
      env.isDevelopment(),
      plugins.sourcemaps.write('.')
    )
  )
  .pipe(gulp.dest(paths.base.www + paths.modules.js.root));
}


/**
 * Bundle CSS files
 */

function bundleCSS() {
  var exclude = path.normalize('!**/' + paths.patterns.css.exclude.join(','));

  return gulp.src([
    paths.base.www + paths.patterns.css.all,
    exclude
  ])
  // Fix pipe on error
  .pipe(plugins.plumber({errorHandler: error.handle}))
  .pipe(
    plugins.if(
      env.isDevelopment(),
      plugins.sourcemaps.init({loadMaps: true})
    )
  )
  .pipe(plugins.order([
    '**/bower.css',
    '**/app.css',
    '**/*.css'
  ]))
  .pipe(plugins.groupConcat({'main.css': [
    '**/*.css',
    exclude
  ]}))
  .pipe(
    plugins.if(
      env.isDevelopment(),
      plugins.sourcemaps.write('.')
    )
  )
  .pipe(gulp.dest(paths.base.www + paths.modules.css.root))
  .pipe(browserSync.stream());
}


/**
 * Bundle App
 */

var bundleApp = gulp.parallel(
  bundleJS,
  bundleCSS
);


/**
 * Export module functions
 */

module.exports = {
  app: bundleApp,
  css: bundleCSS,
  js: bundleJS
};


/**
 * Gulp Bundle task
 */

gulp.task('bundle', bundleApp);
