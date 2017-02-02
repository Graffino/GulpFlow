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


/**
 * Bower functions
 */

// Update bower
function updateBower() {
    return gulp.src(paths.root, {read: false})
        .pipe(plugins.exec('bower install && bower prune'))
        .pipe(plugins.exec.reporter());
}

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
 * Compile modernizr files
 */

function compileModernizr() {
    var configModernizr = {
        cache: true,
        crawl: false,
        uglify: false,
        devFile: false,
        options: [
            'setClasses'
        ],
        tests: [
            'canvas', 'fullscreen', 'hiddenscroll', 'history', 'htmlimports',
            'input', 'inputtypes', 'requestanimationframe', 'svg', 'touchevents',
            'geolocation', 'appearance', 'backgroundblendmode',
            'backgroundcliptext', 'csscalc', 'csscolumns', 'cssfilters', 'flexbox',
            'flexboxlegacy', 'flexwrap', 'cssinvalid', 'cssmask',
            'csspointerevents', 'csspositionsticky', 'cssreflections',
            'csstransitions', 'cssvhunit', 'cssvmaxunit', 'cssvminunit',
            'cssvwunit', 'willchange', 'placeholder', 'sizes',
            'srcset', 'svgasimg', 'svgfilters', 'svgclippaths', 'videoautoplay'
        ]
    };
    return gulp.src(paths.source.jsMain)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.modernizr(configModernizr))
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Complile Nunjucks Templates
 */

// Partials
function compileTemplatesStatic() {
    return gulp.src(paths.patterns.htmlViewsSource)
    // Fix pipe on error
    .pipe(plugins.plumber({errorHandler: error.handle}))
    // Adding data to Nunjucks
    .pipe(plugins.data(function () {
        return JSON.parse(fs.readFileSync(paths.patterns.dataSourceSingle));
    }))
    .pipe(plugins.nunjucksRender({
        path: [paths.source.htmlTemplates]
    }))
    .pipe(gulp.dest(paths.build.htmlTemplates));
}

// Modules (Templates)
function compileTemplates() {
    return gulp.src(paths.patterns.jsViewsSource)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.nunjucks.precompile())
        .pipe(plugins.replace('partials\\', 'partials/'))
        .pipe(plugins.concat('templates.js'))
        .pipe(
            // Create sourcemaps according to config
            plugins.if(
                config.enabled.sourcemaps.js,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.jsTemplates));
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
 * ConvertFonts
 */

 // WOFF
function convertFontsWOFF() {
    return gulp.src(paths.patterns.fontsBuildTTF)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(plugins.ttf2woff())
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(plugins.livereload());
}

// WOFF2
function convertFontsWOFF2() {
    return gulp.src(paths.patterns.fontsBuildTTF)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
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
    update: updateBower,

    compile: compileBower,

    // Skip Modernizr according to config
    modernizr: config.enabled.modernizr ? compileModernizr : utils.noop,

    // Skip Fonts according to config
    fonts: config.enabled.fonts ? bundleFonts : utils.noop,

    deps: bundleDeps,

    templates: bundleTemplates,

    js: bundleJS,

    css: bundleCSS,

    app: bundleApp
};
