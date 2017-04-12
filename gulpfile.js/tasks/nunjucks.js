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
const env = require('../modules/env');
const error = require('../modules/error');
const utils = require('../modules/utils');


/**
 * Compile HTML Templates
 */

function compileHTMLTemplates() {
  const exclude = path.normalize('!**/{' + paths.patterns.nunjucks.html.exclude.join(',') + '}');

  return gulp.src([paths.base.src + paths.patterns.nunjucks.html.views, exclude])
  // Fix pipe on error
  .pipe(plugins.plumber({errorHandler: error.handle}))
  // Adding data to Nunjucks
  .pipe(plugins.data(() => {
    return JSON.parse(fs.readFileSync(paths.base.src + paths.patterns.data.common));
  }))
  .pipe(plugins.nunjucksRender({
    path: [paths.base.src + paths.modules.nunjucks.html.root]
  }))
  .pipe(gulp.dest(paths.base.www));
}


/**
 * Compile JS Templates
 */

function compileJSTemplates() {
  const exclude = path.normalize('!**/{' + paths.patterns.nunjucks.js.exclude.join(',') + '}');

  return gulp.src([paths.base.src + paths.patterns.nunjucks.js.all, exclude])
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.init({loadMaps: true})
      )
    )
    .pipe(plugins.nunjucks.precompile())
    .pipe(plugins.replace('partials\\', 'partials/'))
    .pipe(plugins.concat('templates.js'))
    .pipe(
      plugins.if(
        env.isDevelopment(),
        plugins.sourcemaps.write('.')
      )
    )
    .pipe(gulp.dest(paths.base.www + paths.modules.js.vendor));
}


/**
 * Compile function
 */

const processAppTemplates = gulp.parallel(
  // Skip HTML Nunjucks according to config
  config.enabled.nunjucks.html ? compileHTMLTemplates : utils.noop,
  // Skip JS Nunjucks according to config
  config.enabled.nunjucks.js ? compileJSTemplates : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  process: processAppTemplates,
  // Skip HTML Nunjucks according to config
  html: config.enabled.nunjucks.html ? compileHTMLTemplates : utils.noop,
  // Skip JS Nunjucks according to config
  js: config.enabled.nunjucks.js ? compileJSTemplates : utils.noop
};


/**
 * Gulp nunjucks task
 */

processAppTemplates.displayName = 'nunjucks';
processAppTemplates.description = 'Compiles and generate Nunjucks JS and HTML templates. JS templates are precompiled into `/js/vendor/templates.js`.';
processAppTemplates.flags = {
  '--development': 'Builds CSS and JS sourcemaps.',
  '--staging': 'Doesn\'t build CSS and JS sourcemaps.',
  '--production': 'Doesn\'t build CSS and JS sourcemaps.'
};
gulp.task(processAppTemplates);
