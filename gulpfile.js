//
// Gulp config file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');

// Modules
var inject = require('./gulp/inject');
var clean = require('./gulp/clean');
var bump = require('./gulp/bump');
var build = require('./gulp/build');
var serve = require('./gulp/serve');

/**
 * Fix for failed build on Graffino staging
 */

require('es6-promise').polyfill();


/**
* Gulp main tasks
*/

gulp.task('clean', clean.app);
gulp.task('build', build.app);
gulp.task('default', serve.app);


/**
* Gulp bump tasks
*/

gulp.task('bump', bump.patch);
gulp.task('bump:major', bump.major);
gulp.task('bump:minor', bump.minor);

/**
* Gulp inject taks
*/

// Critical CSS
gulp.task('critical', inject.critical);
