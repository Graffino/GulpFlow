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
var config = require('./config');
var paths = require('./paths');
var utils = require('./utils');


/**
 * Copy wp
 */

function copyWP() {
    var toReturn;
    if (config.enabled.wordpress) {
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
    // Copy Wordpress according to config
    copy: config.enabled.wordpress ? copyWP : utils.noop
};
