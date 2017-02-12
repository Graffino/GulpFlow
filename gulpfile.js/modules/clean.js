/**
 * Gulp clean file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var del = require('del');

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var config = require('../config');
var env = require('../modules/env');
var paths = require('../modules/paths');
var notice = require('../modules/notice');
var utils = require('../modules/utils');


/**
 * Global clean function
 */

function clean(toClean) {
  return del(toClean).then(function (paths) {
    // Send notice according to environment and config
    if (env.isDebug() && config.enabled.notice) {
      notice.send('Deleted:\n', paths.join('\n'));
    }
  });
}


/**
 * Individual clean functions
 */

// CSS
function cleanCSS() {
  return clean(paths.base.www + paths.modules.css.root);
}

// Javascript
function cleanJS() {
  return clean(paths.base.www + paths.modules.js.root);
}

// Icons
function cleanIcons() {
  return clean(paths.base.www + paths.modules.icons.root);
}

// Images
function cleanImages() {
  return clean(paths.base.www + paths.modules.images.root);
}

// Fonts
function cleanFonts() {
  return clean(paths.base.www + paths.modules.fonts.root);
}

// Media
function cleanMedia() {
  return clean(paths.base.www + paths.modules.media.root);
}

// HTML
function cleanHTML() {
  // HTML
  var html = [paths.base.www + '*.html'];
  // Language folders
  var languages = paths.languages;
  // Concatenate arrays
  var toClean = html.concat(languages);

  return clean(toClean);
}

// Data
function cleanData() {
  return clean(paths.base.www + paths.modules.data.root);
}

// Static
function cleanStatic() {
  return clean(paths.patterns.static.clean);
}

// Vendor
function cleanVendor() {
  return clean(paths.base.www + paths.modules.vendor.root);
}

// Bower
function cleanBower() {
  return clean('bower_components');
}

// Junk
function cleanJunk() {
  var toClean = [
    paths.root + '**/.DS_Store'
  ];

  return clean(toClean);
}

// Wordpress
function cleanWordpress() {
  return clean(paths.patterns.wordpress.clean);
}

// Postproduction
function cleanPostProduction() {
  var toClean;
  // Remove HTML files on production if Wordpress is enabled
  if (config.enabled.wordpress) {
    toClean = [
      // Leave only CSS mainfiles
      paths.base.www + paths.modules.css.root + '**/*',
      paths.ignore.css.main,
      // Leave only JS mainfiles
      paths.base.www + paths.modules.js.root + '**/*',
      paths.ignore.js.main,
      // Delete HTML files
      paths.base.www + '*.html'
    ];
  } else {
    toClean = [
      // Leave only CSS mainfiles
      paths.base.www + paths.modules.css.root + '**/*',
      paths.ignore.css.main,
      // Leave only JS mainfiles
      paths.base.www + paths.modules.js.root + '**/*',
      paths.ignore.js.main
    ];
  }

  return clean(toClean);
}


/**
 * Clean function
 */

var cleanApp = gulp.series(
  gulp.parallel(
    cleanCSS,
    cleanJS,
    cleanIcons,
    cleanImages,
    cleanFonts,
    cleanMedia,
    cleanHTML,
    cleanData,
    cleanVendor,
    cleanStatic,
    cleanWordpress,
    cleanBower,
    cleanJunk
  ),
  // Send notice according to environment and config
  env.isDevelopment() && config.enabled.notice ? notice.cleaned : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  css: cleanCSS,
  js: cleanJS,
  icons: cleanIcons,
  images: cleanImages,
  fonts: cleanFonts,
  media: cleanMedia,
  html: cleanHTML,
  data: cleanData,
  vendor: cleanVendor,
  static: cleanStatic,
  wordpress: cleanWordpress,
  bower: cleanBower,
  junk: cleanJunk,
  app: cleanApp,
  postproduction: cleanPostProduction
};
