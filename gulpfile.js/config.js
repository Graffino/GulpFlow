'use strict';

/**
 * Gulp config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Imports
 */

// Node requires
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var imageminSvgo = require('imagemin-svgo');

// Gulp requires
var paths = require('./modules/paths');


/**
 * Enabled
 */

var enabled = {
  // Enable system notices
  notice: true,
  // Enable Gulp watch iself and reload (BUG: CTRL+C doesn't stop Gulp)
  gulpReload: false,
  // Enable bower
  bower: true,
  // Enable modernizr
  modernizr: false,
  // Stylus compile
  stylus: true,
  // Sprite generation,
  sprite: true,
  // JS
  js: true,
  // Fonts conversion
  fonts: true,
  // Data folder
  data: true,
  // Media folder
  media: true,
  // Library folder
  vendor: true,
  // Critical CSS generation
  critical: true,
  // Wordpress
  wordpress: false,

  // Nunjucks templates
  nunjucks: {
    js: true,
    html: true
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
 * Modules
 */

var modules = {
  // BrowserSyc
  browsersync: {
    // Porxy mode
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
    // e.g. '.scroller-mobile', '.scroller'
    scrollElementMapping: [],
    reloadOnRestart: true,
    // e.g. '["google chrome", "firefox"]'
    browser: 'google chrome',
    // false | 'local' | 'external' | 'ui'
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

  // Autoprefixer versions
  autoprefixer: {
    browsers: 'last 2 versions'
  },

  // Modernizr
  modernizr: [
    'canvas', 'fullscreen', 'hiddenscroll', 'history', 'htmlimports',
    'input', 'inputtypes', 'requestanimationframe', 'svg', 'touchevents',
    'geolocation', 'appearance', 'backgroundblendmode',
    'backgroundcliptext', 'csscalc', 'csscolumns', 'cssfilters', 'flexbox',
    'flexboxlegacy', 'flexwrap', 'cssinvalid', 'cssmask',
    'csspointerevents', 'csspositionsticky', 'cssreflections',
    'csstransitions', 'cssvhunit', 'cssvmaxunit', 'cssvminunit',
    'cssvwunit', 'willchange', 'placeholder', 'sizes',
    'srcset', 'svgasimg', 'svgfilters', 'svgclippaths', 'videoautoplay'
  ],

  // SVG Sprite
  sprite: {
    shape: {
      // Set a default padding between elements
      spacing: {
        padding: 2
      },
      transform: ['svgo']
    },
    // 'info' | 'debug' | 'false'
    log: false,
    mode: {
      symbol: true,
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
      }
    }
  },

  // Babel
  babel: {
    presets: [
      'es2015',
      'stage-0'
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
      }
    )]
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
  enabled: enabled,
  modules: modules
};
