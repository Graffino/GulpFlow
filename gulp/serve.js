//
// Gulp serve file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Node requires
var debounce = require('debounce');

// Gulp requries
var build = require('./build');
var bundle = require('./bundle');
var compile = require('./compile');
var copy = require('./copy');
var lint = require('./lint');
var minify = require('./minify');
var notice = require('./notice');
var paths = require('./paths');


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
        debounce(
            gulp.series([
                lint.js,
                copy.js,
                bundle.js,
                notice.rebuilt
            ]),
        500)
    );

    // Handlebars
    gulp.watch(
        [paths.patterns.handlebarsHelpersSource, paths.patterns.handlebarsModulesSource, paths.patterns.handlebarsPartialsSource],
        debounce(
            gulp.series([
                bundle.handlebars,
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

    // HTML
    gulp.watch(
        paths.patterns.htmlSource,
        debounce(
            gulp.series([
                lint.html,
                copy.html,
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
