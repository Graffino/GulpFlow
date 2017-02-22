'use strict';

/**
 * Gulp minify file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var browserSync = require('browser-sync');
var csswring = require('csswring');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var env = require('../modules/env');
var paths = require('../modules/paths');
var error = require('../modules/error');


/**
 * Minify CSS files
 */

function minifyCSS() {
  return gulp.src(paths.base.www + paths.modules.css.main)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    // Create sourcemaps only if environment is development
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init({loadMaps: true})
      )
    )
    .pipe(plugins.postcss([csswring]))
    .pipe(plugins.rename({suffix: '.min'}))
    // Create sourcemaps only if environment is development
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
 * Minify JS files
 */

function minifyJS() {
  return gulp.src(paths.base.www + paths.modules.js.main)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    // Create sourcemaps only if environment is development
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init()
      )
    )
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    // Create sourcemaps only if environment is development
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.js.root));
}


/**
 * Minify HTML
 */

function minifyHTML() {
  return gulp.src(paths.base.www + paths.patterns.html.all)
     // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(plugins.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      keepClosingSlash: true
    }))
    // Replace with minifed CSS/JS versions
    .pipe(plugins.replace('main.js', 'main.min.js'))
    .pipe(plugins.replace('main.css', 'main.min.css'))
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Process Minify
 */

var minifyApp = gulp.parallel(
  minifyCSS,
  minifyJS,
  minifyHTML
);


/**
 * Export module functions
 */

module.exports = {
  app: minifyApp
};


/**
 * Gulp Minify task
 */

gulp.task('minify', minifyApp);
