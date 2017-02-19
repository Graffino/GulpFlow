'use strict';

/**
 * Gulp config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Imports
 */

// Gulp requires
var paths = require('./modules/paths');


/**
 * Enabled
 */

var enabled = {
  // Enable system notices
  notice: true,
  // Enable bower
  bower: true,
  // Enable modernizr
  modernizr: true,
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
  wordpress: true,

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

  // Critical
  critical: {
    base: paths.www,
    // If false -> generates filename.css next to filename.html
    inline: true,
    pathPrefix: '/',
    css: paths.www + paths.css + 'main.css',
    minify: true,
    width: 2000,
    height: 2000,
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
