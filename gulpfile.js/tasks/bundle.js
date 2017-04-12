'use strict';

/**
 * Gulp bundle file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');
const browserSync = require('browser-sync');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const env = require('../modules/env');
const paths = require('../modules/paths');
const error = require('../modules/error');


/**
 * Bundle JS files
 */

function bundleJS() {
  const exclude = path.normalize('!**/{' + paths.patterns.js.exclude.join(',') + '}');

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
  const exclude = path.normalize('!**/{' + paths.patterns.css.exclude.join(',') + '}');

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

const bundleApp = gulp.parallel(
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

bundleApp.displayName = 'bundle';
bundleApp.description = 'Concatenates all CSS and JS files except `main*.js` and `main*.css` into `/css/main.css` and `/js/main.js`.';
bundleApp.flags = {
  '--development': 'Builds CSS and JS sourcemaps.',
  '--staging': 'Doesn\'t build CSS and JS sourcemaps.',
  '--production': 'Doesn\'t build CSS and JS sourcemaps.'
};
gulp.task(bundleApp);
