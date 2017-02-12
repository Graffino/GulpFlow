/**
 * Gulp copy file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var config = require('../config');
var paths = require('../modules/paths');
var utils = require('../modules/utils');


/**
 * Copy javascript
 */

function copyJS() {
  return gulp.src([
    paths.base.src + paths.patterns.js.all,
    paths.ignore.js.vendor
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy icons
 */

function copyIcons() {
  return gulp.src([
    paths.base.src + paths.patterns.icons.all
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy images
 */

function copyImages() {
  return gulp.src([
    paths.base.src + paths.patterns.images.all
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy fonts
 */

function copyFonts() {
  return gulp.src([
    paths.base.src + paths.patterns.fonts.all
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy media
 */

function copyMedia() {
  return gulp.src([
    paths.base.src + paths.patterns.media.all
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy data
 */

function copyData() {
  return gulp.src([
    paths.base.src + paths.patterns.data.all
  ], {
    base: paths.base.src
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy Static
 */

function copyStatic() {
  return gulp.src([
    paths.base.src + paths.patterns.static.all
  ], {
    base: paths.base.src + paths.modules.static.root,
    dot: true
  })
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy Vendor
 */

function copyVendor() {
  return gulp.src([
    paths.base.root + paths.patterns.vendor.all
  ])
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy function
 */

var copyApp = gulp.parallel(
  copyJS,

  copyIcons,
  copyImages,

  // Skip Fonts according to config
  config.enabled.fonts ? copyFonts : utils.noop,

  // Skip Media folder according to config
  config.enabled.media ? copyMedia : utils.noop,

  // Skip Data folder according to config
  config.enabled.data ? copyData : utils.noop,

  copyStatic,

  // Skip Vendor folder according to config
  config.enabled.vendor ? copyVendor : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  js: copyJS,

  icons: copyIcons,
  images: copyImages,

  // Skip Fonts according to config
  fonts: config.enabled.fonts ? copyFonts : utils.noop,

  // Skip Media folder according to config
  media: config.enabled.media ? copyMedia : utils.noop,

  // Skip Data folder according to config
  data: config.enabled.data ? copyData : utils.noop,

  // Skip Static folder according to config
  static: copyStatic,

  // Skip Vendor folder according to config
  vendor: config.enabled.vendor ? copyVendor : utils.noop,

  app: copyApp
};


/**
 * Gulp copy task
 */

gulp.task('copy', copyApp);
