/**
 * Gulp build file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var copy = require('../modules/copy');
var clean = require('../modules/clean');


gulp.task('default', copy.app);

gulp.task('clean', clean.app);
