//
// Gulp minify file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Node requires
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var imageminSvgo = require('imagemin-svgo');
var csswring = require('csswring');

// Gulp requires
var env = require('./env');
var error = require('./error');
var paths = require('./paths');


/**
 * Minify JS
 */

function minifyJS() {
    return gulp.src(paths.build.js + 'main.js')
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if(
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
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.postcss([csswring]))
        .pipe(plugins.rename({suffix: '.min'}))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if(
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
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true
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
            interlaced: false,
            plugins: [
                imageminSvgo({
                    removeViewBox: false
                }),
                imageminPngquant({
                    quality: '100',
                    speed: 10,
                    nofs: true
                }),
                imageminMozjpeg({
                    quality: '100',
                    fastcrush: true,
                    progressive: false,
                    dcScanOpt: 0,
                    notrellis: true,
                    notrellisDC: true,
                    noovershoot: true
                }
            )]
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
            plugins: [
                imageminPngquant({
                    quality: '65-80',
                    speed: 4
                }),
                imageminMozjpeg({
                    quality: '80',
                    progressive: true
                }
            )]
        };
    }

    return gulp.src(paths.patterns.imagesBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.build.images));
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
