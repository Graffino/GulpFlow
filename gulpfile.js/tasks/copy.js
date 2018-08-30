'use strict';

/**
 * Gulp copy file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');
const syncy = require('syncy');

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Copy javascript
 */

function copyJS() {
  const exclude = path.normalize('!**/{' + paths.patterns.js.exclude.join(',') + '}');

  return gulp.src([
    paths.base.src + paths.patterns.js.all,
    exclude
  ], {
    base: paths.base.src
  })
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy icons
 */
function copyIcons(done) {
  const excludeSync = paths.patterns.icons.excludeSync.map(item => '!' + paths.base.src + item);
  const pathsToCopy = [paths.base.src + paths.patterns.icons.noSprite].concat(excludeSync);
  syncy(
    pathsToCopy,
    paths.base.www + paths.modules.icons.root,
    {
      verbose: false,
      base: paths.base.src + paths.modules.icons.root,
      updateAndDelete: false
    }
  )
    .then(() => {
      done();
    })
    .catch(err => {
      done(error);
    });
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
  const exclude = path.normalize('!**/{' + paths.patterns.static.exclude.join(',') + '}');
  return gulp.src([
    paths.base.src + paths.patterns.static.all,
    exclude
  ], {
    base: paths.base.src + paths.modules.static.root,
    dot: true
  })
    .pipe(gulp.dest(paths.base.www));
}


/**
 * Copy Vendor
 */

function copyVendor(done) {
  const excludeSync = paths.patterns.vendor.excludeSync.map(item => '!' + paths.base.root + item);
  const pathsToCopy = [paths.base.root + paths.patterns.vendor.all].concat(excludeSync);
  syncy(
    pathsToCopy,
    paths.base.www + paths.modules.vendor.root, {
      verbose: true,
      base: paths.base.root + paths.base.vendor,
      updateAndDelete: false
    }
  )
    .then(() => {
      done();
    })
    .catch(err => {
      done(error);
    });
}


/**
 * Copy function
 */

const copyApp = gulp.parallel(
  // Skipped -> JS task processes these
  // copyJS,
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
  // Not needed but available -> JS task processes these
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

copyApp.displayName = 'copy';
copyApp.description = 'Copies all files and assets to the `/www` build folder.';
gulp.task(copyApp);
