//
// Gulp config file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Imports
 */

// Gulp requires
var paths = require('./paths');


/**
 * Global config
 */

var config = {
    // Languages
    languages: [
        'ro',
        'en'
    ]
};


/**
 * Global config
 */

config.enabled = {
    // Enable system notices
    notice: true,
    // Enable modernizr
    modernizr: true,
    // Critical CSS generation
    critical: true,
    // Wordpress
    wordpress: true,
    // Fonts conversion
    fonts: true,
    // Data folder
    data: true,
    // Media folder
    media: true,
    // Library folder
    lib: true,

    // JS templates
    nunjucks: {
        js: true
    },

    // Sourcemaps
    sourcemaps: {
        css: true,
        js: true
    },

    // Lint
    lint: {
        css: true,
        js: true,
        html: true
    },

    // Minify
    minify: {
        css: true,
        js: true,
        img: true,
        html: true
    }
};


/**
 * Module config
 */

config.module = {
    // Autoprefixer versions
    autoprefixer: {
        browsers: 'last 2 versions'
    },

    // Critical
    critical: {
        base: './www/',
        inline: false,
        css: '/www/assets/css/main.css',
        minify: true,
        width: 2000,
        height: 2000,
        timeout: 1000 * 60 * 10
    }
};


/*
 * Export module config
 */

module.exports = config;
