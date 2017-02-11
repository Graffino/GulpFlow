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

var requireDir = require('require-dir');

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', {recurse: true});
