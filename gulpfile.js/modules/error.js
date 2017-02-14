'use strict';

/**
 * Gulp error file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
var plugins = require('gulp-load-plugins')();


/**
 * Error handling
 */

var onError = function (error) {
  plugins.notify.onError({
    title: 'Gulp error in ' + error.plugin,
    message: error.toString()
  })(error);
  plugins.util.beep();
  this.emit('end');
};

var sendIgnore = function () {
  this.emit('end');
};

var sendNotice = function (error) {
  plugins.notify.onError({
    title: 'Gulp error in ' + error.plugin
  })(error);
  plugins.util.beep();
  this.emit('end');
};

/**
 * Export handler
 */

module.exports = {
  handle: onError,
  ignore: sendIgnore,
  notice: sendNotice
};
