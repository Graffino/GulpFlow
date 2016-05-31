//
// Gulp error file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp requires
var env = require('./env');

// Gulp plugins
var plugins = require('gulp-load-plugins')({ DEBUG: env.NODE_DEBUG });


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


/**
 * Export handler
 */

module.exports = {
    handle: onError
};
