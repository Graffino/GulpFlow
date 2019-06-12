'use strict';

/**
 * Gulp sprite file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Compile Stylus packages
 */

function compileSprite() {
  // JS SRC
  const excludeIcons = paths.patterns.icons.exclude.map(
    item => '!' + path.normalize(paths.base.src + paths.modules.icons.root + '**/' + item)
  );
  const filesIcons = [path.normalize(paths.base.src + paths.patterns.icons.all)];
  const src = filesIcons.concat(excludeIcons);

  return gulp.src(src)
    .pipe(plugins.svgSprite(config.modules.sprite))
    .pipe(gulp.dest(paths.base.www + paths.modules.icons.root));
}


/**
 * Inject Sprite
 */

function injectSprite() {
  const src = [path.normalize(paths.base.src + paths.patterns.icons.injectTemplate)];
  return gulp.src(src)
    .pipe(
      plugins.inject(
        gulp.src([
          paths.base.www + paths.modules.icons.root + 'sprite-symbols.svg'
        ]), {
          transform: (filePath, file) => {
            return file.contents.toString('utf8');
          }
        },
      ),
    )
    .pipe(gulp.dest(paths.base.src + paths.modules.nunjucks.root + 'layouts'));
}

/**
 * Process Sprite
 */

const processSprite = gulp.series(
  config.enabled.sprite.compile ? compileSprite : utils.noop,
  config.enabled.sprite.inject ? injectSprite : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: processSprite,
  compile: config.enabled.sprite.compile ? compileSprite : utils.noop,
  inject: config.enabled.sprite.inject ? injectSprite : utils.noop
};


/**
 * Gulp Sprite task
 */

processSprite.displayName = 'sprite';
processSprite.description = 'Generates SVG sprite `/icons/sprite.svg` and `/stylus/vendor/sprite.styl` files. Configuration options are available in `config.js`.';
gulp.task(processSprite);
