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

gulp.task('sprite', processSprite);
