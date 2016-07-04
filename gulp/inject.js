//
// Gulp inject file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var paths = require('./paths');


/**
 * Inject critical CSS
 */

function criticalCSS() {
    var critical = require('critical').stream;

    return gulp.src(paths.patterns.html)
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
    critical: criticalCSS
};
