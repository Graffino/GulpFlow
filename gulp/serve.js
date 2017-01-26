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
                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                        // Sent notice according to config
                        config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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

                // Sent notice according to config
                config.enabled.notice ? notice.rebuilt : plugins.util.noop
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
        config.enabled.nunjucks.js ? watchJSTemplates : plugins.util.noop,

        watchHTML,

        watchStylus,

        // Watch Fonts according to config
        config.enabled.fonts ? watchFonts : plugins.util.noop,

        // Watch Media according to config
        config.enabled.media ? watchMedia : plugins.util.noop,

        watchImages,

        watchSprite,

        // Watch Lib according to config
        config.enabled.lib ? watchLib : plugins.util.noop,

        // Watch data according to config
        config.enabled.data ? watchData : plugins.util.noop,

        // Watch Wordpress according to config
        config.enabled.wordpress ? watchWordpress : plugins.util.noop
    )
);


/**
 * Serve app
 */

var serveApp = gulp.series(
    build.app,

    // Sent notice according to config
    config.enabled.notice ? notice.watching : plugins.util.noop,

    watchApp
);


/**
 * Export module functions
 */

module.exports = {
    app: serveApp
};
