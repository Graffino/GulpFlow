//
// Gulp paths file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Base paths
 */

var base = {
    // Root
    root: './',
    // Build
    www: './www/',
    // Assets
    assets: 'assets/',

    // Vendor
    vendor: 'vendor/',

    // HTML (default in root)
    html: '',

    // JSON data
    data: 'data/',

    // Wordpress theme
    theme: 'wordpress/theme/',

    // Gulp tasks
    gulp: './gulp'
};


/**
 * Assets paths
 */

var assets = {
    // CSS
    css: {
        root: base.assets + 'css/',
        common: base.assets + 'css/common/',
        vendor: base.assets + '/css/vendor/',

        // Main CSS file
        app: base.assets + 'css/common/app.css'
    },

    // Javascript
    js: {
        root: base.assets + 'js/',
        common: base.assets + 'js/common/',
        modules: base.assets + 'js/modules/',
        vendor: base.assets + 'js/vendor/',

        // App main file
        app: base.assets + 'js/common/app.js',

        // JS Templates
        templates: base.assets + 'js/templates/',
        views: base.assets + 'js/templates/views/',
        partials: base.assets + 'js/templates/views/partials/'
    },

    // Stylus
    stylus: {
        root: base.assets + 'stylus/',
        common: base.assets + 'stylus/common/',
        modules: base.assets + 'stylus/modules/',

        // App main file
        app: base.assets + 'stylus/common/app.styl',

        // Sprite
        sprite: base.assets + 'stylus/libs/sprite.styl',
        mustache: base.assets + 'stylus/libs/vendor/sprite-mustache.styl'
    },

    // Images
    images: {
        root: base.assets + 'images/',
        svgs: base.assets + 'images/svgs/',
        sprite: base.assets + 'images/sprite/'

    },

    // Fonts
    fonts: {
        root: base.assets + 'fonts/'
    },

    // Media
    media: {
        root: base.assets + 'media/'
    },

    // HTML Templates
    templates: {
        root: 'templates/',
        views: 'templates/views/',
        partials: 'templates/partials/'
    }
};


/**
 * File patterns
 */

var patterns = {
    // CSS
    css: {
        all: assets.css.root + '**/*.css',

        // Ignores
        ignore: {
            main: '!' + assets.css.root + 'main*.css'
        }
    },

    // Javascript
    js: {
        all: '**/*.js',
        templates: assets.js.templates + '**/*.+(njk|nunjucks)',
        views: assets.js.views + '**/*.+(njk|nunjucks)',

        // Ignores
        ignore: {
            vendor: '!' + assets.js.vendor,
            main: '!' + assets.js.root + 'main*.js'
        }
    },

    // Stylus
    stylus: {
        all: assets.stylus.root + '**/*.styl',

        // Ignores
        ignore: {
            mustache: assets.stylus.mustache
        }
    },

    // Images
    images: {
        all: assets.images.root + '**/*.+(jpg|jpeg|png|svg|gif|ico)',
        svgs: assets.images.svgs + '*.svg',
        sprite: assets.images.sprite + '*.svg'
    },

    // Fonts
    fonts: {
        all: assets.fonts.root + '**/*.+(ttf|woff|woff2)',
        ttf: assets.fonts.root + '**/*.ttf',
        woff: assets.fonts.root + '**/*.woff',
        woff2: assets.fonts.root + '**/*.woff2'
    },

    // Media
    media: {
        all: assets.media.root + '**/*.+(webm|mp4|mp3|pdf|doc)'
    },

    // HTML Templates
    templates: {
        all: assets.templates.root + '**/*.+(njk|nunjucks)',
        views: assets.templates.views + '**/*.+(njk|nunjucks)',
        partials: assets.templates.partials + '**/*.+(njk|nunjucks)'
    },

    // Vendor
    vendor: {
        all: base.vendor + '**/*'
    },

    // HTML
    html: {
        all: base.html + '**/*.html'
    },

    // Data
    data: {
        all: base.data + '**/*.json',
        common: base.data + '**/common.json'
    },

    // Theme
    theme: {
        all: base.theme + '**/*'
    }
};


/*
 * Export module paths
 */

module.exports = {
    base: base,
    assets: assets,
    patterns: patterns
};
