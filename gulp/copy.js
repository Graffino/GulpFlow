//
// Gulp copy file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('./config');
var paths = require('./paths');


/**
 * Copy javascript
 */

function copyJS() {
    return gulp.src(paths.patterns.jsSource).pipe(gulp.dest(paths.build.js));
}


/**
 * Copy JS Templates
 */

function copyJsTemplates() {
    return gulp.src(paths.patterns.jsTemplatesSource).pipe(gulp.dest(paths.build.jsTemplates));
}


/**
 * Copy fonts
 */

function copyFonts() {
    return gulp.src(paths.patterns.fontsSource).pipe(gulp.dest(paths.build.fonts));
}


/**
 * Copy media
 */

function copyMedia() {
    return gulp.src(paths.patterns.mediaSource).pipe(gulp.dest(paths.build.media));
}


/**
 * Copy images
 */

function copyImages() {
    return gulp.src(paths.patterns.imagesSource).pipe(gulp.dest(paths.build.images));
}


/**
 * Copy Lib
 */

function copyLib() {
    return gulp.src(paths.patterns.libSource)
        .pipe(gulp.dest(paths.build.lib))
        .pipe(plugins.livereload());
}


/**
 * Copy Data
 */

function copyData() {
    return gulp.src(paths.patterns.dataSource)
        .pipe(gulp.dest(paths.build.data))
        .pipe(plugins.livereload());
}


/**
 * Copy Miscellaneous
 */

function copyMiscellaneous() {
    var toCopy = [
        paths.root + 'humans.txt',
        paths.root + 'LICENSE',
        paths.root + 'robots.txt',
        paths.root + '.htaccess',
        paths.root + 'index.html'
    ];

    return gulp.src(toCopy).pipe(gulp.dest(paths.www));
}

/**
 * Copy function
 */

var copyApp = gulp.parallel(
    copyJS,

    // Skip Nunjucks JS Templates according to config
    config.enabled.nunjucks.js ? copyJsTemplates : plugins.util.noop,

    // Skip Fonts according to config
    config.enabled.fonts ? copyFonts : plugins.util.noop,

    // Skip Media folder according to config
    config.enabled.media ? copyMedia : plugins.util.noop,

    copyImages,

    // Skip Lib folder according to config
    config.enabled.lib ? copyLib : plugins.util.noop,

    // Skip Data folder according to config
    config.enabled.data ? copyData : plugins.util.noop,

    copyMiscellaneous
);


/**
 * Export module functions
 */

module.exports = {
    js: copyJS,

    // Skip Fonts according to config
    fonts: config.enabled.fonts ? copyFonts : plugins.util.noop,

    // Skip Media folder according to config
    media: config.enabled.media ? copyMedia : plugins.util.noop,

    images: copyImages,

    // Skip Nunjucks JS Templates according to config
    jsTemplates: config.enabled.nunjucks.js ? copyJsTemplates : plugins.util.noop,

    // Skip Lib folder according to config
    lib: config.enabled.lib ? copyLib : plugins.util.noop,

    // Skip Data folder according to config
    data: config.enabled.data ? copyData : plugins.util.noop,

    app: copyApp
};
