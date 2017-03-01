'use strict';

/**
 * Gulp lightouse file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


// Gulp requires
var paths = require('../modules/paths');


/**
 * Run lighthouse
 */

function lighthouseRun() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('mkdir ./tests/lighthouse/report'))
    .pipe(plugins.exec('lighthouse ' + paths.base.url + ' --output-path=./tests/lighthouse/report/index.html --save-assets'))
    .pipe(plugins.exec.reporter());
}


/**
 * Generate report
 */

var generateReport = gulp.series(
  lighthouseRun
);


/**
 * Export module functions
 */

module.exports = {
  report: generateReport
};


/**
 * Gulp lighthouse task
 */

generateReport.displayName = 'lighthouse';
generateReport.description = 'Generates lightouse report in `./tests/lighthouse`.';
gulp.task(generateReport);
