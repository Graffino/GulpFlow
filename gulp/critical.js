//
// Gulp critical CSS file
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
var config = require('./config');


/**
 * Critical CSS
 */

function criticalCSS() {
    var critical = require('critical').stream;

    return gulp.src(paths.www + '**/*.html')
        .pipe(critical(config.module.critical).on('error', function (err) {
            plugins.util.log(plugins.util.colors.red(err.message));
        }))
        .pipe(gulp.dest(paths.build.html));
}


/**
 * Export module functions
 */

module.exports = {
    // Skip Critical CSS according to config
    css: config.enabled.critical ? criticalCSS : plugins.util.noop
};
