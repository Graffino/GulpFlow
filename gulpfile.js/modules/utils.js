'use strict';

/**
 * Gulp utils file
 * Author: Graffino (http://www.graffino.com)
 */


// Node requires
const fs = require('fs');
const path = require('path');
const browserSync = require('browser-sync');

// Gulp requires
const paths = require('../modules/paths');


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

// Get package.json
function getPackageJSON() {
  return JSON.parse(fs.readFileSync(path.normalize(paths.base.root + 'package.json'), 'utf8'));
}


/**
 * Export handler
 */

module.exports = {
  noop: ಠ_ಠ,
  pumped,
  reload,
  getPackageJSON
};
