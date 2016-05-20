//
// Gulp environment file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Module imports
 */

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
    DEFAULT_DEBUG: false
};

// Known environment
var knownOptions = {
    string: ['env', 'debug'],
    default: {
        env: process.env.NODE_ENV || env.DEFAULT_ENV,
        debug: process.env.NODE_ENV || env.DEFAULT_DEBUG
    }
};

// Set new environment variables
var options = minimist(process.argv.slice(3), knownOptions);
env.NODE_ENV = options.env;
env.NODE_DEBUG = options.debug;

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


/**
 * Export environment
 */

module.exports = env;
