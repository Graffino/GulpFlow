//
// Gulp paths file
// Author: Graffino (http://www.graffino.com)
//


/**
 * Global paths
 */

var paths = {
    // Root folder
    root: './',
    // Build folder
    www: './www/',
    // Assets folder
    assets: './assets',
    // Gulp folder
    gulp: './gulp',

    // JS
    js: 'assets/js/',
    jsBase: 'assets/js/base/',
    jsModules: 'assets/js/modules/',
    jsLib: 'assets/js/lib/',
    jsMain: 'assets/js/base/app.js',

    // JS Templates
    jsTemplates: 'assets/js/templates/',
    jsViews: 'assets/js/templates/views/',

    // HTML Templates
    htmlTemplates: 'templates/',
    htmlViews: 'pages/',

    // Stylus
    stylus: 'assets/stylus/',
    stylusBase: 'assets/stylus/base/',
    stylusModules: 'assets/stylus/modules/',
    stylusMain: 'assets/stylus/app.styl',
    stylusMustache: 'assets/stylus/base/sprite-mustache.styl',
    stylusSprite: 'assets/stylus/lib/sprite.styl',

    // CSS
    css: 'assets/css/',
    cssLib: 'assets/css/lib/',
    cssBase: 'assets/css/base/',
    cssMain: 'assets/css/base/app.css',

    // Others
    fonts: 'assets/fonts/',
    images: 'assets/images/',
    svg: 'assets/images/svg/',
    sprite: 'assets/images/sprite/',
    lib: 'lib/',
    data: 'data/'
};


/**
 * Build paths
 */

paths.build = {
    // Javascript
    js: paths.www + paths.js,
    jsLib: paths.www + paths.jsLib,
    jsBase: paths.www + paths.jsBase,
    jsModules: paths.www + paths.jsModules,

    // JS Templates
    jsTemplates: paths.www + paths.jsTemplates,

    // HTMl Templates
    htmlTemplates: paths.www,

    // CSS
    css: paths.www + paths.css, // Only in build
    cssLib: paths.www + paths.cssLib, // Only in build
    cssBase: paths.www + paths.cssBase, // Only in build
    cssMain: paths.www + paths.cssMain, // Only in build

    // Others
    fonts: paths.www + paths.fonts,
    images: paths.www + paths.images,
    svg: paths.www + paths.svg,
    sprite: paths.www + paths.sprite,
    lib: paths.www + paths.lib,
    data: paths.www + paths.data
};


/**
 * Source paths
 */

paths.source = {
    // Javascript
    js: paths.root + paths.js,
    jsLib: paths.root + paths.jsLib,
    jsModules: paths.root + paths.jsModules,
    jsMain: paths.root + paths.jsMain, // Only in source

    // JS Templates
    jsTemplates: paths.root + paths.jsTemplates, // Only in source
    jsViews: paths.root + paths.jsViews, // Only in source

    // HTML Templates
    htmlTemplates: paths.root + paths.htmlTemplates,
    htmlViews: paths.root + paths.htmlViews,

    // Stylus
    stylus: paths.root + paths.stylus, // Only in source
    stylusBase: paths.root + paths.stylusBase, // Only in source
    stylusModules: paths.root + paths.stylusModules, // Only in source
    stylusMain: paths.root + paths.stylusMain, // Only in source

    // Others
    fonts: paths.root + paths.fonts,
    images: paths.root + paths.images,
    svg: paths.root + paths.svg,
    sprite: paths.root + paths.sprite,
    lib: paths.root + paths.lib,
    data: paths.root + paths.data
};


/**
 * File patterns
 */

paths.patterns = {
    // Javascript
    jsSource: [paths.source.js + '**/*.js', '!' + paths.source.jsLib],
    jsBuild: [paths.build.js + '**/*.js', '!' + paths.build.css + 'main*.js'],
    jsBuldMin: paths.build.js + '**/*.min.js',

    // JS Templates
    jsTemplatesSource: paths.source.jsTemplates + '**/*.+(njk|nunjucks)',
    jsViewsSource: paths.source.jsViews + '**/*.+(njk|nunjucks)',

    // HTML Templates
    htmlTemplatesSource: paths.source.htmlTemplates + '**/*.+(njk|nunjucks)',
    htmlViewsSource: paths.source.htmlViews + '**/*.+(njk|nunjucks)',

    // CSS
    cssBuild: [paths.build.css + '**/*.css', '!' + paths.build.css + 'main*.css'],
    cssBuildMin: paths.build.css + '**/*.min.css',

    // Stylus
    stylusSource: [paths.stylusBase + '**/*.styl', paths.stylusModules + '**/*.styl', '!' + paths.source.stylusMustache],

    // Fonts
    fontsSource: paths.source.fonts + '**/*.+(ttf)',
    fontsBuild: paths.build.fonts + '**/*.+(ttf|woff|woff2)',
    fontsBuildTTF: paths.build.fonts + '**/*.+(ttf)',
    fontsBuildWOFF: paths.build.fonts + '**/*.+(woff)',

    // Images
    imagesSource: paths.source.images + '**/*.+(jpg|jpeg|png|gif|svg|ico)',
    imagesBuild: paths.build.images + '**/*.+(jpg|jpeg|png|gif|svg|ico)',

    // SVGs
    svgsSource: paths.source.svg + '**/*.svg',
    svgsBuild: paths.build.svg + '**/*.svg',

    // SVG Sprite
    spriteSource: paths.source.sprite + '*.svg',
    spriteBuild: paths.build.sprite + '*.svg',

    // Lib
    libSource: paths.source.lib + '**/*',

    // Data
    dataSource: paths.source.data + '**/*.json',
    dataSourceSingle: paths.source.data + 'data.json'
};


/*
 * Export module paths
 */

module.exports = paths;
