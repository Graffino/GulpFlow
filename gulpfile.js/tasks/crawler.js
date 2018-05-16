'use strict';

/**
 * Gulp log crawler file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const gulp = require('gulp');

// Gulp requires
const spider = require('spider.js');
const config = require('../config');
const utils = require('../modules/utils');


/**
 * Crawl sites
 */

function crawlSites() {
  const crawler = config.modules.crawler;

  if (Array.isArray(crawler.sites)) {
    crawler.sites.forEach(site => {
      spider({
        url: site
      });
    });
  } else {
    spider({
      url: crawler.sites
    });
  }
}


/**
 * Process Composer
 */

const processCrawler = gulp.series(
  config.enabled.crawler ? crawlSites : utils.noop
);


/**
 * Export module functions
 */

module.exports = {
  install: config.enabled.crawler ? processCrawler : utils.noop
};


/**
 * Gulp Composer task
 */

processCrawler.displayName = 'crawler';
processCrawler.description = 'Crawls any given page and outputs a list of errors that would be shown when using developers console in a browser';

gulp.task(processCrawler);

