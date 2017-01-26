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
var config = require('./config');
var env = require('./env');
var error = require('./error');
var paths = require('./paths');
var notice = require('./notice');


/**
 * Minify JS
 */

function minifyJS() {
    return gulp.src(paths.build.js + 'main.js')
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.init()
            )
        )
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(
            plugins.if(
                // Create sourcemaps according to config
                config.enabled.sourcemaps.js,
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
        .pipe(
            plugins.if(
                // Create sourcemaps according to config
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.postcss([csswring]))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(
            plugins.if(
                // Create sourcemaps according to config
                config.enabled.sourcemaps.css,
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
    if (env.isDevelopment() && config.enabled.notice) {
        return notice.send('Image minification skipped due to environment (--env develop)');
    }

    var minifyConfig = {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        plugins: [
            imageminSvgo({
                removeViewBox: false
            }),
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

    return gulp.src(paths.patterns.imagesBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.imagemin(minifyConfig))
        .pipe(gulp.dest(paths.build.images));
}


/**
 * Minify function
 */

var minifyApp = gulp.parallel(
    // Minify Images according to config
    config.enabled.minify.img ? minifyImages : plugins.util.noop,

    // Minify JS according to config
    config.enabled.minify.js ? minifyJS : plugins.util.noop,

    // Minify CSS according to config
    config.enabled.minify.css ? minifyCSS : plugins.util.noop,

    // Minify HTML according to config
    config.enabled.minify.html ? minifyHTML : plugins.util.noop
);


/**
 * Export module functions
 */

module.exports = {
    // Minify Images according to config
    images: config.enabled.minify.img ? minifyImages : plugins.util.noop,

    // Minify JS according to config
    js: config.enabled.minify.js ? minifyJS : plugins.util.noop,

    // Minify CSS according to config
    css: config.enabled.minify.css ? minifyCSS : plugins.util.noop,

    // Minify HTML according to config
    html: config.enabled.minify.html ? minifyHTML : plugins.util.noop,

    app: minifyApp
};
