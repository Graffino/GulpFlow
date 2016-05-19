//
// Gulp compile file
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
    pattern       : ['gulp-*', 'gulp.*', 'autoprefixer', 'postcss*', 'event-stream', 'stylint*'],
    replaceString : /^gulp(-|\.)/,
    camelize      : true
});

// Paths
var paths = require('./paths');


/**
 * Compile stylus files
 */

function compileStylus() {
    var processors = [
        plugins.autoprefixer({ browsers: ['last 2 versions'] }),
        plugins.combineMq,
        plugins.postcssQuantityQueries
    ];

    return gulp.src(paths.source.stylusMain)
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
        // TODO: Unknow error here
        //.pipe(gulp.dest(paths.build.cssMain));
        .pipe(gulp.dest(paths.build.cssLib));
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
