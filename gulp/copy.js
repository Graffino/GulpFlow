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
var notice = require('./notice');


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
        paths.root + '.htaccess'
    ];

    return gulp.src(toCopy).pipe(gulp.dest(paths.www));
}

/**
 * Copy function
 */

var copyApp = gulp.parallel(
    copyJS,

    // Skip Nunjucks JS Templates according to config
    config.nunjucks.js ? copyJsTemplates : notice.silent,

    // Skip Fonts according to config
    config.fonts ? copyFonts : notice.silent,

    // Skip Media folder according to config
    config.media ? copyMedia : notice.silent,

    copyImages,

    // Skip Lib folder according to config
    config.lib ? copyLib : notice.silent,

    // Skip Data folder according to config
    config.data ? copyData : notice.silent,

    copyMiscellaneous
);


/**
 * Export module functions
 */

module.exports = {
    js: copyJS,

    // Skip Fonts according to config
    fonts: config.fonts ? copyFonts : notice.silent,

    // Skip Media folder according to config
    media: config.media ? copyMedia : notice.silent,

    images: copyImages,

    // Skip Nunjucks JS Templates according to config
    jsTemplates: config.nunjucks.js ? copyJsTemplates : notice.silent,

    // Skip Lib folder according to config
    lib: config.lib ? copyLib : notice.silent,

    // Skip Data folder according to config
    data: config.data ? copyData : notice.silent,

    app: copyApp
};
