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
var config = require('./config');
var paths = require('./paths');
var utils = require('./utils');


/**
 * Notice handling
 */

// Send notice
function sendNotice(message) {
    return gulp.src(paths.root)
        .pipe(plugins.notify(message));
}

// Cleaned
function cleaned() {
    return gulp.src(paths.root)
        .pipe(plugins.notify('Application staging (www) folder has been cleaned.'));
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
    send: config.enabled.notice ? sendNotice : utils.noop,
    cleaned: config.enabled.notice ? cleaned : utils.noop,
    finished: config.enabled.notice ? finished : utils.noop,
    rebuilt: config.enabled.notice ? rebuilt : utils.noop,
    watching: config.enabled.notice ? watching : utils.noop
};
