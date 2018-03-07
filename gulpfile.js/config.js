'use strict';

/**
 * Gulp config file
 * Author: Graffino (http://www.graffino.com)
 */


/**
 * Imports
 */

// Node requires
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

// Gulp requires
const paths = require('./modules/paths');


/**
 * Enabled
 */

const enabled = {
  // Enable system notices
  notice: true,
  // Enable Gulp watch iself and reload (BUG: CTRL+C doesn't stop Gulp)
  gulpReload: false,
  // Enable bower
  bower: true,
  // Enable modernizr
  modernizr: false,
  // Stylus compile
  stylus: true,
  // Sprite generation,
  sprite: true,
  // JS
  js: true,
  // Fonts conversion
  fonts: true,
  // Data folder
  data: false,
  // Media folder
  media: false,
  // Library folder
  vendor: true,
  // Critical CSS generation
  critical: false,

  // Nunjucks templates
  nunjucks: false,

  // PHP Composer
  composer: false,

  // Wordpress
  wordpress: {
    theme: false,
    admin: false
  },

  // Sourcemaps
  sourcemaps: {
    css: true,
    js: true
  },

  // Lint
  lint: {
    css: true,
    js: true,
    html: true,
    php: false
  },

  // Watch (Only for PHP linting)
  watch: {
    php: false
  },

  // Minify
  minify: {
    css: true,
    js: true,
    img: true,
    html: false
  },

  // Patternlab
  patternlab: {
    // Enable node module
    generateStyleguide: true,
    // Generate mustache and .md files for each icon
    generateIconTemplates: true,
    // Generate .md files for each atom
    generateDescription: true,
    // Inject svg sprite in html
    injectSvgInHtml: true
};


/**
 * Clean
 */

const clean = {
  watch: {
    js: true,
    html: true,
    fonts: true,
    media: true,
    data: true,
    static: true,
    images: true,
    icons: true,
    vendor: true,
    wordpress: false
  }
};

/**
 * Modules
 */

const modules = {
  // BrowserSyc
  browsersync: {
    // Proxy mode
    /* proxy: {
      target: 'localhost'
    },
    */
    port: 8888,
    // 'false' | '{port:3000}'
    ui: {
      port: 8881
    },
    files: [paths.base.www + paths.patterns.css.all],
    reloadDebounce: 1000,
    injectChanges: true,
    minify: false,
    // E.g. '.scroller-mobile', '.scroller'
    scrollElementMapping: [],
    reloadOnRestart: true,
    // E.g. '["google chrome", "firefox"]'
    browser: 'google chrome',
    // False | 'local' | 'external' | 'ui'
    open: false,
    // 'info' | 'debug' | 'warn' | 'silent'
    logLevel: 'silent',
    // 'offline' | 'online'
    plugins: [
      'bs-html-injector',
      'bs-latency'
    ],
    online: undefined,
    notify: true
  },

  // Modernizr
  modernizr: [
    'canvas', 'fullscreen', 'hiddenscroll', 'history', 'htmlimports',
    'input', 'inputtypes', 'requestanimationframe', 'svg', 'touchevents',
    'geolocation', 'appearance', 'backgroundblendmode',
    'backgroundcliptext', 'csscalc', 'csscolumns', 'cssfilters', 'flexbox',
    'flexboxlegacy', 'flexwrap', 'cssinvalid', 'cssmask',
    'csspointerevents', 'csspositionsticky', 'cssreflections',
    'csstransitions', 'cssvhunit', 'cssvmaxunit', 'cssvminunit',
    'cssvwunit', 'willchange', 'placeholder', 'sizes',
    'srcset', 'svgasimg', 'svgfilters', 'svgclippaths', 'videoautoplay'
  ],

  // SVG Sprite
  sprite: {
    shape: {
      // Set a default padding between elements
      spacing: {
        padding: 2
      },
      transform: ['svgo'],
      dest: '../' + paths.modules.icons.root
    },
    // 'info' | 'debug' | 'false'
    log: false,
    mode: {
      css: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite.svg',
        mixin: 'sprite',
        dimensions: 'inline',
        render: {
          styl: {
            template: paths.base.src + paths.modules.stylus.mustache,
            dest: '../../' + paths.base.src + paths.modules.stylus.sprite
          }
        }
      },
      symbol: {
        bust: false,
        prefix: '',
        dest: '',
        common: '',
        sprite: 'sprite-symbols.svg'
      }
    }
  },

  // Babel
  babel: {
    presets: [
      'env'
    ]
  },

  // Imagemin
  imagemin: {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    plugins: [
      imageminSvgo({
        removeViewBox: false
      }),
      imageminPngquant({
        quality: '65-80',
        speed: 4
      }),
      imageminMozjpeg({
        quality: '80',
        progressive: true
      })
    ]
  },

  // Critical
  critical: {
    inline: false,
    minify: true,
    width: 2000,
    height: 2000,
    extract: true,
    pathPrefix: '/',
    css: paths.base.www + paths.modules.css.main,
    timeout: 1000 * 60 * 10
  },

  // Patternlab-Node
  patternlab: {
    paths: {
      source: {
        root: paths.modules.patternlab.source.root,
        patterns: paths.modules.patternlab.source.patterns,
        data: paths.modules.patternlab.source.root.data,
        meta: paths.modules.patternlab.source.meta,
        annotations: paths.modules.patternlab.source.annotations,
        styleguide: paths.node.modules + 'styleguidekit-assets-default/dist',
        patternlabFiles: paths.node.modules + 'styleguidekit-mustache-default/views/',
        js: paths.modules.patternlab.source.js,
        images: paths.modules.patternlab.source.images,
        fonts: paths.modules.patternlab.source.fonts,
        css: paths.modules.patternlab.source.css
      },
      public: {
        root: paths.modules.patternlab.public.root,
        patterns: paths.modules.patternlab.public.patterns,
        data: paths.modules.patternlab.public.data,
        annotations: paths.modules.patternlab.public.annotations,
        styleguide: paths.modules.patternlab.public.styleguide,
        js: paths.modules.patternlab.public.js,
        images: paths.modules.patternlab.public.images,
        icons: paths.modules.patternlab.public.icons,
        fonts: paths.modules.patternlab.public.fonts,
        css: paths.modules.patternlab.public.css
      }
    },
    styleGuideExcludes: [],
    defaultPattern: 'all',
    defaultShowPatternInfo: true,
    cleanPublic: true,
    patternExtension: 'mustache',
    'ignored-extensions': ['scss', 'DS_Store', 'less'],
    'ignored-directories': ['scss'],
    debug: false,
    ishControlsHide: {
      s: false,
      m: false,
      l: false,
      full: false,
      random: false,
      disco: false,
      hay: true,
      mqs: false,
      find: false,
      'views-all': false,
      'views-annotations': false,
      'views-code': false,
      'views-new': false,
      'tools-all': false,
      'tools-docs': false
    },
    ishMinimum: '240',
    ishMaximum: '2600',
    patternStateCascade: ['inprogress', 'inreview', 'complete'],
    patternStates: {},
    patternExportPatternPartials: [],
    patternExportDirectory: paths.modules.patternlab.patternExports,
    cacheBust: true,
    starterkitSubDir: 'dist',
    outputFileSuffixes: {
      rendered: '.rendered',
      rawTemplate: '',
      markupOnly: '.markup-only'
    },
    cleanOutputHtml: true
  }
};


/*
 * Export module paths
 */

module.exports = {
  enabled,
  clean,
  modules
};
