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
var env = require('./env');
var error = require('./error');
var paths = require('./paths');


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
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(cssFiles)
        .pipe(plugins.groupConcat({'bower.css': '**/*.css'}))
        .pipe(
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.cssLib))
        .pipe(cssFiles.restore)
        .pipe(
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init()
            )
        )
        .pipe(jsFiles)
        .pipe(plugins.groupConcat({'bower.js': '**/*.js'}))
        .pipe(
            plugins.if(
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
        .pipe(plugins.modernizr(config))
        .pipe(gulp.dest(paths.build.jsLib));
}


/**
 * Complile Nunjucks Templates
 */

// Partials
function compileTemplatesStatic() {
    return gulp.src(paths.patterns.htmlPagesSource)
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
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.nunjucks.precompile())
        .pipe(plugins.concat('templates.js'))
        .pipe(
            plugins.if(
                env.isDevelopment(),
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
            plugins.if(
                env.isDevelopment(),
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
        .pipe(plugins.plumber({errorHandler: error.handle}))
        .pipe(
            plugins.if(
                env.isDevelopment(),
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.order([
            '**/bower.css',
            '**/*.css'
        ]))
        .pipe(plugins.groupConcat({'main.css': ['**/*.css', '!**/*main*.css']}))
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
    compileTemplates,
    compileTemplatesStatic
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
    modernizr: compileModernizr,
    fonts: bundleFonts,
    deps: bundleDeps,
    templates: bundleTemplates,
    js: bundleJS,
    css: bundleCSS,
    app: bundleApp
};
