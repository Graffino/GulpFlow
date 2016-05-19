//
// Gulp clean file
// Author: Graffino (http://www.graffino.com)
//

'use strict';

/**
 * Module imports
 */

// Gulp
var gulp = require('gulp');

// Environment
var env = require('./env');

// Node modules
var plugins = require('gulp-load-plugins')({
    DEBUG         : env.NODE_DEBUG,
    pattern       : ['del*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');


/**
 * Global clean function
 */

function clean(toClean) {
    return plugins.del(toClean).then(paths => {
        if (env.isDebug()) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
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
    app: cleanApp
};
