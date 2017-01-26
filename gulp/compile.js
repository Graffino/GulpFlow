//
// Gulp compile file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Node requires
var autoprefixer = require('autoprefixer');
var postcssQuantityQueries = require('postcss-quantity-queries');

// Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Gulp requires
var config = require('./config');
var error = require('./error');
var paths = require('./paths');


/**
 * Compile stylus files
 */

function compileStylus() {
    var processors = [
        // Autoprefixer options according to config
        autoprefixer(config.module.autoprefixer),
        plugins.combineMq,
        postcssQuantityQueries
    ];

    return gulp.src(paths.source.stylusMain)
        // Fix pipe on error
        .pipe(plugins.plumber({errorHandler: error.handle}))
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.init({loadMaps: true})
            )
        )
        .pipe(plugins.stylus())
        .pipe(plugins.postcss(processors))
        // Create sourcemaps according to config
        .pipe(
            plugins.if(
                config.enabled.sourcemaps.css,
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.cssBase));
}


/**
 * Compile sprite
 */

function compileSprite() {
    var configSprite = {
        shape: {
            // Set a default padding between elements
            spacing: {
                padding: 2
            }
        },
        mode: {
            css: {
                bust: false,
                prefix: 'svg-',
                dest: '',
                common: '',
                sprite: 'sprite.svg',
                mixin: 'sprite',
                render: {
                    styl: {
                        template: paths.stylusMustache,
                        dest: '../../../' + paths.stylusSprite
                    }
                }
            }
        }
    };

    return gulp.src(paths.patterns.spriteSource)
        .pipe(plugins.svgSprite(configSprite))
        .pipe(gulp.dest(paths.build.images))
        .pipe(plugins.livereload());
}


/**
 * Compile function
 */

var compileApp = gulp.series(
    compileSprite,
    compileStylus
);


/**
 * Export module functions
 */

module.exports = {
    stylus: compileStylus,
    sprite: compileSprite,
    app: compileApp
};
