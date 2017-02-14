'use strict';

/**
 * Gulp config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Imports
 */

// Node requires
var qs = require('qs');

// Gulp requires
var env = require('./modules/env');
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
  vendor: true,

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

var webpackDevelopment = {
  entry: {
    main: [
      paths.base.src + paths.modules.js.app,
      paths.base.src + paths.modules.stylus.app
    ]
  },
  output: {
    path: paths.base.www + paths.modules.js.root,
    filename: 'bundle.js'
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['.js', '.json', '.styl']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        include: paths.base.src + paths.modules.fonts.root,
        loader: `file?${qs.stringify({
          name: `[path]$[name].[ext]`
        })}`
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader',
        query: {
          root: paths.base.src + paths.modules.js.views,
          config: './config/nunjucks.config.js',
          quiet: true // Don't show the 'Cannot configure nunjucks environment before precompile' warning
        }
      }
    ]
  }
};

if (env.isDevelopment) {
  webpackDevelopment.devtool = 'inline-source-map';
}


/*
 * Export module paths
 */

module.exports = {
  enabled: enabled,
  modules: modules,
  webpack: {
    development: webpackDevelopment
  }
};
