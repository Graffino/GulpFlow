'use strict';

/**
 * Gulp config
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Base paths
 */

const base = {
  // Root
  root: './',
  // Source
  src: './src/',
  // Build
  www: './www/',

  // Vendor
  vendor: 'vendor/',

  // Wordpress
  wordpress: 'wordpress/',

  // URL
  url: 'http://gulpflow.dev'
};


/**
 * Language paths
 */

const languages = [
  base.www + 'ro/',
  base.www + 'en/'
];


/**
 * Module paths
 */

const modules = {
  // Cascading Stylesheets
  css: {
    root: 'css/',
    common: 'css/common/',
    modules: 'css/modules/',
    vendor: 'css/vendor/',

    // App file
    app: 'css/common/app.css',

    // App file
    main: 'css/main.css'
  },

  // Javascript
  js: {
    root: 'js/',
    common: 'js/common/',
    modules: 'js/modules/',
    vendor: 'js/vendor/',

    // App file
    app: 'js/common/app.js',

    // Main file
    main: 'js/main.js'
  },

  // Stylus
  stylus: {
    root: 'stylus/',
    common: 'stylus/common/',
    modules: 'stylus/modules/',

    // App main file
    app: 'stylus/app.styl',

    // Icons sprite
    sprite: 'stylus/vendor/sprite.styl',
    mustache: 'stylus/vendor/sprite-template.hbs'
  },

  // Sprite icons
  icons: {
    root: 'icons/'
  },

  // Images
  images: {
    root: 'images/',
    svgs: 'images/svgs/'
  },

  // Fonts
  fonts: {
    root: 'fonts/'
  },

  // Media
  media: {
    root: 'media/'
  },

  // Nunjucks HTML Templates
  nunjucks: {
    // HTML Templates
    html: {
      root: 'html/',
      views: 'html/views/',
      partials: 'html/partials/'
    },
    // Javascript Templates
    js: {
      root: 'js/templates/',
      views: 'js/templates/views/',
      partials: 'js/templates/views/partials/'
    }
  },

  // JSON Data
  data: {
    root: 'data/',
    common: 'data/common.json'
  },

  // Static
  static: {
    root: 'static/'
  },

  // Vedor
  vendor: {
    root: base.root + base.vendor
  },

  // Wordpress
  wordpress: {
    root: base.root + base.wordpress,
    theme: base.root + base.wordpress + 'theme/'
  }
};


/**
 * File patterns
 */

const patterns = {
  // Cascading Stylesheets
  css: {
    all: modules.css.root + '**/*.css',
    exclude: [
      'main*.css'
    ]
  },

  // Javascripts
  js: {
    all: modules.js.root + '**/*.js',
    common: modules.js.common + '**/*.js',
    modules: modules.js.modules + '**/*.js',
    exclude: [
      'main*.js'
    ]
  },

  // Stylus
  stylus: {
    all: modules.stylus.root + '**/*.styl',
    exclude: [
      'sprite.styl'
    ]
  },

  // Icons
  icons: {
    all: modules.icons.root + '**/*.svg'
  },

  // Images
  images: {
    all: modules.images.root + '**/*.+(jpg|jpeg|png|svg|gif|ico)',
    svgs: modules.images.svgs + '*.svg',
    static: '*.+(jpg|jpeg|png|svg|gif|ico)'
  },

  // Fonts
  fonts: {
    all: modules.fonts.root + '**/*.+(ttf|woff|woff2)',
    ttf: modules.fonts.root + '**/*.ttf',
    woff: modules.fonts.root + '**/*.woff',
    woff2: modules.fonts.root + '**/*.woff2'
  },

  // Media
  media: {
    all: modules.media.root + '**/*.+(webm|mp4|mp3|pdf|doc)'
  },

  // HTML Files
  html: {
    all: '**/*.html'
  },

  // Nunjucks HTML Templates
  nunjucks: {
    html: {
      all: modules.nunjucks.html.root + '**/*.+(html|njk|nunjucks)',
      views: modules.nunjucks.html.views + '**/*.+(html|njk|nunjucks)',
      partials: modules.nunjucks.html.partials + '**/*.+(html|njk|nunjucks)',
      exclude: [
        'macros'
      ]
    },
    js: {
      all: modules.nunjucks.js.root + '**/*.+(njk|nunjucks)',
      views: modules.nunjucks.js.views + '**/*.+(njk|nunjucks)',
      exclude: [
        'macros'
      ]
    }
  },

  // Data
  data: {
    all: modules.data.root + '**/*.json',
    common: modules.data.root + 'common.json'
  },

  // Static
  static: {
    all: modules.static.root + '**/*',
    clean: [
      base.www + '.htaccess',
      base.www + 'favicon.ico',
      base.www + 'humans.txt',
      base.www + 'pin-icon.svg',
      base.www + 'robots.txt',
      base.www + 'social.png',
      base.www + 'touch-icon*.png'
    ],
    exclude: [
      '_readme.md'
    ]
  },

  // Vendor
  vendor: {
    all: modules.vendor.root + '**/*',
    exclude: [
      '_readme.md'
    ]
  },

  // Theme
  wordpress: {
    all: modules.wordpress.theme + '**/*',
    clean: [
      base.www + 'includes',
      base.www + 'partials',
      base.www + 'inc/theme',
      base.www + 'inc/admin/*.*',
      base.www + 'inc/admin/classes',
      base.www + 'inc/admin/config',
      base.www + 'inc/admin/template-parts',
      base.www + 'inc/admin/vendor',
      base.www + '*.php',
      base.www + 'screenshot.png',
      base.www + 'style.css'
    ],
    exclude: [
      '_readme.md',
      'admin/theme',
      'admin/theme/**'
    ]
  }
};


/*
 * Export modules paths
 */

module.exports = {
  base,
  languages,
  modules,
  patterns
};
