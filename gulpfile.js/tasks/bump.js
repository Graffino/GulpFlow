'use strict';

/**
 * Gulp bump file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const fs = require('fs');
const path = require('path');
const semver = require('semver');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Global bump function
 */

function bump(type) {
  const pkg = utils.getPackageJSON();
  const bumpVersion = semver.inc(pkg.version, type);

  // Write new version to file
  fs.writeFileSync(path.normalize(paths.base.www + '/version.php'), bumpVersion);

  // Bump app
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({
      version: bumpVersion
    }))
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

// Write version file
function bumpWrite(done) {
  const pkg = utils.getPackageJSON();
  fs.writeFileSync(path.normalize(paths.base.www + '/version.php'), pkg.version);
  done();
}


/**
 * Export module functions
 */

module.exports = {
  major: bumpMajor,
  minor: bumpMinor,
  patch: bumpPatch,
  write: bumpWrite,
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

bumpWrite.displayName = 'bump:write';
bumpWrite.description = 'Writes version.php file with the version found in `package.json`';
gulp.task(bumpWrite);
