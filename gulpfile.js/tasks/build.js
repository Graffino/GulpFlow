/**
 * Gulp build file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var env = require('../modules/env');
var notice = require('../modules/notice');

// Gulp tasks
var bower = require('../tasks/bower');
var bundle = require('../tasks/bundle');
var clean = require('../tasks/clean');
var critical = require('../tasks/critical');
var copy = require('../tasks/copy');
var fonts = require('../tasks/fonts');
var js = require('../tasks/js');
var lint = require('../tasks/lint');
var minify = require('../tasks/minify');
var modernizr = require('../tasks/modernizr');
var nunjucks = require('../tasks/nunjucks');
var optimize = require('../tasks/optimize');
var sprite = require('../tasks/sprite');
var stylus = require('../tasks/stylus');
var watch = require('../tasks/watch');
var wordpress = require('../tasks/wordpress');


/**
 * Build for development
 */

var buildDevelopment = gulp.series(
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
  wordpress.process,
  lint.app,
  watch.app,
  notice.finished
);


/**
 * Build for staging
 */

var buildStaging = gulp.series(
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
  wordpress.process
);


/**
 * Build for production
 */

var buildProduction = gulp.series(
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
  optimize.app,
  bundle.app,
  minify.app,
  critical.process,
  clean.postproduction,
  wordpress.process
);


/**
 * Build according to environment
 */

var buildApp = function (done) {
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
