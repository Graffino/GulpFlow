//
// Gulp build file
// Author: Graffino (http://www.graffino.com)
//

'use strict';

/**
 * Module imports
 */

// Gulp
var gulp    = require('gulp');

// Environment
var env     = require('./env');

// Modules
var bundle  = require('./bundle');
var clean = require('./clean');
var compile = require('./compile');
var copy    = require('./copy');
var lint    = require('./lint');
var minify  = require('./minify');


/**
 * Build for development
 */

var buildDevelopment = gulp.series(
    gulp.parallel (
        lint.app,
        bundle.deps
    ),
    copy.app,
    compile.app,
    bundle.app
);


/**
 * Build for staging
 */

var buildStaging = gulp.series(
    gulp.parallel (
        bundle.deps
    ),
    copy.app,
    compile.app,
    bundle.app
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
    compile.app,
    bundle.app,
    minify.app
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
