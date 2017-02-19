'use strict';

/**
 * Gulp webpack file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp requires
var paths = require('./modules/paths');
var env = require('./modules/env');

var webpackDevelopment = {
  entry: {
    main: [
      paths.base.src + paths.modules.js.app,
      paths.base.src + paths.modules.styl.app
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
          presets: [
            'es2015',
            'stage-0'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: 'style!css!postcss',
        exclude: /node_modules/
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader',
        exclude: /node_modules/,
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

module.exports = webpackDevelopment;
