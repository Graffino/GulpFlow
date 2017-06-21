'use strict';

/**
 * Gulp Nunjucks file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const fs = require('fs');
const path = require('path');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const error = require('../modules/error');
const utils = require('../modules/utils');


/**
 * Compile HTML Templates
 */

function compileHTMLTemplates() {
  const exclude = path.normalize('!**/{' + paths.patterns.nunjucks.exclude.join(',') + '}');

  return gulp.src([paths.base.src + paths.patterns.nunjucks.views, exclude])
  // Fix pipe on error
  .pipe(plugins.plumber({errorHandler: error.handle}))
  // Adding data to Nunjucks
  .pipe(plugins.data(() => {
    return JSON.parse(fs.readFileSync(paths.base.src + paths.patterns.data.common));
  }))
  .pipe(plugins.nunjucksRender({
    path: [paths.base.src + paths.modules.nunjucks.root]
  }))
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Compile function
 */

const processAppTemplates = gulp.parallel(
  // Skip HTML Nunjucks according to config
  config.enabled.nunjucks ? compileHTMLTemplates : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.nunjucks ? compileHTMLTemplates : utils.noop
};


/**
 * Gulp nunjucks task
 */

processAppTemplates.displayName = 'nunjucks';
processAppTemplates.description = 'Compiles and generate Nunjucks HTML templates.';
gulp.task(processAppTemplates);
