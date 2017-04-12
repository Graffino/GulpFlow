'use strict';

/**
 * Gulp utils file
 * Author: Graffino (http://www.graffino.com)
 */


// Node requires
const browserSync = require('browser-sync');

/**
 * Notice handling
 */

// Send noop
function ಠ_ಠ(done) {
  done();
}

// Pumped
function pumped(achievement) {
  const exclamations = [
    'Sweet',
    'Awesome',
    'Epic',
    'Wow',
    'High Five',
    'Yay',
    'YEAH!',
    'Booyah'
  ];

  const randomIndex = Math.floor(Math.random() * exclamations.length);

  return [exclamations[randomIndex], '! ', achievement].join('');
}

// Reload
function reload(done) {
  browserSync.reload();
  done();
}


/**
 * Export handler
 */

module.exports = {
  noop: ಠ_ಠ,
  pumped,
  reload
};
