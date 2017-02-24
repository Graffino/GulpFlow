'use strict';

/**
 * Gulp clean file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
var path = require('path');
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
 * Clean CSS
 */

// CSS
function cleanCSS() {
  return clean(paths.base.www + paths.modules.css.root);
}


/**
 * Clean JS
 */

// Javascript
function cleanJSAll() {
  return clean(paths.base.www + paths.modules.js.root);
}

// Javascript common files
function cleanJSCommon() {
  return clean(paths.base.www + paths.modules.js.common);
}

// Javascript modules files
function cleanJSModules() {
  return clean(paths.base.www + paths.modules.js.modules);
}

// Javascript vendor files
function cleanJSVendor() {
  return clean(paths.base.www + paths.modules.js.vendor);
}


/**
 * Clean sprite
 */

// Sprite
function cleanSprite() {
  return clean(paths.base.src + paths.modules.stylus.sprite);
}


/**
 * Clean icons
 */

// Icons
function cleanIcons() {
  return clean(paths.base.www + paths.modules.icons.root);
}


/**
 * Clean images
 */

// Images
function cleanImages() {
  return clean(paths.base.www + paths.modules.images.root);
}


/**
 * Clean fonts
 */

// Fonts
function cleanFonts() {
  return clean(paths.base.www + paths.modules.fonts.root);
}


/**
 * Clean media
 */

// Media
function cleanMedia() {
  return clean(paths.base.www + paths.modules.media.root);
}


/**
 * Clean HTML
 */

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


/**
 * Other
 */

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


/**
 * Clean Postproduction
 */

// Postproduction
function cleanPostProduction() {
  var toClean;

  // Excludes
  var excludeCSS = path.normalize('!' + paths.base.www + paths.modules.css.root + paths.patterns.css.exclude.join(','));
  var excludeJS = path.normalize('!' + paths.base.www + paths.modules.js.root + paths.patterns.js.exclude.join(','));

  // HTML
  var html = [paths.base.www + '*.html'];
  // Language folders
  var languages = paths.languages;
  // CleanupHTML
  var htmlFiles = html.concat(languages);

  // Remove HTML files on production if Wordpress is enabled
  toClean = [
    // Leave only CSS mainfiles
    paths.base.www + paths.modules.css.root + '**/*',
    excludeCSS,
    // Leave only JS mainfiles
    paths.base.www + paths.modules.js.root + '**/*',
    excludeJS
  ];

  if (config.enabled.wordpress) {
    toClean = toClean.concat(htmlFiles);
  }

  return clean(toClean);
}


/**
 * Clean function
 */

var cleanApp = gulp.series(
  gulp.parallel(
    cleanCSS,
    cleanSprite,
    cleanJSAll,
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
  sprite: cleanSprite,
  js: {
    all: cleanJSAll,
    common: cleanJSCommon,
    modules: cleanJSModules,
    vendor: cleanJSVendor
  },
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


/**
 * Gulp clean task
 */

gulp.task('clean', cleanApp);
