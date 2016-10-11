//
// Gulp notice file
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
 * Notice handling
 */

// Send notice
function sendNotice(message) {
    return gulp.src(paths.root)
        .pipe(plugins.notify(message));
}

// Finished
function finished() {
    return gulp.src(paths.root)
        .pipe(plugins.notify('Application has been built.'));
}

// Watching
function watching() {
    return gulp.src(paths.root)
        .pipe(plugins.notify('Entering watch mode.'));
}

// Rebuilt
function rebuilt() {
    return gulp.src(paths.root)
        .pipe(plugins.notify('Detected changes have been applied. Entering watch mode.'));
}


/**
 * Export handler
 */

module.exports = {
    send: sendNotice,
    finished: finished,
    rebuilt: rebuilt,
    watching: watching
};
