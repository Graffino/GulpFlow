//
// Gulp inject file
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
    pattern       : ['gulp-*', 'gulp.*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');


/**
 * Inject critical CSS
 */

function criticalCSS() {
    var critical = require('critical').stream;
    return gulp.src(paths.patterns.htmlBuild)
        .pipe(critical({
            base: paths.www,
            inline: true,
            minify: true,
            width: 1300,
            height: 900
        }))
        // Correct assets path
        .pipe(plugins.replace('../', 'assets/'))
        .pipe(gulp.dest(paths.build.html));
}


/**
 * Export module functions
 */

module.exports = {
    critical: criticalCSS,
};
