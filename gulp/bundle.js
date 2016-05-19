//
// Gulp bundle file
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
    pattern       : ['gulp-*', 'gulp.*', 'autoprefixer', 'postcss*', 'event-stream', 'stylint*', 'main-bower-files*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');

/**
 * Bower functions
 */

// Update bower
function updateBower() {
    return gulp.src(paths.root, { read: false })
        .pipe(plugins.exec('bower install && bower prune'))
        .pipe(plugins.exec.reporter());
}

// Update bower
function compileBower() {

    var jsFiles = plugins.filter('**/*.js', { restore: true });
    var cssFiles = plugins.filter('**/*.css', { restore: true });

    return gulp.src(plugins.mainBowerFiles({
            includeDev: true,
            includeSelf: true,
            debugging: env.NODE_DEBUG
        }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(cssFiles)
        .pipe(plugins.groupConcat({'bower.css': '**/*.css'}))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.cssLib))
        .pipe(cssFiles.restore)
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(jsFiles)
        .pipe(plugins.groupConcat({ 'bower.js': '**/*.js' }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Compile modernizr files
 */

function compileModernizr() {
    var config = {
        cache: true,
        crawl: false,
        uglify: false,
        devFile: false,
        options: [
            'setClasses'
        ],
        tests: [
            'canvas', 'fullscreen', 'hiddenscroll', 'history','htmlimports',
            'input', 'inputtypes','requestanimationframe', 'svg', 'touchevents',
            'geolocation', 'appearance', 'backgroundblendmode',
            'backgroundcliptext', 'csscalc', 'csscolumns', 'cssfilters', 'flexbox',
            'flexboxlegacy', 'flexwrap', 'cssinvalid', 'cssmask',
            'csspointerevents', 'csspositionsticky', 'cssreflections',
            'csstransitions', 'cssvhunit', 'cssvmaxunit', 'cssvminunit',
            'cssvwunit', 'willchange', 'placeholder', 'sizes',
            'srcset', 'svgasimg', 'svgfilters','svgclippaths', 'videoautoplay'
        ]
    };
    return gulp.src(paths.source.jsMain)
        .pipe(plugins.modernizr(config))
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Bundle JS
 */

function bundleJS() {
    return gulp.src(paths.patterns.jsBuild)
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.groupConcat({ 'main.js': '**/*.js' }))
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
 * Bundle CSS
 */

function bundleCSS() {
    return gulp.src(paths.patterns.cssBuild)
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.groupConcat({ 'main.css': '**/*.css' }))
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
 * Bundle dependencies function
 */

var bundleDeps = gulp.parallel(
    gulp.series(
        updateBower,
        compileBower
    ),
    compileModernizr
);


/**
 * Bundle JS/CSS function
 */

var bundleApp = gulp.parallel(
    bundleJS,
    bundleCSS
);


/**
 * Export module functions
 */

module.exports = {
    update: updateBower,
    compile: compileBower,
    modernizr: compileModernizr,
    deps: bundleDeps,
    js: bundleJS,
    css: bundleCSS,
    app: bundleApp
};
