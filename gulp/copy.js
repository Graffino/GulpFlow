//
// Gulp copy file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var gulp  = require('gulp');
var env   = require('./env');
var paths = require('./paths');

// Gulp plugins
var plugins = require('gulp-load-plugins')({ DEBUG: env.NODE_DEBUG });


/**
 * Copy javascript
 */

function copyJS() {
    return gulp.src(paths.patterns.jsSource).pipe(gulp.dest(paths.build.js));
}

/**
 * Copy fonts
 */

function copyFonts() {
    return gulp.src(paths.patterns.fontsSource).pipe(gulp.dest(paths.build.fonts));
}


/**
 * Copy images
 */

function copyImages() {
    return gulp.src(paths.patterns.imagesSource).pipe(gulp.dest(paths.build.images));
}


/**
 * Copy HTML
 */

function copyHTML() {
    return gulp.src(paths.patterns.htmlSource)
        .pipe(gulp.dest(paths.build.html))
        .pipe(plugins.livereload());
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
    copyFonts,
    copyImages,
    copyHTML,
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
    images: copyImages,
    html: copyHTML,
    lib: copyLib,
    data: copyData,
    app: copyApp
};
