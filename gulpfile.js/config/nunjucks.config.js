'use strict';

/**
 * Webpack config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Configuration
 */

function nunjucks(env) {
  env.addFilter('asyncFoo', function (input, done) {
    setTimeout(function () {
      done('[asyncFoo] ' + input);
    }, 1000);
  }, true);
}


/**
 * Export module paths
 */

module.exports = nunjucks;
