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
var notice = require('./notice');


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
    // Lint JS according to config
    config.lint.js ? lintJS : notice.silent,

    // Lint CSS according to config
    config.lint.js ? lintStylus : notice.silent,

    // Lint HTML according to config
    config.lint.html ? lintHTML : notice.silent,
);

/**
 * Export module functions
 */

module.exports = {
    // Lint JS according to config
    js: config.lint.js ? lintJS : notice.silent,

    // Lint CSS according to config
    stylus: config.lint.js ? lintStylus : notice.silent,

    // Lint HTML according to config
    html: config.lint.html ? lintHTML : notice.silent,

    app: lintApp
};
