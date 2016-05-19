//
// Gulp copy file
// Author: Graffino (http://www.graffino.com)
//

'use strict';

/**
 * Module imports
 */

// Gulp
var gulp = require('gulp');

// Paths
var paths = require('./paths');


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
    return gulp.src(paths.patterns.htmlSource).pipe(gulp.dest(paths.build.html));
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
    app: copyApp
};
