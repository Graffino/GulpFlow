//
// Gulp serve file
// Author: Graffino (http://www.graffino.com)
//

'use strict';


/**
 * Module imports
 */

// Gulp
var gulp    = require('gulp');

// Environment
var env     = require('./env');

// Node plugins
var plugins = require('gulp-load-plugins')({
    DEBUG         : env.NODE_DEBUG,
    pattern       : ['gulp-*', 'gulp.*', 'debounce'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths   = require('./paths');

// Modules
var build   = require('./build');
var bundle  = require('./bundle');
var compile = require('./compile');
var copy    = require('./copy');
var lint    = require('./lint');
var minify  = require('./minify');


/**
 * Watch for changes
 */

function watchApp() {
    // Gulp watch issue, must use debounce with gulp.series to work around it:
    // https://github.com/gulpjs/gulp/issues/1304

    // Live reload listen
    plugins.livereload.listen();

    // JS
    gulp.watch(
        paths.patterns.jsSource,
        plugins.debounce(
            gulp.series([
                lint.js,
                copy.js,
                bundle.js
            ]),
        500)
    );

    // Stylus
    gulp.watch(
        [paths.patterns.stylusSource, paths.source.stylusMain],
        plugins.debounce(
            gulp.series([
                lint.stylus,
                compile.stylus,
                bundle.css
            ]),
        500)
    );

    // Fonts
    gulp.watch(
        paths.patterns.fontsSource,
        plugins.debounce(
            gulp.series(
                copy.fonts,
                compile.stylus,
                bundle.css
            ),
        2000)
    );

    // Images
    gulp.watch(
        [paths.source.images, paths.source.svg],
        plugins.debounce(
            gulp.series(
                copy.images,
                minify.images
            ),
        2000)
    );

    // Sprite
    gulp.watch(
        paths.patterns.spriteSource,
        plugins.debounce(
            gulp.series([
                copy.images,
                compile.sprite,
                compile.stylus,
                bundle.css
            ]),
        2000)
    );

    // HTML
    gulp.watch(
        paths.patterns.htmlSource,
        plugins.debounce(
            gulp.series([
                lint.html,
                copy.html
            ]),
        2000)
    );
}


/**
 * Serve app
 */

var serveApp = gulp.series(
    build.app,
    watchApp
);


/**
 * Export module functions
 */

module.exports = {
    app: serveApp
};
