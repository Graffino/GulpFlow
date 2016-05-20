//
// Gulp minify file
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

// Node plugins
var plugins = require('gulp-load-plugins')({
    DEBUG         : env.NODE_DEBUG,
    pattern       : ['gulp-*', 'gulp.*', 'autoprefixer', 'postcss*', 'event-stream', 'imagemin*', 'csswring*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');

// Environment
var env = require('./env');


/**
 * Minify JS
 */

function minifyJS() {
    return gulp.src(paths.build.js + 'main.js')
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.js))
        .pipe(plugins.livereload());
}


/**
 * Minify CSS
 */

function minifyCSS() {
    return gulp.src(paths.build.css + 'main.css')
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.postcss([plugins.csswring]))
        .pipe(plugins.rename({ suffix: '.min'}))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.css))
        .pipe(plugins.livereload());
}

/**
 * Minify HTML
 */

function minifyHTML() {
    return gulp.src(paths.patterns.htmlBuild)
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        // Replace with minifed CSS/JS versions
        .pipe(plugins.replace('main.js', 'main.min.js'))
        .pipe(plugins.replace('main.css', 'main.min.css'))
        .pipe(gulp.dest(paths.build.html))
        .pipe(plugins.livereload());
}


/**
 * Minify images
 */

function minifyImages() {
    var config;

    // Use development config according to env
    if (env.isDevelopment()) {
        config = {
            optimizationLevel: 0,
            progressive: false,
            interlaced: false
        };
    // Use production config according to env
    } else {
        config = {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [
                plugins.imageminPngquant({
                    quality: '65-80',
                    speed: 4
                }),
                plugins.imageminMozjpeg({
                    quality: '80',
                    progressive: true,
                }
            )]
        };
    }

    return gulp.src(paths.patterns.imagesBuild)
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.build.images));

        // TODO: Figure out if reloading all images is really needed each time
        // something changes
        // .pipe(plugins.livereload());
}


/**
 * Minify function
 */

var minifyApp = gulp.parallel(
    minifyImages,
    minifyJS,
    minifyCSS,
    minifyHTML
);


/**
 * Export module functions
 */

module.exports = {
    js: minifyJS,
    css: minifyCSS,
    html: minifyHTML,
    images: minifyImages,
    app: minifyApp
};
