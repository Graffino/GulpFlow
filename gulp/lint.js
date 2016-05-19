//
// Gulp lint file
// Author: Graffino (http://www.graffino.com)
//

'use strict';

/**
 * Module imports
 */

// Gulp
var gulp = require('gulp');

// Environment
var env = require('./env');

// Node modules
var plugins = require('gulp-load-plugins')({
    DEBUG         : env.NODE_DEBUG,
    pattern       : ['gulp-*', 'gulp.*', 'stylint*', 'jshint*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');


/**
 * Lint javascript files
 */

function lintJS() {
    return gulp.src(paths.patterns.jsSource)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter());
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
        .pipe(plugins.stylint(config))
        .pipe(plugins.stylint.reporter())
        .pipe(plugins.stylint.reporter('fail', { failOnWarning: true }));
}


/**
 * Lint HTML files
 */

function lintHTML() {
    return gulp.src(paths.patterns.htmlSource)
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
