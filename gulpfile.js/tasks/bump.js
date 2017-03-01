'use strict';

/**
 * Gulp bump file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


/**
 * Global bump function
 */

function bump(type) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({type: type}))
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


/**
 * Gulp bump tasks
 */

bumpPatch.displayName = 'bump:patch';
bumpPatch.description = 'Bumps `package.json` and `bower.json` patch version number (x.x.+1.)';
gulp.task(bumpPatch);
gulp.task('bump', bumpPatch);

bumpMinor.displayName = 'bump:minor';
bumpMinor.description = 'Bumps `package.json` and `bower.json` minor version number (x.+1.0.)';
gulp.task(bumpMinor);

bumpMajor.displayName = 'bump:major';
bumpMajor.description = 'Bumps `package.json` and `bower.json` major version number (x.+1.0.)';
gulp.task(bumpMajor);
