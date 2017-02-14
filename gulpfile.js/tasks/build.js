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
var webpack = require('../tasks/webpack');

/**
 * Build for development
 */

var buildDevelopment = gulp.series(
  webpack.develop,
  notice.finished
);


/**
 * Build for staging
 */
/*
var buildStaging = gulp.series(
  clean.app,
  gulp.parallel(
    bundle.deps
  ),
  copy.app,
  gulp.parallel(
    bundle.fonts,
    gulp.series(
      compile.app,
      bundle.app
    )
  ),
  wordpress.copy
);


/**
 * Build for production
 */
/*
var buildProduction = gulp.series(
  clean.app,
  gulp.parallel(
    lint.app,
    bundle.deps
  ),
  copy.app,
  gulp.parallel(
    bundle.fonts,
    gulp.series(
      compile.app,
      bundle.app,
      minify.app
    )
  ),
  inject.critical,
  clean.production,
  wordpress.copy
);


/**
 * Build according to environment
 */

var build = function (cb) {
  var buildType;
  if (env.isProduction()) {
    // buildType = buildProduction(cb);
  } else if (env.isDevelopment()) {
    buildType = buildDevelopment(cb);
  } else {
    // buildType = buildStaging(cb);
  }
  return buildType;
};


/**
 * Export module functions
 */

module.exports = {
  app: build
};

/**
 * Gulp build task
 */

gulp.task('default', buildDevelopment);
gulp.task('build', buildDevelopment);
