'use strict';

/**
 * Gulp Patternlab file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Module imports
 */

// Gulp & plugins
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requires
const config = require('../config');
const paths = require('../modules/paths');
const utils = require('../modules/utils');


/**
 * Copying dependency files
 */

// Patternlab Styleguide
const copyStyleguide = function () {
  return gulp.src(
    path.normalize(config.modules.patternlab.paths.source.styleguide + '/**/*'),
    {since: gulp.lastRun(copyStyleguide)}
  )
    .pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.root)));
};

// Font files
const copyFontFiles = function () {
  return gulp.src(
    [
      // Gulpflow processed font files
      path.normalize(paths.base.www + paths.modules.fonts.root + '/**/*')
    ],
    {since: gulp.lastRun(copyFontFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.fonts)));
};

// CSS files
const copyCssFiles = function () {
  return gulp.src(
    [
      // Stylus bundle
      path.normalize(paths.base.www + paths.modules.css.root + '/main.css'),
      // Patternlab custom css files
      path.normalize(config.modules.patternlab.paths.source.css + '/**/*.css')
    ],
    {since: gulp.lastRun(copyCssFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.css)));
};

// Copy Javascript files
const copyJsFiles = function () {
  return gulp.src(
    [
      // Gulpflow JS bundle
      path.normalize(paths.base.www + paths.modules.js.root + '/main.js'),
      // Patternlab custom js files
      path.normalize(config.modules.patternlab.paths.source.js + '/**/*.js')
    ],
    {since: gulp.lastRun(copyJsFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.js)));
};

// Copy images
const copyImageFiles = function () {
  return gulp.src(
    [
      // Gulpflow processed image files
      path.normalize(paths.base.www + paths.modules.images.root + '/**/*'),
      // Patternlab custom image files
      path.normalize(config.modules.patternlab.paths.source.images + '/**/*')
    ],
    {since: gulp.lastRun(copyImageFiles)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.images)));
};

// Copy icon sprite file
const copyIconsSpriteFile = function () {
  return gulp.src(
    [
      // Gulpflow processed sprite and icon files
      path.normalize(paths.base.www + paths.modules.icons.root + '/**/*')
    ],
    {since: gulp.lastRun(copyIconsSpriteFile)}
  ).pipe(gulp.dest(path.normalize(config.modules.patternlab.paths.public.icons)));
};


/**
 * Generate a mustache file and a markdown template for each icon
 */

async function generateIconTemplates() {
  const files = fs.readdirSync(path.normalize(paths.modules.patternlab.source.icons))
    .filter(file => {
      return path.extname(file) === '.svg';
    });
  if (!fs.existsSync(path.normalize(paths.modules.patternlab.source.patterns + '03-icons/'))) {
    fs.mkdirSync(path.normalize(paths.modules.patternlab.source.patterns + '03-icons/'));
  }
  files.forEach(file => {
    const filename = path.win32.basename(file, '.svg');
    if (!fs.existsSync(path.normalize(paths.modules.patternlab.source.patterns + '03-icons/' + filename + '.mustache'))) {
      fs.writeFileSync(path.normalize(
        paths.modules.patternlab.source.patterns + '03-icons/' + filename + '.mustache'), `<img src="../icons/flyeralarm-icons/${filename}.svg" alt="${filename}">`);
    }
    if (!fs.existsSync(path.normalize(paths.modules.patternlab.source.patterns + '03-icons/' + filename + '.md'))) {
      fs.writeFileSync(path.normalize(
        paths.modules.patternlab.source.patterns + '03-icons/' + filename + '.md'), `title: ${filename}\ndescription:`);
    }
  });
}

/**
 * Generate .md files for each atom
 */

function hyphenToNormalText(str) {
  return str.replace(/(\d+-)/g, '').replace(/-/g, ' ').replace(/_/g, '');
}

function findMustacheFile(startPath) {
  if (!fs.existsSync(startPath)) {
    return;
  }

  const files = fs.readdirSync(startPath);
  files.forEach(file => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findMustacheFile(filename);
    } else if (filename.indexOf('.mustache') >= 0) {
      if (!fs.existsSync(startPath + '/' + path.win32.basename(filename, '.mustache') + '.md')) {
        fs.writeFileSync(
          path.normalize(startPath + '/' + path.win32.basename(filename, '.mustache') + '.md'),
          `---\ntitle: ${hyphenToNormalText(path.win32.basename(filename, '.mustache'))}\n---\ndescription:`);
      }
    }
  });
}

async function generateDescriptions() {
  const files = fs.readdirSync(path.normalize(paths.modules.patternlab.source.patterns + '00-atoms/'));
  files.forEach(folder => {
    findMustacheFile(paths.modules.patternlab.source.patterns + '00-atoms/' + folder);
  });
}

function injectSvgInHtml() {
  const excludeIcons = paths.patterns.icons.exclude.map(
    item => '!' + path.normalize(paths.base.src + paths.modules.icons.root + '**/' + item)
  );
  const filesIcons = [path.normalize(paths.base.src + paths.patterns.icons.all)];
  const src = filesIcons.concat(excludeIcons);

  const spriteConfig = {
    shape: {
      // Set a default padding between elements
      spacing: {
        padding: 2
      },
      transform: ['svgo']
    },
    // 'info' | 'debug' | 'false'
    log: false,
    mode: {
      css: false,
      symbol: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite-symbols.svg'
      }
    }
  };


  return gulp.src(src)
    .pipe(plugins.svgSprite(spriteConfig))
    .pipe(plugins.rename('_sprite-symbols.mustache'))
    .pipe(gulp.dest(paths.modules.patternlab.source.patterns));
}


/**
 * Start patternlab build task
 */

const buildPatternlab = function (done) {
  const patternlab = require('patternlab-node');
  const paternlabInstance = patternlab(config.modules.patternlab);

  try {
    return paternlabInstance.build(done, {});
  } catch (error) {
    return done();
  }
};

/**
 * Gulp sequences for pattern-lab task
 */

const processPatternlab = gulp.series(
  config.enabled.patternlab.generateStyleguide ? copyStyleguide : utils.noop,
  config.enabled.patternlab.generateStyleguide ? copyJsFiles : utils.noop,
  config.enabled.patternlab.generateStyleguide ? copyCssFiles : utils.noop,
  config.enabled.patternlab.generateStyleguide ? copyFontFiles : utils.noop,
  config.enabled.patternlab.generateStyleguide ? copyImageFiles : utils.noop,
  config.enabled.patternlab.generateStyleguide ? copyIconsSpriteFile : utils.noop,
  config.enabled.patternlab.generateIconTemplates ? generateIconTemplates : utils.noop,
  config.enabled.patternlab.generateDescription ? generateDescriptions : utils.noop,
  config.enabled.patternlab.injectSvgInHtml ? injectSvgInHtml : utils.noop,
  config.enabled.patternlab.generateStyleguide ? buildPatternlab : utils.noop
);

/**
 * Export module functions
 */

module.exports = {
  process: config.enabled.patternlab.generateStyleguide ? processPatternlab : utils.noop
};


/**
 * Gulp tasks
 */

processPatternlab.displayName = 'patternlab';
processPatternlab.description = 'Runs the build script for patternlab-node module.';
gulp.task(processPatternlab);
