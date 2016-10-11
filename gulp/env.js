//
// Gulp environment file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

// Node requires
var minimist = require('minimist');


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

// Known environment
var knownOptions = {
    string: ['env', 'debug', 'wp'],
    default: {
        env: process.env.NODE_ENV || env.DEFAULT_ENV,
        debug: process.env.NODE_ENV || env.DEFAULT_DEBUG,
        wp: process.env.NODE_ENV || env.DEFAULT_WP
    }
};

// Set new environment variables
var options = minimist(process.argv.slice(3), knownOptions);

if (options.env === '') {
    env.NODE_ENV = env.DEFAULT_ENV;
} else {
    env.NODE_ENV = options.env;
}

// Make options work without true / false
if (options.debug === false) {
    env.NODE_DEBUG = false;
} else {
    env.NODE_DEBUG = true;
}

// Make options work without true / false
if (options.wp === false) {
    env.NODE_WP = false;
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
