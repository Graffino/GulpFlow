'use strict';

/**
 * Gulp utils file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Notice handling
 */

// Send noop
function ಠ_ಠ(done) {
  done();
}

// Pumped
function pumped(achievement) {
  var exclamations = [
    'Sweet',
    'Awesome',
    'Epic',
    'Wow',
    'High Five',
    'Yay',
    'YEAH!',
    'Booyah'
  ];

  var randomIndex = Math.floor(Math.random() * exclamations.length);

  return [exclamations[randomIndex], '! ', achievement].join('');
}


/**
 * Export handler
 */

module.exports = {
  noop: ಠ_ಠ,
  pumped: pumped
};
