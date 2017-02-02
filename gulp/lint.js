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
var config = require('./config');
var error = require('./error');
var paths = require('./paths');
var utils = require('./utils');


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
    var configStylus = {
        config: '.stylintrc',
        reporter: 'stylint-stylish',
        reporterOptions: {
            verbose: true
        }
    };
    return gulp.src(paths.patterns.stylusSource)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.stylint(configStylus))
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
    // Lint JS according to config
    config.enabled.lint.js ? lintJS : utils.noop,

    // Lint CSS according to config
    config.enabled.lint.js ? lintStylus : utils.noop,

    // Lint HTML according to config
    config.enabled.lint.html ? lintHTML : utils.noop
);

/**
 * Export module functions
 */

module.exports = {
    // Lint JS according to config
    js: config.enabled.lint.js ? lintJS : utils.noop,

    // Lint CSS according to config
    stylus: config.enabled.lint.js ? lintStylus : utils.noop,

    // Lint HTML according to config
    html: config.enabled.lint.html ? lintHTML : utils.noop,

    app: lintApp
};
