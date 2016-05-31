//
// Gulp build file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var gulp    = require('gulp');
var env     = require('./env');
var bundle  = require('./bundle');
var clean   = require('./clean');
var compile = require('./compile');
var copy    = require('./copy');
var lint    = require('./lint');
var inject  = require('./inject');
var minify  = require('./minify');
var notice  = require('./notice');


/**
 * Build for development
 */

var buildDevelopment = gulp.series(
    gulp.parallel (
        lint.app,
        bundle.deps
    ),
    copy.app,
    gulp.parallel (
        bundle.fonts,
        gulp.series (
            compile.app,
            bundle.app
        )
    ),
    notice.finished
);


/**
 * Build for staging
 */

var buildStaging = gulp.series(
    clean.app,
    gulp.parallel (
        bundle.deps
    ),
    copy.app,
    gulp.parallel (
        bundle.fonts,
        gulp.series (
            compile.app,
            bundle.app
        )
    )
);


/**
 * Build for production
 */

var buildProduction = gulp.series(
    clean.app,
    gulp.parallel (
        lint.app,
        bundle.deps
    ),
    copy.app,
    gulp.parallel (
        bundle.fonts,
        gulp.series (
            compile.app,
            bundle.app,
            minify.app
        )
    ),
    inject.critical,
    clean.production
);


/**
 * Build according to environment
 */

var build = function(cb) {
    if ( env.isProduction() ) { return buildProduction(cb); }
    else if (env.isDevelopment()) { return buildDevelopment(cb); }
    else { return buildStaging(cb); }
};


/**
 * Export module functions
 */

module.exports = {
    app: build
};
