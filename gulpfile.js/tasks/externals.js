'use strict';

/**
 * Gulp Externals file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const plugins = require('gulp-load-plugins');
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');

const packageFile = require('../../package.json');


/**
 * Copy JS
 */

function copyJS() {
  return gulp.src([
    paths.base.www + paths.modules.js.main
  ], {
    base: paths.base.www
  })
    .pipe(plugins.rename(paths.externals.js + packageFile.name + '.js'))
    .pipe(gulp.dest(paths.externals.public));
}

/**
 * Copy CSS
 */

function copyCSS() {
  return gulp.src([
    paths.base.www + paths.modules.css.main
  ], {
    base: paths.base.www
  })
    .pipe(plugins.rename(paths.externals.css + packageFile.name + '.css'))
    .pipe(gulp.dest(paths.externals.public));
}


/**
 * Process copy externals function
 */

const copyExternals = gulp.series(
  config.enabled.externals.css ? copyCSS : utils.noop,
  config.enabled.externals.js ? copyJS : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Copy css and JS to external folder
  copy: copyExternals,
  css: config.enabled.externals.css ? copyCSS : utils.noop,
  js: config.enabled.externals.js ? copyJS : utils.noop
};


/**
 * Gulp Symlinks task
 */

copyExternals.displayName = 'externals';
copyExternals.description = 'Copy CSS and JS into the specified path.';
gulp.task(copyExternals);
