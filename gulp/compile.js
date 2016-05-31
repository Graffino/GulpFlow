//
// Gulp compile file
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
var autoprefixer = require ('autoprefixer');
var postcssQuantityQueries = require('postcss-quantity-queries');


/**
 * Compile stylus files
 */

function compileStylus() {
    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        plugins.combineMq,
        postcssQuantityQueries
    ];

    return gulp.src(paths.source.stylusMain)
        // Fix pipe on error
        .pipe(plugins.plumber({ errorHandler: error.handle }))
        // Create sourcemaps only if environment is development
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.init({ loadMaps: true })
            )
        )
        .pipe(plugins.stylus())
        .pipe(plugins.postcss(processors))
        .pipe(
            plugins.if (
                env.isDevelopment(),
                plugins.sourcemaps.write('.')
            )
        )
        .pipe(gulp.dest(paths.build.cssBase));
}


/**
 * Compile sprite
 */

function compileSprite() {
    var config = {
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
        .pipe(plugins.svgSprite(config))
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
