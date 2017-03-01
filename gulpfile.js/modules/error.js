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

var humanTime = function (milliseconds) {
  return (milliseconds > 999) ? (milliseconds / 1000).toFixed(2) + ' s' : milliseconds + ' ms';
};

var webpack = function (error, stats) {
  var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

  if (error) {
    throw new plugins.gutil.PluginError('webpack', error);
  }

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function (error) {
      plugins.notify.onError({
        title: 'Gulp error in ' + error.plugin
      })(error);
      statColor = 'red';
    });
  } else {
    var compileTime = humanTime(stats.endTime - stats.startTime);
    plugins.util.log(plugins.util.colors[statColor](stats));
    plugins.util.log('Compiled with', plugins.util.colors.cyan('webpack'), 'in', plugins.util.colors.magenta(compileTime));
  }
};


/**
 * Export handler
 */

module.exports = {
  handle: onError,
  ignore: sendIgnore,
  notice: sendNotice,
  webpack: webpack
};
