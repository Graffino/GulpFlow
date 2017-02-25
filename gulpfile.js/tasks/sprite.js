'use strict';

/**
 * Gulp sprite file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('../config');
var paths = require('../modules/paths');
var utils = require('../modules/utils');


/**
 * Compile Stylus packages
 */

function compileSprite() {
  return gulp.src(paths.base.src + paths.patterns.icons.all)
    .pipe(plugins.svgSprite(config.modules.sprite))
    .pipe(gulp.dest(paths.base.www + paths.modules.icons.root));
}


/**
 * Process Sprite
 */

var processSprite = gulp.parallel(
  config.enabled.sprite ? compileSprite : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.sprite ? processSprite : utils.noop
};


/**
 * Gulp Sprite task
 */

processSprite.displayName = 'sprite';
processSprite.description = 'Generates SVG sprite `/icons/sprite.svg` and `/stylus/vendor/sprite.styl` files. Configuration options are available in `config.js`.';
gulp.task(processSprite);
