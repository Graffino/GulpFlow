'use strict';

/**
 * Gulp build file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const env = require('../modules/env');
const notice = require('../modules/notice');

// Gulp tasks
const bower = require('../tasks/bower');
const bundle = require('../tasks/bundle');
const clean = require('../tasks/clean');
const critical = require('../tasks/critical');
const compress = require('../tasks/compress');
const copy = require('../tasks/copy');
const fonts = require('../tasks/fonts');
const js = require('../tasks/js');
const lint = require('../tasks/lint');
const minify = require('../tasks/minify');
const modernizr = require('../tasks/modernizr');
const nunjucks = require('../tasks/nunjucks');
const optimize = require('../tasks/optimize');
const sprite = require('../tasks/sprite');
const stylus = require('../tasks/stylus');
const watch = require('../tasks/watch');
const wordpress = require('../tasks/wordpress');
const composer = require('../tasks/composer');
const patternlab = require('../tasks/patternlab');

/**
 * Build for development
 */

const buildDevelopment = gulp.series(
  gulp.parallel(
    bower.process,
    modernizr.process,
    js.process,
    fonts.process,
    nunjucks.process,
    gulp.series(
      sprite.process,
      stylus.process
    ),
    copy.app
  ),
  bundle.app,
  patternlab.process,
  wordpress.process,
  composer.install,
  lint.app,
  watch.app,
  notice.finished
);


/**
 * Build for staging
 */

const buildStaging = gulp.series(
  clean.app,
  gulp.parallel(
    bower.process,
    modernizr.process,
    js.process,
    fonts.process,
    nunjucks.process,
    gulp.series(
      sprite.process,
      stylus.process
    ),
    copy.app
  ),
  bundle.app,
  patternlab.process,
  wordpress.process,
  composer.install
);


/**
 * Build for production
 */

const buildProduction = gulp.series(
  clean.app,
  gulp.parallel(
    bower.process,
    modernizr.process,
    js.process,
    fonts.process,
    nunjucks.process,
    gulp.series(
      sprite.process,
      stylus.process
    ),
    copy.app
  ),
  gulp.parallel(
    compress.app,
    gulp.series(
      bundle.app,
      optimize.app,
      minify.app,
      critical.process,
      clean.postproduction,
      patternlab.process,
      wordpress.process,
      composer.install
    )
  )
);


/**
 * Build according to environment
 */

const buildApp = function (done) {
  if (env.isProduction()) {
    buildProduction();
  } else if (env.isDevelopment()) {
    buildDevelopment();
  } else {
    buildStaging();
  }
  done();
};


/**
 * Export module functions
 */

module.exports = {
  app: buildApp
};

/**
 * Gulp build tasks
 */

buildApp.displayName = 'build';
buildApp.description = 'Builds the project.';
buildApp.flags = {
  '--development': 'Compliles project and enters watch mode. No optimisations or minifications takes place.',
  '--staging': 'Compliles project, in the same way as development, without entering watch mode.',
  '--production': 'Builds in production mode (minification, image optimisation, cleanup).'
};
gulp.task(buildApp);
gulp.task('default', buildApp);
