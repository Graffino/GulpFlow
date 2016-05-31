//
// Gulp bundle file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var gulp  = require('gulp');
var env   = require('./env');
var error = require('./error');
var paths = require('./paths');

// Gulp plugins
var plugins = require('gulp-load-plugins')({ DEBUG: env.NODE_DEBUG });

// Node requires
var mainBowerFiles = require('main-bower-files');


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
    var jsFiles = plugins.filter(['**/*.js', '!**/*main*.js'], { restore: true });
    var cssFiles = plugins.filter(['**/*.css', '!**/*main*.css'], { restore: true });

    return gulp.src(mainBowerFiles({
            includeDev: true,
            includeSelf: true,
            debugging: env.NODE_DEBUG
        }))
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
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
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(plugins.modernizr(config))
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Bundle Handlebars Templates
 */
//v 4.0.5
function bundleHandlebars() {
    return gulp.src(paths.patterns.handlebarsSource)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.handlebars({
            // This is required in order to compile handlebars with the right
            // version from package.json
            handlebars: require('handlebars')
        }))
        .pipe(plugins.wrap('Handlebars.template(<%= contents %>)'))
        .pipe(plugins.declare({
            namespace: 'graffino.template',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(plugins.concat('templates.js'))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.handlebars));
}


/**
 * Bundle JS
 */

function bundleJS() {
    return gulp.src(paths.patterns.jsBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.order([
            '**/bower.js',
            '**/*.js'
        ]))
        .pipe(plugins.groupConcat({ 'main.js': ['**/*.js', '!**/*main*.js'] }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.js))
        .pipe(plugins.livereload(true));
}


/**
 * Bundle CSS
 */

function bundleCSS() {
    return gulp.src(paths.patterns.cssBuild)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.order([
            '**/bower.css',
            '**/*.css'
        ]))
        .pipe(plugins.groupConcat({ 'main.css': ['**/*.css', '!**/*main*.css'] }))
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
 * ConvertFonts
 */

 // WOFF
function convertFontsWOFF() {
    return gulp.src(paths.patterns.fontsBuildTTF)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(plugins.ttf2woff())
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(plugins.livereload());
}

// WOFF2
function convertFontsWOFF2() {
    return gulp.src(paths.patterns.fontsBuildTTF)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        .pipe(plugins.ttf2woff2())
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(plugins.livereload());
}


/**
 * Bundle fonts function
 */

var bundleFonts = gulp.parallel(
    convertFontsWOFF,
    convertFontsWOFF2
);


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
    gulp.series(
        bundleHandlebars,
        bundleJS
    ),
    bundleCSS
);


/**
 * Export module functions
 */

module.exports = {
    update: updateBower,
    compile: compileBower,
    modernizr: compileModernizr,
    fonts: bundleFonts,
    deps: bundleDeps,
    handlebars: bundleHandlebars,
    js: bundleJS,
    css: bundleCSS,
    app: bundleApp
};
