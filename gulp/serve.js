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
var config = require('./config');
var build = require('./build');
var bundle = require('./bundle');
var compile = require('./compile');
var copy = require('./copy');
var lint = require('./lint');
var minify = require('./minify');
var notice = require('./notice');
var paths = require('./paths');
var wordpress = require('./wordpress');


/**
 * Start listening
 */

function startListening() {
    return plugins.livereload.listen();
}


/**
 * Watch JS
 */

function watchJS() {
    return gulp.watch(
        [paths.patterns.jsSource],
        debounce(
            gulp.series([
                lint.js,
                copy.js,
                bundle.js,
                notice.rebuilt
            ]),
        500)
    );
}


/**
 * Watch JS Templates
 */

function watchJSTemplates() {
    return gulp.watch(
        [paths.patterns.jsTemplatesSource],
        debounce(
            gulp.series([
                bundle.templates,
                bundle.js,
                notice.rebuilt
            ]),
        500)
    );
}


/**
 * Watch HTML
 */

function watchHTML() {
    return gulp.watch(
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
}


/**
 * Watch Stylus
 */

function watchStylus() {
    return gulp.watch(
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
}

/**
 * Watch Fonts
 */

function watchFonts() {
    return gulp.watch(
        [paths.patterns.fontsSource],
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
}


/**
 * Watch Media
 */

function watchMedia() {
    return gulp.watch(
        [paths.source.media],
        debounce(
            gulp.series(
                copy.media,
                notice.rebuilt
            ),
        200)
    );
}


/**
 * Watch Images
 */

function watchImages() {
    return gulp.watch(
        [paths.source.images, paths.source.svg],
        debounce(
            gulp.series(
                copy.images,
                minify.images,
                notice.rebuilt
            ),
        2000)
    );
}


/**
 * Watch Sprite
 */

function watchSprite() {
    return gulp.watch(
        [paths.patterns.spriteSource],
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
}


/**
 * Watch Lib
 */

function watchLib() {
    return gulp.watch(
        [paths.patterns.libSource],
        debounce(
            gulp.series([
                copy.lib,
                notice.rebuilt
            ]),
        2000)
    );
}


/**
 * Watch Data
 */

function watchData() {
    return gulp.watch(
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
 * Watch Wordpress
 */

function watchWordpress() {
    return gulp.watch(
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
 * Watch app
 */

var watchApp = gulp.series(
    // Live reload listen
    startListening,
    gulp.parallel(
        watchJS,

        // Watch JS Templates according to config
        config.nunjucks.js ? watchJSTemplates : notice.silent,

        watchHTML,

        watchStylus,

        // Watch Fonts according to config
        config.fonts ? watchFonts : notice.silent,

        // Watch Media according to config
        config.media ? watchMedia : notice.silent,

        watchImages,

        watchSprite,

        // Watch Lib according to config
        config.lib ? watchLib : notice.silent,

        // Watch data according to config
        config.data ? watchData : notice.silent,

        // Watch Wordpress according to config
        config.wordpress ? watchWordpress : notice.silent
    )
);


/**
 * Serve app
 */

var serveApp = gulp.series(
    build.app,
    notice.watching,
    watchApp
);


/**
 * Export module functions
 */

module.exports = {
    app: serveApp
};
