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
        .pipe(plugins.notify('Gulp flow has finished.'));
}

// Rebuilt
function rebuilt() {
    return gulp.src(paths.root)
        .pipe(plugins.notify('Application has been re-built.'));
}


/**
 * Export handler
 */

module.exports = {
    send: sendNotice,
    finished: finished,
    rebuilt: rebuilt
};
