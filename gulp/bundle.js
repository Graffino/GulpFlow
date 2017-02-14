//
// Gulp bundle file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Node requires
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('./config');
var env = require('./env');
var error = require('./error');
var paths = require('./paths');
var utils = require('./utils');

// Update bower
function compileBower() {
    var jsFiles = plugins.filter(['**/*.js', '!**/*main*.js'], {restore: true});
    var cssFiles = plugins.filter(['**/*.css', '!**/*main*.css'], {restore: true});

    return gulp.src(mainBowerFiles({
        includeDev: true,
        includeSelf: true,
        debugging: env.NODE_DEBUG
    }))
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.init()
            )
        )
        .pipe(cssFiles)
        .pipe(plugins.groupConcat({'bower.css': '**/*.css'}))
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.cssLib))
        .pipe(cssFiles.restore)
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.init()
            )
        )
        .pipe(jsFiles)
        .pipe(plugins.groupConcat({'bower.js': '**/*.js'}))
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Bundle JS
 */

function bundleJS() {
    return gulp.src(paths.patterns.jsBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.order([
            '**/bower.js',
            '**/*.js'
        ]))
        .pipe(plugins.groupConcat({'main.js': ['**/*.js', '!**/*main*.js']}))
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.js))
        .pipe(plugins.livereload());
}


/**
 * Bundle CSS
 */

function bundleCSS() {
    return gulp.src(paths.patterns.cssBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.order([
            '**/bower.css',
            '**/*.css'
        ]))
        .pipe(plugins.groupConcat({'main.css': ['**/*.css', '!**/*main*.css']}))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.css))
        .pipe(plugins.livereload());
}


/**
 * Bundle templates function
 */

var bundleTemplates = gulp.parallel(
    // Skip Nunjucks JS Templates according to config
    config.enabled.nunjucks.js ? compileTemplates : utils.noop,

    // Skip Nunjucks HTML Templates according to config
    config.enabled.nunjucks.html ? compileTemplatesStatic : utils.noop
);


/**
 * Bundle dependencies function
 */

var bundleDeps = gulp.parallel(
    gulp.series(
        updateBower,
        compileBower
    ),

    // Skip Modernizr according to config
    config.enabled.modernizr ? compileModernizr : utils.noop
);


/**
 * Bundle JS/CSS function
 */

var bundleApp = gulp.parallel(
    gulp.series(
        bundleTemplates,
        bundleJS
    ),
    bundleCSS
);


/**
 * Export module functions
 */

module.exports = {
    compile: compileBower,

    deps: bundleDeps,

    templates: bundleTemplates,

    js: bundleJS,

    css: bundleCSS,

    app: bundleApp
};
