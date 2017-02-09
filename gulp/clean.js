//
// Gulp clean file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Node requires
var del = require('del');

// Gulp & plugins
var gulp = require('gulp');

// Gulp requires
var config = require('./config');
var env = require('./env');
var paths = require('./paths');
var notice = require('./notice');
var utils = require('./utils');


/**
 * Global clean function
 */

function clean(toClean) {
    return del(toClean).then(function (paths) {
        // Send notice according to environment and config
        if (env.isDebug() && config.enabled.notice) {
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

// Media
function cleanMedia() {
    return clean(paths.build.media);
}

// Images
function cleanImages() {
    return clean(paths.build.images);
}

// HTML
function cleanHTML() {
    return clean(paths.patterns.html);
}

// Bower
function cleanBower() {
    return clean('bower_components');
}

// Data
function cleanData() {
    return clean(paths.build.data);
}

// Miscellaneous
function cleanMiscellaneous() {
    var toClean = [
        paths.www + 'humans.txt',
        paths.www + 'LICENSE',
        paths.www + 'robots.txt',
        paths.www + '.htaccess',
        paths.www + 'assets',
        paths.www + 'admin',
        paths.www + 'includes',
        paths.www + 'partials',
        paths.www + '*.php',
        paths.www + '*.png',
        paths.www + '*.css'
    ];

    return clean(toClean);
}

// Junk
function cleanJunk() {
    var toClean = [
        paths.root + '**/.DS_Store'
    ];

    return clean(toClean);
}

// Postproduction
function cleanProduction() {
    var toClean;
    // Remove HTML files on production if Wordpress is enabled
    if (config.enabled.wordpress) {
        toClean = [
            paths.build.js + '**/*',
            '!' + paths.build.js + 'main.min.js',
            paths.build.css + '**/*',
            '!' + paths.build.css + 'main.min.css',
            paths.build.sprite,
            paths.www + '*.html'
        ];
    } else {
        toClean = [
            paths.build.js + '**/*',
            '!' + paths.build.js + 'main.min.js',
            paths.build.css + '**/*',
            '!' + paths.build.css + 'main.min.css',
            paths.build.sprite
        ];
    }

    return clean(toClean);
}


/**
 * Clean function
 */

var cleanApp = gulp.series(
    gulp.parallel(
        cleanJS,
        cleanCSS,
        cleanFonts,
        cleanMedia,
        cleanImages,
        cleanHTML,
        cleanBower,
        cleanData,
        cleanMiscellaneous,
        cleanJunk
    ),
    // Send notice according to environment and config
    env.isDevelopment() && config.enabled.notice ? notice.cleaned : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
    js: cleanJS,
    css: cleanCSS,
    fonts: cleanFonts,
    media: cleanMedia,
    images: cleanImages,
    html: cleanHTML,
    bower: cleanBower,
    data: cleanData,
    micscellaneous: cleanMiscellaneous,
    app: cleanApp,
    production: cleanProduction
};
