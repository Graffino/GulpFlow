/**
 * Gulp config
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Base paths
 */

var base = {
  // Root
  root: './',
  // Source
  src: 'src/',
  // Build
  www: './www/',

  // Vendor
  vendor: 'vendor/',

  // Wordpress theme
  wordpress: 'wordpress/theme/'
};


/**
 * Module paths
 */

var modules = {
  // Cascading Stylesheets
  css: {
    root: base.src + 'css/',
    common: base.src + 'css/common/',
    modules: base.src + 'css/modules/',

    // App main file
    app: base.src + 'css/common/app.css'
  },

  // Javascript
  js: {
    root: base.src + 'js/',
    common: base.src + 'js/common/',
    modules: base.src + 'js/modules/',
    vendor: base.src + 'js/vendor/',

    // App main file
    app: base.src + 'js/common/app.js',

    // Javascript Templates
    templates: base.src + 'js/templates/',
    views: base.src + 'js/templates/views/',
    partials: base.src + 'js/templates/views/partials/'
  },

  // Stylus
  stylus: {
    root: base.src + 'stylus/',
    common: base.src + 'stylus/common/',
    modules: base.src + 'stylus/modules/',

    // App main file
    app: base.src + 'stylus/common/app.styl',

    // Icons sprite
    sprite: base.src + 'stylus/vendor/sprite.styl',
    mustache: base.src + 'stylus/vendor/sprite.hbs'
  },

  // Sprite icons
  icons: {
    root: base.src + 'icons/'
  },

  // Images
  images: {
    root: base.src + 'images/',
    svgs: base.src + 'images/svgs/'
  },

  // Fonts
  fonts: {
    root: base.src + 'fonts/'
  },

  // Media
  media: {
    root: base.src + 'media/'
  },

  // HTML Templates
  html: {
    root: base.src + 'html/',
    views: base.src + 'html/views/',
    partials: base.src + 'html/partials/'
  },

  // JSON Data
  data: {
    root: base.src + 'data/',
    common: base.src + 'data/common.json'
  },

  // Static
  static: {
    root: base.src + 'static/'
  }
};


/**
 * File patterns
 */

var patterns = {
  // Cascading Stylesheets
  css: {
    all: modules.css.root + '**/*.css'
  },

  // Javascripts
  js: {
    all: modules.js.root + '**/*.js',
    templates: modules.js.templates + '**/*.+(njk|nunjucks)',
    views: modules.js.views + '**/*.+(njk|nunjucks)'
  },

  // Stylus
  stylus: {
    all: modules.stylus.root + '**/*.styl'
  },

  // Images
  images: {
    all: modules.images.root + '**/*.+(jpg|jpeg|png|svg|gif|ico)',
    svgs: modules.images.svgs + '*.svg'
  },

  // Icons
  icons: {
    all: modules.icons.root + '**/*.svg'
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

  // HTML Templates
  html: {
    all: modules.html.root + '**/*.+(njk|nunjucks)',
    views: modules.html.views + '**/*.+(njk|nunjucks)',
    partials: modules.html.partials + '**/*.+(njk|nunjucks)'
  },

  // Data
  data: {
    all: modules.data + '**/*.json',
    common: modules.data + '**/common.json'
  },

  // Static
  static: {
    all: modules.static + '**/*.json'
  },

  // Vendor
  vendor: {
    all: base.vendor + '**/*'
  },

  // Theme
  wordpress: {
    all: base.wordpress + '**/*'
  }
};


/**
 * Paths ignores
 */

var ignore = {
  // CSS
  css: {
    main: '!' + base.www + modules.css.root + 'main*.css'
  },

  // JS
  js: {
    vendor: '!' + base.root + modules.js.vendor,
    main: '!' + base.www + modules.js.root + 'main*.js'
  }
};


/*
 * Export modules paths
 */

module.exports = {
  base: base,
  modules: modules,
  patterns: patterns,
  ignore: ignore
};
