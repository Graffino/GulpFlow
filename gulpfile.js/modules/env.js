'use strict';

/**
 * Gulp environment file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const plugins = require('gulp-load-plugins')();


/**
 * Environment vars
 */

const DEVELOPMENT_ENV = 'development';
const PRODUCTION_ENV = 'production';
const STAGING_ENV = 'staging';
const BAMBOO_ENV = 'bamboo';

// Default environment
const env = {
  DEFAULT_ENV: DEVELOPMENT_ENV,
  DEFAULT_DEBUG: false
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

// Bamboo
env.isBamboo = function () {
  return env.NODE_ENV === BAMBOO_ENV;
};

// Debug
env.isDebug = function () {
  return env.NODE_DEBUG;
};


/**
 * Export environment
 */

module.exports = env;
