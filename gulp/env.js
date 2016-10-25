//
// Gulp environment file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Gulp & plugins
var plugins = require('gulp-load-plugins')();


/**
 * Environment vars
 */

var DEVELOPMENT_ENV = 'development';
var PRODUCTION_ENV = 'production';
var STAGING_ENV = 'staging';

// Default environment
var env = {
    DEFAULT_ENV: DEVELOPMENT_ENV,
    DEFAULT_DEBUG: false,
    DEFAULT_WP: false
};

// Make options work without true / false
if (typeof plugins.util.env.env === 'undefined' || plugins.util.env.env === null) {
    env.NODE_ENV = DEVELOPMENT_ENV;
} else {
    env.NODE_ENV = plugins.util.env.env;
}

// Make options work without true / false
if (typeof plugins.util.env.debug === 'undefined' || plugins.util.env.debug === null) {
    env.NODE_DEBUG = env.DEFAULT_DEBUG;
} else {
    env.NODE_DEBUG = true;
}

// Make options work without true / false
if (typeof plugins.util.env.wp === 'undefined' || plugins.util.env.wp === null) {
    env.NODE_WP = env.DEFAULT_WP;
} else {
    env.NODE_WP = true;
}


/**
 * Check current environment
 */

// Development
env.isDevelopment = function () {
    return env.NODE_ENV === DEVELOPMENT_ENV;
};

// Production
env.isProduction = function () {
    return env.NODE_ENV === PRODUCTION_ENV;
};

// Staging
env.isStaging = function () {
    return env.NODE_ENV === STAGING_ENV;
};

// Debug
env.isDebug = function () {
    return env.NODE_DEBUG;
};

// Wordpress
env.isWP = function () {
    return env.NODE_WP;
};


/**
 * Export environment
 */

module.exports = env;
