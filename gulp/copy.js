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
        paths.root + '.htaccess'
    ];

    return gulp.src(toCopy).pipe(gulp.dest(paths.www));
}

/**
 * Copy function
 */

var copyApp = gulp.parallel(
    copyJS,
    copyJsTemplates,
    copyFonts,
    copyMedia,
    copyImages,
    copyLib,
    copyData,
    copyMiscellaneous
);


/**
 * Export module functions
 */

module.exports = {
    js: copyJS,
    fonts: copyFonts,
    media: copyMedia,
    images: copyImages,
    jsTemplates: copyJsTemplates,
    lib: copyLib,
    data: copyData,
    app: copyApp
};
