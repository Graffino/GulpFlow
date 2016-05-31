//
// Gulp clean file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var gulp   = require('gulp');
var env    = require('./env');
var paths  = require('./paths');
var notice = require('./notice');

// Node requires
var del = require('del');


/**
 * Global clean function
 */

function clean(toClean) {
    return del(toClean).then(function(paths) {
        if (env.isDebug()) {
            notice.send('Deleted files and folders:\n', paths.join('\n'));
        }
    });
}


/**
 * Individual clean functions
 */

// Javascript
function cleanJS() {
    return clean(paths.build.js);
}

// CSS
function cleanCSS() {
    return clean(paths.build.css);
}

// Fonts
function cleanFonts() {
    return clean(paths.build.fonts);
}

// Images
function cleanImages() {
    return clean(paths.build.images);
}

// HTML
function cleanHTML() {
    return clean(paths.patterns.htmlBuild);
}

// Junk
function cleanJunk() {
    var toClean = [
        paths.root + '.DS_Store',
        paths.assets + '**/.DS_Store',
        paths.gulp + '**/.DS_Store',
        paths.www + '*',
        paths.www + '.*'
    ];

    // Send notices only on development
    if (env.isDevelopment()) {
        notice.send('Application staging folder has been cleaned.');
    }
    return clean(toClean);
}

// Postproduction
function cleanProduction() {
    var toClean = [
        paths.build.js + '**/*',
        '!' + paths.build.js + 'main.min.js',
        paths.build.css + '**/*',
        '!' + paths.build.css + 'main.min.css',
        paths.build.sprite,
    ];

    return clean(toClean);
}


/**
 * Clean function
 */

var cleanApp = gulp.parallel(
    cleanJS,
    cleanCSS,
    cleanFonts,
    cleanImages,
    cleanHTML,
    cleanJunk
);


/**
 * Export module functions
 */

module.exports = {
    js: cleanJS,
    css: cleanCSS,
    fonts: cleanFonts,
    images: cleanImages,
    html: cleanHTML,
    app: cleanApp,
    production: cleanProduction
};
