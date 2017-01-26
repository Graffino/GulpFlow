//
// Gulp build file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var config = require('./config');
var env = require('./env');
var bundle = require('./bundle');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');
var lint = require('./lint');
var inject = require('./inject');
var minify = require('./minify');
var notice = require('./notice');
var wordpress = require('./wordpress');


/**
 * Build for development
 */

var buildDevelopment = gulp.series(
    gulp.parallel(
        lint.app,
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

    // Skip Wordpress according to config
    config.wordress ? wordpress.copy : notice.silent,

    notice.finished
);


/**
 * Build for staging
 */

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

    // Skip Wordpress according to config
    config.wordress ? wordpress.copy : notice.silent
);


/**
 * Build for production
 */

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

    // Skip Critical CSS according to config
    config.critical ? inject.critical : notice.silent,

    clean.production,

    // Skip Wordpress according to config
    config.wordress ? wordpress.copy : notice.silent
);


/**
 * Build according to environment
 */

var build = function (cb) {
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
    app: build
};
