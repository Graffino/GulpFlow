'use strict';

/**
 * Gulp index file
 * Author: Graffino (http://www.graffino.com)
 */

/*
  index.js
  ===========
  Gulp tasks live in the `gulpfile.js/tasks` folder and get automatically
  required below.

  gulpfile.js/tasks/default.js is run when you calling `gulp`.
*/


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var HubRegistry = require('gulp-hub');

/* Load files into the registry */
  var hub = new HubRegistry(['tasks/*.js']);

/* Tell gulp to use the loaded tasks */
gulp.registry(hub);
