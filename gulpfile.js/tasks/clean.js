'use strict';

/**
 * Gulp clean file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');
const del = require('del');

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const config = require('../config');
const env = require('../modules/env');
const paths = require('../modules/paths');
const notice = require('../modules/notice');
const utils = require('../modules/utils');


/**
 * Global clean function
 */

function clean(toClean) {
  return del(toClean).then(paths => {
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
  const html = [paths.base.www + '*.html'];
  // Language folders
  const languages = paths.languages;
  // Concatenate arrays
  const toClean = html.concat(languages);

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
  const toClean = [
    paths.root + '**/.DS_Store'
  ];

  return clean(toClean);
}

// Patternlab
function cleanPatternlab() {
  return clean(paths.base.www + base.patternlab);
}

// Wordpress
function cleanWordpress() {
  const exclude = paths.patterns.wordpress.exclude.map(
    item => path.normalize('!' + paths.base.www + '**/' + item)
  );
  const files = paths.patterns.wordpress.clean;
  const toClean = files.concat(exclude);

  return clean(toClean);
}

// Composer
function cleanComposer() {
  const toClean = paths.patterns.composer.clean.map(
    item => path.normalize(item)
  );

  return clean(toClean);
}


/**
 * Clean Postproduction
 */

// Postproduction
function cleanPostProduction() {
  let toClean;

  // Clean CSS
  const excludeCSS = paths.patterns.css.exclude.map(
    item => path.normalize('!' + paths.base.www + '**/' + item)
  );
  const filesCSS = [paths.base.www + paths.modules.css.root + '**/*'];
  const toCleanCSS = filesCSS.concat(excludeCSS);

  // Clean JS
  const excludeJS = paths.patterns.js.exclude.map(
    item => path.normalize('!' + paths.base.www + '**/' + item)
  );
  const filesJS = [paths.base.www + paths.modules.js.root + '**/*'];
  const toCleanJS = filesJS.concat(excludeJS);

  // Leave only CSS and JS mainfiles
  toClean = toCleanCSS.concat(toCleanJS);

  // Remove HTML files on production if Wordpress is enabled
  if (config.enabled.wordpress.theme) {
    // HTML
    const html = [paths.base.www + '*.html'];

    // Language folders
    const languages = paths.languages;

    // Cleanup HTML
    const htmlFiles = html.concat(languages);

    toClean = toClean.concat(htmlFiles);
  }

  return clean(toClean);
}


/**
 * Clean function
 */

const cleanApp = gulp.series(
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
    cleanPatternlab,
    cleanWordpress,
    cleanComposer,
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
  patternlab: cleanPatternlab,
  wordpress: cleanWordpress,
  composer: cleanComposer,
  bower: cleanBower,
  junk: cleanJunk,
  app: cleanApp,
  postproduction: cleanPostProduction
};


/**
 * Gulp clean task
 */

cleanApp.displayName = 'clean';
cleanApp.description = 'Cleans `/www` build folder from all generated files. Some manually inserted files and folders might remain';
gulp.task(cleanApp);
