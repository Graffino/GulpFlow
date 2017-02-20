/**
 * Gulp watch file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Node requires
var debounce = require('debounce');

// Gulp requries
var notice = require('../modules/notice');
var paths = require('../modules/paths');

// Gulp tasks
var bower = require('../tasks/bower');
var modernizr = require('../tasks/modernizr');
var js = require('../tasks/js');
var fonts = require('../tasks/fonts');
var nunjucks = require('../tasks/nunjucks');
var sprite = require('../tasks/sprite');
var stylus = require('../tasks/stylus');
var clean = require('../tasks/clean');
var copy = require('../tasks/copy');
var bundle = require('../tasks/bundle');
var wordpress = require('../tasks/wordpress');
var lint = require('../tasks/lint');


/**
 * Watch for changes
 */

function watch() {
  // Gulp watch issue, must use debounce with gulp.series to work around it:
  // https://github.com/gulpjs/gulp/issues/1304

  // Live reload listen
  plugins.livereload.listen();

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
  );

  // JS Templates
  gulp.watch(
    [paths.patterns.jsTemplatesSource],
    debounce(
      gulp.series([
        bundle.templates,
        bundle.js,
        notice.rebuilt
      ]),
    500)
  );

  // HTML Templates
  gulp.watch(
    [paths.patterns.htmlTemplatesSource],
    debounce(
      gulp.series([
        lint.html,
        bundle.templates,
        bundle.js,
        notice.rebuilt
      ]),
    500)
  );

  // Stylus
  gulp.watch(
    [paths.patterns.stylusSource, paths.source.stylusMain],
    debounce(
      gulp.series([
        lint.stylus,
        compile.stylus,
        bundle.css,
        notice.rebuilt
      ]),
    500)
  );

  // Fonts
  gulp.watch(
    paths.patterns.fontsSource,
    debounce(
      gulp.series(
        copy.fonts,
        gulp.parallel(
          bundle.fonts,
          gulp.series(
            compile.stylus,
            bundle.css,
            notice.rebuilt
          )
        )
      ),
    2000)
  );

  // Media
  gulp.watch(
    [paths.source.media],
    debounce(
      gulp.series(
        copy.media,
        notice.rebuilt
      ),
    200)
  );

  // Images
  gulp.watch(
    [paths.source.images, paths.source.svg],
    debounce(
      gulp.series(
        copy.images,
        minify.images,
        notice.rebuilt
      ),
    2000)
  );

  // Sprite
  gulp.watch(
    paths.patterns.spriteSource,
    debounce(
      gulp.series([
        copy.images,
        compile.sprite,
        compile.stylus,
        bundle.css,
        notice.rebuilt
      ]),
    2000)
  );

  // Lib
  gulp.watch(
    paths.patterns.libSource,
    debounce(
      gulp.series([
        copy.lib,
        notice.rebuilt
      ]),
    2000)
  );

  // Data
  gulp.watch(
    paths.patterns.dataSource,
    debounce(
      gulp.series([
        copy.data,
        notice.rebuilt
      ]),
    2000)
  );

  // Wordpress
  gulp.watch(
    paths.patterns.themeSource,
    debounce(
      gulp.series([
        wordpress.copy,
        notice.rebuilt
      ]),
    2000)
  );
}


/**
 * Serve app
 */

var serveApp = gulp.series(
  build.app,
  notice.watching,
  watch
);


/**
 * Watch app
 */

var watchApp = gulp.series(
  notice.watching,
  watch
);


/**
 * Export module functions
 */

module.exports = {
  serve: serveApp,
  watch: watchApp
};
