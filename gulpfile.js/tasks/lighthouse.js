'use strict';

/**
 * Gulp lighthouse file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const paths = require('../modules/paths');


/**
 * Run lighthouse
 */

function lighthouseRun() {
  return gulp.src(paths.base.root, {read: false})
    .pipe(plugins.exec('mkdir -p ./tests/lighthouse/report'))
    .pipe(plugins.exec('lighthouse ' + paths.base.url + ' --output-path=./tests/lighthouse/report/index.html --save-assets --view'))
    .pipe(plugins.exec.reporter());
}

/**
 * Crawl website and run lighthouse
 */

function lighthouseCrawl() {
  const routes = paths.routes;
  if (routes.length > 0) {
    routes.forEach(route => {
      const path = paths.base.url + route;

      gulp.src(paths.base.root, {read: false})
        .pipe(plugins.exec(`mkdir -p ./tests/lighthouse/report/${route}`))
        .pipe(plugins.exec(`lighthouse ${path} --output-path=./tests/lighthouse/report/${route}/index.html --save-assets --view`))
        .pipe(plugins.exec.reporter());
    });
  } else {
    lighthouseRun();
  }
}


/**
 * Generate report
 */

const generateReport = gulp.series(
  lighthouseRun
);

/**
 * Audit website
 */

const auditWebsite = gulp.series(
  lighthouseCrawl
);

/**
 * Export module functions
 */

module.exports = {
  report: generateReport,
  crawl: auditWebsite
};


/**
 * Gulp lighthouse task
 */

generateReport.displayName = 'lighthouse';
generateReport.description = 'Generates lightouse report in `./tests/lighthouse`.';
gulp.task(generateReport);

auditWebsite.displayName = 'lighthouse:crawl';
auditWebsite.description = 'Crawls website and displays Lighthouse audit';
gulp.task(auditWebsite);
