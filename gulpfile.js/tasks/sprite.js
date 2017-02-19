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
  var config = {
    shape: {
      // Set a default padding between elements
      spacing: {
        padding: 2
      },
      transform: ['svgo']
    },
    log: 'info',
    mode: {
      symbol: true,
      css: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite.svg',
        mixin: 'sprite',
        dimensions: 'inline',
        render: {
          styl: {
            template: paths.base.src + paths.modules.stylus.mustache,
            dest: '../../' + paths.base.src + paths.modules.stylus.sprite
          }
        }
      }
    }
  };

  return gulp.src(paths.base.src + paths.patterns.icons.all)
    .pipe(plugins.svgSprite(config))
    .pipe(gulp.dest(paths.base.www + paths.modules.icons.root))
    .pipe(plugins.livereload());
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
