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

// Node requires
const fs = require('fs');

// Gulp & plugins
const gulp = require('gulp');
const util = require('gulp-util');
const HubRegistry = require('gulp-hub');

// Gulpfile booting message
util.log(util.colors.green('Starting to Gulp! Please wait...'));

// Load files into the registry
const hub = new HubRegistry(['tasks/*.js']);

// Tell gulp to use the loaded tasks
gulp.registry(hub);

// Kill Gulp on CTRL+C
process.on('SIGINT', () => {
  util.log(util.colors.green('Terminating Gulp: (╯°□°）╯︵ ┻━┻  dlnƃ'));

  // Remove PID file
  try {
    fs.unlinkSync('gulpfile.js/gulp.pid');
  } catch (err) { }

  // Kill process
  process.kill(process.pid, 'SIGKILL');
});
