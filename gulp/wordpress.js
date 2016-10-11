//
// Gulp wordpress file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var env = require('./env');
var paths = require('./paths');


/**
 * Copy wp
 */

function copyWP() {
    var toReturn;
    if (env.isWP()) {
        toReturn = gulp.src(paths.patterns.themeSource).pipe(gulp.dest(paths.www));
    } else {
        toReturn = gulp.src('.');
    }
    return toReturn;
}


/**
 * Export module functions
 */

module.exports = {
    copy: copyWP
};
