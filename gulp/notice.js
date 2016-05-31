//
// Gulp notice file
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
