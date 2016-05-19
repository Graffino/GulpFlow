//
// Gulp bump file
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

// Node plugins
var plugins = require('gulp-load-plugins')({
    DEBUG         : env.NODE_DEBUG,
    pattern       : ['gulp-*', 'gulp.*', 'autoprefixer', 'postcss*', 'event-stream', 'imagemin*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});


/**
 * Global bump function
 */

function bump(type) {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.bump({type: type }))
        .pipe(gulp.dest('./'))
        .pipe(plugins.git.commit('Bump app to ' + type + ' version.'));
}


// Major (v x.0.0)
function bumpMajor() {
    return bump('major');
}

// Minor (v 0.x.0)
function bumpMinor() {
    return bump('minor');
}

// Patch (v 0.0.x)
function bumpPatch() {
    return bump('patch');
}


/**
 * Export module functions
 */

module.exports = {
    major: bumpMajor,
    minor: bumpMinor,
    patch: bumpPatch,
    default: bumpPatch
};
