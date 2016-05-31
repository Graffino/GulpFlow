//
// Gulp inject file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var gulp  = require('gulp');
var env   = require('./env');
var paths = require('./paths');

// Gulp plugins
var plugins = require('gulp-load-plugins')({ DEBUG: env.NODE_DEBUG });


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
