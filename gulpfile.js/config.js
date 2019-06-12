'use strict';

/**
 * Gulp config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Imports
 */

// Node requires
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

// Gulp requires
const paths = require('./modules/paths');


/**
 * Enabled
 */

const enabled = {
  // Enable system notices
  notice: true,
  // Enable Gulp watch iself and reload (BUG: CTRL+C doesn't stop Gulp)
  gulpReload: false,
  // Enable bower
  bower: true,
  // Stylus compile
  stylus: true,
  // Sprite generation,
  sprite: {
    compile: true,
    inject: true
  },
  // JS
  js: true,
  // Fonts conversion
  fonts: true,
  // Data folder
  data: false,
  // Media folder
  media: false,
  // Library folder
  vendor: true,
  // Critical CSS generation
  critical: false,

  // Nunjucks templates
  nunjucks: false,

  // PHP Composer
  composer: false,

  // Wordpress
  wordpress: {
    theme: false,
    admin: false
  },

  // Externals
  externals: {
    css: false,
    js: false
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
    html: true,
    php: true
  },

  // Watch (Only for PHP linting)
  watch: {
    php: false
  },

  // Minify
  minify: {
    css: true,
    js: true,
    img: true,
    html: false
  }
};


/**
 * Clean
 */

const clean = {
  watch: {
    js: true,
    html: true,
    fonts: true,
    media: true,
    data: true,
    static: true,
    images: true,
    icons: true,
    vendor: true,
    wordpress: false
  }
};

/**
 * Modules
 */

const modules = {
  // BrowserSyc
  browsersync: {
    // Proxy mode
    /* proxy: {
      target: 'localhost'
    },
    */
    port: 8888,
    // 'false' | '{port:3000}'
    ui: {
      port: 8881
    },
    files: [paths.base.www + paths.patterns.css.all],
    reloadDebounce: 1000,
    injectChanges: true,
    minify: false,
    // E.g. '.scroller-mobile', '.scroller'
    scrollElementMapping: [],
    reloadOnRestart: true,
    // E.g. '["google chrome", "firefox"]'
    browser: 'google chrome',
    // False | 'local' | 'external' | 'ui'
    open: false,
    // 'info' | 'debug' | 'warn' | 'silent'
    logLevel: 'silent',
    // 'offline' | 'online'
    plugins: [
      'bs-html-injector',
      'bs-latency'
    ],
    online: undefined,
    notify: true
  },

  // SVG Sprite
  sprite: {
    shape: {
      // Set a default padding between elements
      spacing: {
        padding: 2
      },
      transform: ['svgo'],
      dest: '../' + paths.modules.icons.root
    },
    // 'info' | 'debug' | 'false'
    log: false,
    mode: {
      css: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite.svg',
        mixin: 'sprite',
        dimensions: 'inline',
        render: {
          styl: {
            template: paths.base.src + paths.modules.stylus.mustache,
            dest: '../../' + paths.base.src + paths.modules.stylus.sprite
          }
        }
      },
      symbol: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite-symbols.svg'
      }
    }
  },

  // Babel
  babel: {
    presets: [
      '@babel/env'
    ]
  },

  // Imagemin
  imagemin: {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    plugins: [
      imageminSvgo({
        removeViewBox: false
      }),
      imageminPngquant({
        quality: '65-80',
        speed: 4
      }),
      imageminMozjpeg({
        quality: '80',
        progressive: true
      })
    ]
  },

  // Bundle
  bundle: {
    order: {
      css: [
        // Insert external project names here
        '**/project-name.css',
        '**/bower.css',
        '**/app.css',
        '**/*.css'
      ],
      js: [
        // Insert external project names here
        '**/project-names.js',
        '**/bower.js',
        '**/app.js',
        '**/*.js'
      ]
    }
  },

  // Critical
  critical: {
    inline: false,
    minify: true,
    width: 2000,
    height: 2000,
    extract: true,
    pathPrefix: '/',
    css: paths.base.www + paths.modules.css.main,
    timeout: 1000 * 60 * 10
  }
};


/*
 * Export module paths
 */

module.exports = {
  enabled,
  clean,
  modules
};
