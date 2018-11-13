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
const config = require('../config');
const env = require('../modules/env');
const paths = require('../modules/paths');
const error = require('../modules/error');


/**
 * Bundle JS files
 */

function bundleJS() {
  // JS SRC
  const excludeJS = paths.patterns.js.exclude.map(
    item => '!' + path.normalize(paths.base.www + '**/' + item)
  );
  const filesJS = [path.normalize(paths.base.www + paths.modules.js.root + '**/*.js')];
  const src = filesJS.concat(excludeJS);

  return gulp.src(src)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init({loadMaps: true})
      )
    )
    .pipe(plugins.order(config.modules.order.js))
    .pipe(plugins.groupConcat({
      'main.js': src
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
  // JS SRC
  const excludeCSS = paths.patterns.css.exclude.map(
    item => '!' + path.normalize(paths.base.www + '**/' + item)
  );
  const filesCSS = [path.normalize(paths.base.www + paths.modules.css.root + '**/*.css')];
  const src = filesCSS.concat(excludeCSS);

  return gulp.src(src)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init({loadMaps: true})
      )
    )
    .pipe(plugins.order(config.modules.order.css))
    .pipe(plugins.groupConcat({
      'main.css': src
    }))
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
