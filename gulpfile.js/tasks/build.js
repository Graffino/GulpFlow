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
const bump = require('../tasks/bump');
const clean = require('../tasks/clean');
const critical = require('../tasks/critical');
const compress = require('../tasks/compress');
const copy = require('../tasks/copy');
const fonts = require('../tasks/fonts');
const js = require('../tasks/js');
const lint = require('../tasks/lint');
const minify = require('../tasks/minify');
const nunjucks = require('../tasks/nunjucks');
const optimize = require('../tasks/optimize');
const sprite = require('../tasks/sprite');
const stylus = require('../tasks/stylus');
const watch = require('../tasks/watch');
const wordpress = require('../tasks/wordpress');
const externals = require('../tasks/externals');
const composer = require('../tasks/composer');

/**
 * Build for development
 */

const buildDevelopment = gulp.series(
  gulp.parallel(
    bower.process,
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
  wordpress.process,
  externals.copy,
  composer.install,
  bump.write,
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
  wordpress.process,
  externals.copy,
  composer.install,
  bump.write
);


/**
 * Build for production
 */

const buildProduction = gulp.series(
  clean.app,
  gulp.parallel(
    bower.process,
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
      minify.app,
      optimize.app,
      critical.process,
      clean.postproduction,
      wordpress.process,
      externals.copy,
      composer.install,
      bump.write
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
  app: buildApp,
  development: buildDevelopment,
  staging: buildStaging,
  production: buildProduction
};

/**
 * Gulp build tasks
 */

// Auto
buildApp.displayName = 'build';
buildApp.description = 'Builds the project.';
buildApp.flags = {
  '--env development': 'Compliles project and enters watch mode. No optimisations or minifications takes place.',
  '--env staging': 'Compliles project, in the same way as development, without entering watch mode.',
  '--env production': 'Builds in production mode (minification, image optimisation, cleanup).'
};
gulp.task(buildApp);

// Development
buildDevelopment.displayName = 'build:development';
buildDevelopment.description = 'Compliles project and enters watch mode. No optimisations or minifications takes place.';
gulp.task('build:development', buildDevelopment);

// Staging
buildStaging.displayName = 'build:staging';
buildStaging.description = 'Compliles project, in the same way as development, without entering watch mode.';
gulp.task('build:staging', buildStaging);

// Production
buildProduction.displayName = 'build:production';
buildProduction.description = 'Builds in production mode (minification, image optimisation, cleanup).';
gulp.task('build:production', buildProduction);

// Default task
gulp.task('default', buildApp);
