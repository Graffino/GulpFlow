//
// Gulp lint file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var error = require('./error');
var paths = require('./paths');


/**
 * Lint javascript files
 */

function lintJS() {
    return gulp.src(paths.patterns.jsSource)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.xo());
}


/**
 * Lint stylus files
 */

function lintStylus() {
    var config = {
        config: '.stylintrc',
        reporter: 'stylint-stylish',
        reporterOptions: {
            verbose: true
        }
    };
    return gulp.src(paths.patterns.stylusSource)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.stylint(config))
        .pipe(plugins.stylint.reporter());
}


/**
 * Lint HTML files
 */

function lintHTML() {
    return gulp.src([paths.patterns.htmlTemplatesSource])
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.htmlhint('.htmlhintrc'))
        .pipe(plugins.htmlhint.reporter('htmlhint-stylish'));
}

/**
 * Lint function
 */

var lintApp = gulp.parallel(
    lintJS,
    lintStylus,
    lintHTML
);

/**
 * Export module functions
 */

module.exports = {
    js: lintJS,
    stylus: lintStylus,
    html: lintHTML,
    app: lintApp
};
