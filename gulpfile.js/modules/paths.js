'use strict';

/**
 * Gulp config
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Node requires
const path = require('path');

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

  // Patternlab
  patternlab: 'patternlab/',

  // URL
  url: 'http://gulpflow.dev'
};


/**
 * Language paths
 */

const languages = [
  base.www + 'de/',
  base.www + 'en/'
];


/**
 * Copy CSS and JS to external folder
 */

const externals = {
  public: '../external/code/public/',
};


/**
 * Module paths
 */

const node = {
  modules: path.resolve(__dirname, '../../node_modules/'),
  bower: path.resolve(__dirname, '../../node_modules/bower/bin/')
};

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
    main: 'js/main.js',

    // Main minified file
    min: 'js/main.min.js'
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
    root: 'icons/',
    noSprite: 'icons/no-sprite/'
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
    root: 'html/',
    views: 'html/views/',
    partials: 'html/partials/'
  },

  // PHP
  php: {
    root: 'wordpress/theme/'
  },

  // PHP Composer
  composer: {
    root: [
      'inc/theme/',
      'inc/admin'
    ]
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
  },

  // Patternlab
  patternlab: {
    source: {
      root: base.src + base.patternlab,
      patterns: base.src + base.patternlab + '_patterns/',
      data: base.src + base.patternlab + '_data/',
      meta: base.src + base.patternlab + '_meta/',
      annotations: base.src + base.patternlab + '_annotations/',
      js: base.src + base.patternlab + 'js',
      images: base.src + base.patternlab + 'images',
      icons: base.src + 'icons/no-sprite',
      fonts: base.src + base.patternlab + 'fonts',
      css: base.src + base.patternlab + 'css/'
    },
    public: {
      root: base.www + base.patternlab,
      patterns: base.www + base.patternlab + 'patterns/',
      data: base.www + base.patternlab + 'styleguide/data/',
      annotations: base.www + base.patternlab + 'annotations/',
      styleguide: base.www + base.patternlab + 'styleguide/',
      js: base.www + base.patternlab + '/js',
      images: base.www + base.patternlab + 'images',
      icons: base.www + base.patternlab + 'icons',
      fonts: base.www + base.patternlab + 'fonts',
      css: base.www + base.patternlab + 'css'
    },
    patternExports: base.www + base.patternlab + 'pattern_exports'
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
    all: modules.icons.root + '**/*.svg',
    noSprite: modules.icons.noSprite + '**/*.svg',
    exclude: [
      'no-sprite',
      'no-sprite/**'
    ],
    excludeSync: [
      ''
    ]
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
    all: modules.nunjucks.root + '**/*.+(html|njk|nunjucks)',
    views: modules.nunjucks.views + '**/*.+(html|njk|nunjucks)',
    partials: modules.nunjucks.partials + '**/*.+(html|njk|nunjucks)',
    exclude: [
      'macros'
    ]
  },

  // PHP Files
  php: {
    all: modules.php.root + '**/*.php',
    exclude: [
      'vendor/**',
      'node_modules/**',
      'bower_components/**',
      'admin/**'
    ]
  },

  // PHP Composer
  composer: {
    all: '**/composer.json',
    clean: [
      base.www + 'vendor/vendor/',
      base.www + 'inc/theme/vendor/',
      base.www + 'inc/admin/vendor/',
      base.www + '**/composer.lock'
    ],
    exclude: [
      'vendor/**',
      'node_modules/**',
      'bower_components/**'
    ]
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
      base.www + 'admin',
      base.www + 'deployment',
      base.www + '_readme.md',
      base.www + '_.htaccess',
      base.www + 'index.php',
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
    excludeSync: [
      '_readme.md'
    ]
  },

  // Theme
  wordpress: {
    all: modules.wordpress.theme + '**/*',
    clean: [
      base.www + '*.*',
      base.www + 'composer',
      base.www + 'includes',
      base.www + 'partials',
      base.www + 'inc/theme/*.*',
      base.www + 'inc/theme/classes',
      base.www + 'inc/theme/config',
      base.www + 'inc/admin/*.*',
      base.www + 'inc/admin/classes',
      base.www + 'inc/admin/config',
      base.www + 'inc/admin/template-parts',
      base.www + '*.php',
      base.www + 'screenshot.png',
      base.www + 'style.css'
    ],
    exclude: [
      '_readme.md',
      'admin/theme',
      'admin/theme/**',
      'admin/vendor',
      'admin/vendor/**',
      'theme/vendor',
      'theme/vendor/**'
    ],
    excludeSync: [
      '_readme.md',
      './wordpress/theme/inc/admin/theme/**'
    ]
  },

  // Patternlab
  patternlab: {
    all: modules.patternlab.source.root + '**/*.(mustache|json|js|css)',
    exclude: [
      '_sprite-symbols.mustache'
    ]
  }
};


/*
 * Export modules paths
 */

module.exports = {
  base,
  languages,
  node,
  modules,
  patterns
};
