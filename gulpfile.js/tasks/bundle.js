'use strict';

/**
 * Gulp bundle file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */


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
  return gulp.src(paths.base.www + paths.patterns.js.all)
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
  .pipe(plugins.groupConcat({'main.js': ['**/*.js', '!**/*main*.js']}))
  .pipe(
    plugins.if(
      env.isDevelopment(),
      plugins.sourcemaps.write('.')
    )
  )
  .pipe(gulp.dest(paths.base.www + paths.modules.js.root))
  .pipe(plugins.livereload());
}


/**
 * Bundle CSS files
 */

function bundleCSS() {
  return gulp.src(paths.base.www + paths.patterns.css.all)
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
    .pipe(plugins.groupConcat({'main.css': ['**/*.css', '!**/*main*.css']}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.css.root))
    .pipe(plugins.livereload());
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
  process: bundleApp,
  css: bundleCSS,
  js: bundleJS
};


/**
 * Gulp Bundle task
 */

gulp.task('bundle', bundleApp);
