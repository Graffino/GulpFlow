/**
 * Gulp watch file
 * Author: Graffino (http://www.graffino.com)
 */


/* eslint
  unicorn/no-process-exit: 0
*/


/**
 * Module imports
 */

// Node requires
var path = require('path');
var debounce = require('debounce');
var browserSync = require('browser-sync').create();

// Gulp & plugins
var gulp = require('gulp');

// Gulp requries
var config = require('../config');
var notice = require('../modules/notice');
var paths = require('../modules/paths');
var utils = require('../modules/utils');

// Gulp tasks
var bower = require('../tasks/bower');
var bundle = require('../tasks/bundle');
var clean = require('../tasks/clean');
var copy = require('../tasks/copy');
var fonts = require('../tasks/fonts');
var js = require('../tasks/js');
var lint = require('../tasks/lint');
var nunjucks = require('../tasks/nunjucks');
var sprite = require('../tasks/sprite');
var stylus = require('../tasks/stylus');
var wordpress = require('../tasks/wordpress');

// Use to watch gulp itself
var firstRun = true;


/**
 * Watch for changes
 */

function watchChanges() {
  // Gulp watch issue, must use debounce with gulp.series to work around it:
  // https://github.com/gulpjs/gulp/issues/1304

  // Gulp already ran
  firstRun = false;

  // Init Browser Sync
  browserSync.init(config.modules.browsersync);

  // JS Common, Modules
  gulp.watch(
    [
      paths.base.src + paths.patterns.js.common,
      paths.base.src + paths.patterns.js.modules
    ],
    debounce(
      gulp.parallel([
        clean.js.common,
        clean.js.modules
      ]),
      gulp.series([
        js.process,
        bundle.js,
        lint.js,
        notice.rebuilt
      ]),
    500)
  ).on('change', browserSync.reload);

  // Nunjucks JS Templates
  gulp.watch(
    [paths.base.src + paths.patterns.nunjucks.js.all],
    debounce(
      gulp.series([
        nunjucks.js,
        bundle.js,
        notice.rebuilt
      ]),
    500)
  ).on('change', browserSync.reload);

  // Stylus
  gulp.watch(
    [
      paths.base.src + paths.patterns.stylus.all,
      path.normalize('!**/' + paths.patterns.stylus.exclude.join(','))
    ],
    debounce(
      gulp.series([
        stylus.process,
        bundle.css,
        lint.stylus,
        notice.rebuilt
      ]),
    500)
  );

  // Nunjucks HTML Templates
  gulp.watch(
    [paths.base.src + paths.patterns.nunjucks.html.all],
    debounce(
      gulp.series([
        clean.html,
        nunjucks.html,
        lint.html,
        notice.rebuilt
      ]),
    500)
  ).on('change', browserSync.reload);

  // Fonts
  gulp.watch(
    [paths.base.src + paths.patterns.fonts.all],
    debounce(
      gulp.series(
        clean.fonts,
        copy.fonts,
        fonts.process,
        notice.rebuilt
      ),
    2000)
  ).on('change', browserSync.reload);

  // Media
  gulp.watch(
    [paths.base.src + paths.patterns.media.all],
    debounce(
      gulp.series(
        copy.media,
        notice.rebuilt
      ),
    200)
  ).on('change', browserSync.reload);

  // Data
  gulp.watch(
    [paths.base.src + paths.patterns.data.all],
    debounce(
      gulp.series(
        clean.data,
        copy.data,
        notice.rebuilt
      ),
    200)
  ).on('change', browserSync.reload);

  // Static
  gulp.watch(
    [paths.base.src + paths.patterns.static.all],
    debounce(
      gulp.series(
        clean.static,
        copy.static,
        notice.rebuilt
      ),
    200)
  ).on('change', browserSync.reload);

  // Images
  gulp.watch(
    [paths.base.src + paths.patterns.images.all],
    debounce(
      gulp.series(
        clean.images,
        copy.images,
        notice.rebuilt
      ),
    2000)
  ).on('change', browserSync.reload);

  // Sprite icons
  gulp.watch(
    [paths.base.src + paths.patterns.icons.all],
    debounce(
      gulp.series([
        clean.icons,
        sprite.process,
        stylus.process,
        bundle.css,
        notice.rebuilt
      ]),
    2000)
  ).on('change', browserSync.reload);

  // Vendor
  gulp.watch(
    [paths.base.src + paths.patterns.vendor.all],
    debounce(
      gulp.series([
        clean.vendor,
        copy.vendor,
        notice.rebuilt
      ]),
    2000)
  ).on('change', browserSync.reload);

  // Wordpress
  gulp.watch(
    [paths.base.src + paths.patterns.wordpress.all],
    debounce(
      gulp.series([
        wordpress.process,
        notice.rebuilt
      ]),
    2000)
  ).on('change', browserSync.reload);

  // Bower
  gulp.watch(
    [paths.base.root + 'bower.json'],
    debounce(
      gulp.series([
        bower.process,
        bundle.js,
        bundle.css,
        notice.rebuilt
      ]),
    2000)
  ).on('change', browserSync.reload);

  // Gulp config
  gulp.watch(
    [paths.base.root + 'gulpfile.js/**/*.js'],
    gulp.series(['default'])
  );
}


/**
 * Watch app
 */

var watchApp = gulp.series(
  notice.watching,
  firstRun ? watchChanges : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  app: watchApp
};


/**
 * Gulp watch tasks
 */

gulp.task('watch', watchApp);
