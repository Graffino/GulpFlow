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
var copy = require('../tasks/copy');
var fonts = require('../tasks/fonts');
var js = require('../tasks/js');
var lint = require('../tasks/lint');
var modernizr = require('../tasks/modernizr');
var nunjucks = require('../tasks/nunjucks');
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
  bundle.process,
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
  bundle.process,
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
  bundle.process,
//  minify.app,
//  critical.process,
//  clean.postproduction,
  wordpress.process
);


/**
 * Build according to environment
 */

var buildApp = function (cb) {
  var buildType;
  if (env.isProduction()) {
    buildType = buildProduction(cb);
  } else if (env.isDevelopment()) {
    buildType = buildDevelopment(cb);
  } else {
    buildType = buildStaging(cb);
  }
  return buildType;
};


/**
 * Export module functions
 */

module.exports = {
  app: buildApp
};

/**
 * Gulp build task
 */

gulp.task('default', buildApp);
gulp.task('build', buildApp);
