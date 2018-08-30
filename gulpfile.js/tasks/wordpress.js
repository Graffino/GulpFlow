'use strict';

/**
 * Gulp wordpress file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const syncy = require('syncy');

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Copy Wordpress
 */

function copyWordpress(done) {
  const excludeSync = paths.patterns.wordpress.excludeSync.map(item => '!' + item);
  const pathsToCopy = [paths.patterns.wordpress.all].concat(excludeSync);
  syncy(
    pathsToCopy,
    paths.base.www,
    {
      verbose: false,
      base: paths.modules.wordpress.theme,
      updateAndDelete: false
    }
  )
    .then(() => {
      done();
    })
    .catch(err => {
      done(error);
    });
}


/**
 * Link Wordpress Admin
 */

function linkAdmin() {
  const options = {
    cwd: '../../../../../'
  };

  return gulp.src(
    paths.modules.wordpress.theme + 'inc/admin/theme/www',
    options
  )
    .pipe(gulp.symlink('../../../../../' + paths.base.www + 'inc/admin/theme'));
}


/**
 * Process Wordpress function
 */

const processWordpress = gulp.series(
  config.enabled.wordpress.theme ? copyWordpress : utils.noop,
  config.enabled.wordpress.admin ? linkAdmin : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  // Copy Wordpress according to config
  process: processWordpress,
  copy: config.enabled.wordpress.theme ? copyWordpress : utils.noop,
  admin: config.enabled.wordpress.admin ? linkAdmin : utils.noop
};


/**
 * Gulp wordpress task
 */

processWordpress.displayName = 'wordpress';
processWordpress.description = 'Copies all Wordpress theme files into the build folder.';
gulp.task(processWordpress);
