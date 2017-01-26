//
// Gulp config file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Global config
 */

var config = {
    // Enable modernizr
    modernizr: false,
    // Critical CSS generation
    critical: false,
    // Wordpress
    wordpress: false,
    // Fonts conversion
    fonts: false,
    // Data folder
    data: false,
    // Media folder
    media: false,
    // Library folder
    lib: false,

    // JS templates
    nunjucks: {
        js: false
    },

    // PostCSS versions
    postcss: {
        browsers: 'last 2 versions'
    },

    // Sourcemaps
    sourcemaps: {
        css: false,
        js: false
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


/*
 * Export module config
 */

module.exports = config;
