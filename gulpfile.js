//
// Gulp config file
// Author: Graffino (http://www.graffino.com)
//

/**
 * Vars
 */
 // Debug
var debug = false;
// Initialize Gulp
var gulp = require('gulp');
// Initialize Gutil
var gutil = require('gulp-util');
// Exec object for running shell scripts
var exec = require('child_process').exec;
// Automatically parse and load plugins
var gulpLoadPlugins = require('gulp-load-plugins');
// Plugins object holder
var plugins = gulpLoadPlugins({
    DEBUG: debug,
    pattern: '*',
    replaceString: /^gulp(-|\.)/,
    camelize: true
});


/**
 * Gulp stats
 */
require('gulp-stats')(gulp);

/**
 * Fix for failed build on Graffino staging
 */
require('es6-promise').polyfill();

/**
 *  Error handler
 */
var onError = function (err) {
    plugins.notify.onError({
        title: 'Gulp error in ' + err.plugin,
        message: err.toString()
    })(err);
    gutil.beep();
    console.log(err.toString());
    this.emit('end');
};


/**
 * Paths
 */
var paths = {
    styl: {
        src: 'assets/styl/**/*.styl',
        main: 'assets/styl/main.styl',
        dest: 'assets/css/modules/'
    },
    css: {
        src: ['assets/css/plugins/*.css', 'assets/css/modules/*.css'],
        dest: 'assets/css/',
        main: 'assets/css/main.css',
        min: 'assets/css/main.min.css'
    },
    js: {
        src: ['assets/js/plugins/*.js', 'assets/js/modules/*.js'],
        dest: 'assets/js/',
        modules: 'assets/js/modules/*.js',
        min: 'assets/js/main.min.js'
    },
    plugins: {
        src: 'bower_components/**',
        css: 'assets/css/plugins/',
        js: 'assets/js/plugins/'
    },
    img: {
        src : 'assets/images/src/**/*.{png,jpg,svg}',
        dest : 'assets/images/'
    },
    fonts: 'assets/fonts/*.{ttf,woff,woff2}',
    sprite: 'assets/images/svg/*.svg',
    spriteSrc: 'assets/images/src/svg/*.svg',
    html: './*.html',
    build: {
        main: 'build/',
        img: 'build/assets/images/',
        css: 'build/assets/css/',
        js: 'build/assets/js/',
        fonts: 'build/assets/fonts/',
        documents: 'build/assets/documents/'
    },
    documents: 'assets/documents/*.{doc,pdf}'
};


/**
 * Clean project
 */
gulp.task('clean', function() {
    var toClean = [
        './.DS_Store',
        './**/.DS_Store',
        '!' + paths.js.dest + 'node_modules/**',
        '!' + paths.js.dest + 'bower_components/**',
        paths.css.dest,
        paths.js.dest + '**/*.{js,map}',
        paths.js.dest + 'plugins',
        '!' + paths.js.dest + 'modules/*.js',
        paths.img.dest + '**/*',
        '!' + paths.img.dest + 'src/**',
        paths.build.main,
    ];

    return plugins.del(toClean);
});

/**
 * Node
 */
// Install components
gulp.task('npm:install', function(cb) {
    exec('npm install && npm update && npm prune < /dev/tty', function (err, stdout, stderr) {
        console.log(stderr);
        cb(err);
    });
});

// Update componentsw
gulp.task('npm:updateJson', function(cb) {
    exec('ncu -a < /dev/tty', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Update components in JSON file
gulp.task('npm:check', function(cb) {
    exec('ncu < /dev/tty', function(err, stdout, stderr) {
        // Notify
        if (stderr === '') {
            gulp.src('./', {read:false}).pipe(plugins.notify(stdout));
        } else {
            gulp.src('./', {read:false}).pipe(plugins.notify(stderr));
        }
        cb(err);
    });
});

/**
 * Bower
 */
// Install components
gulp.task('bower:install', function() {
    return gulp.src('./', {read:false})
        .pipe(plugins.exec('bower install && bower prune'))
        .pipe(plugins.exec.reporter());
});

// Update components in JSON file
gulp.task('bower:updateJSON', function(cb) {
    exec('ncu -m bower -a < /dev/tty', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Check for updates
gulp.task('bower:check', function(cb) {
    exec('ncu -m bower < /dev/tty', function(err, stdout, stderr) {
        // Notify
        if (stderr === '') {
            gulp.src('./', {read:false}).pipe(plugins.notify(stdout));
        } else {
            gulp.src('./', {read:false}).pipe(plugins.notify(stderr));
        }
        cb(err);
    });
});

// Parse and compile components to bower.css / bower.js
gulp.task('bower:compile', function() {
    var jsFiles = plugins.filter('**/*.js', {restore: true}),
        cssFiles = plugins.filter('**/*.css', {restore: true});

    return gulp.src(plugins.mainBowerFiles({
            includeDev: true,
            includeSelf: true,
            debugging: false
        }))
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.sourcemaps.init())
        .pipe(cssFiles)
        .pipe(plugins.groupConcat({'bower.css': '**/*.css'}))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.plugins.css))
        .pipe(cssFiles.restore)
        .pipe(plugins.sourcemaps.init())
        .pipe(jsFiles)
        .pipe(plugins.groupConcat({'bower.js': '**/*.js'}))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.plugins.js));
});


/**
 * Modernizr
 */
// Build a custom modernizr version
gulp.task('modernizr:build', function() {
    var config = {
        cache: false,
        crawl: true,
        uglify: false,
        devFile: false,
        options: [
            'setClasses'
        ],
        tests: [
            'canvas', 'fullscreen', 'hiddenscroll', 'history','htmlimports',
            'input', 'inputtypes','requestanimationframe', 'svg', 'touchevents',
            'geolocation', 'appearance', 'backgroundblendmode',
            'backgroundcliptext', 'csscalc', 'csscolumns', 'cssfilters', 'flexbox',
            'flexboxlegacy', 'flexwrap', 'cssinvalid', 'cssmask',
            'csspointerevents', 'csspositionsticky', 'cssreflections',
            'csstransitions', 'cssvhunit', 'cssvmaxunit', 'cssvminunit',
            'cssvwunit', 'willchange', 'placeholder', 'sizes',
            'srcset', 'svgasimg', 'svgfilters','svgclippaths', 'videoautoplay'
        ]
    };
    gulp.src('./assets/js/modules/app.js')
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.modernizr(config))
        .pipe(gulp.dest(paths.js.dest + 'plugins/'));
});


/**
 * Styles
 */
// Lint, autoprefix and compile stylus to app.css
gulp.task('stylus:compile', function() {
    var processors = [
        plugins.autoprefixer({browsers:['last 2 versions']}),
        plugins.combineMq,
        plugins.postcssQuantityQueries
    ];

    return gulp.src(paths.styl.main)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.stylus({
            paths:  ['assets/styl/base/', 'assets/styl/modules/', '!assets/styl/base/sprite.styl'],
            'include css': true
        }))
        .pipe(plugins.postcss(processors))
        .pipe(plugins.rename('app.css'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styl.dest));
});

// Postprocess, concatenate, uncss, to main.css
gulp.task('css:process', function() {
    return gulp.src(paths.css.src)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(plugins.groupConcat({'main.css': '**/*.css'}))
        .pipe(plugins.uncss({
            html: ['*.html'],
            ignore: [/no-.*/, /browser-.*/, /h-no-pointer-events/, /is-.*/, /has-.*/, /placeholder/, /ui-.*/, /mfp-.*/, /select2-.*/, /slick-.*/, /-x-.*/, /-minus-.*/, /-plus-.*/, /-arrow-.*/ ]
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest));
});

// Minify CSS
gulp.task('css:minify', function() {
    return gulp.src(paths.css.main)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.postcss([plugins.csswring]))
        .pipe(plugins.rename({ suffix: '.min'}))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(plugins.livereload());
});


/**
 * Javascript
 */
// Lint, concatenate and compile js to main.min.js
gulp.task('js:process', function() {
    return gulp.src(paths.js.src)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.groupConcat({'main.js': '**/*.js'}))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(plugins.livereload());
});


/**
 * Images (jpg, png, svg)
 */
// Compress images for development
gulp.task('img:compress:development', function() {
    var config = {
        optimizationLevel: 0,
        progressive: false,
        interlaced: false
    };

    return gulp.src(paths.img.src)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(plugins.livereload());
});

// Compress images for production (Heavy CPU!)
gulp.task('img:compress:production', function() {
    var config = {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{
            removeViewBox: false
        }],
        use: [
            plugins.imageminPngquant({
                quality: '65-80',
                speed: 4
            }),
            plugins.imageminMozjpeg({
                quality: '80',
                progressive: true,
            }
        )]
    };

    return gulp.src(paths.img.src)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.img.dest));
});

// Generate SVG Sprites
gulp.task('sprite:build', function() {
    var config = {
        shape: {
            spacing: {
                padding: 2
            }
        },
        mode: {
            css: {
                bust: false,
                prefix: 'svg-',
                dest: '',
                common: '',
                sprite: 'sprite.svg',
                mixin: 'sprite',
                render: {
                    styl: {
                        template: 'assets/styl/base/sprite-mustache.styl',
                        dest: '../styl/base/sprite.styl'
                    }
                }
            }
        }
    };

    return gulp.src(paths.sprite)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.svgSprite(config))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(plugins.livereload());
});

// Copy favicon, logo, pin icon to /images
gulp.task('img:copy', function() {
    var favicon = gulp.src(paths.img.dest + '/src/favicon.ico')
        .pipe(gulp.dest(paths.img.dest));
    var logo = gulp.src(paths.img.dest + 'svg/no-sprite/logo.svg')
        .pipe(gulp.dest(paths.img.dest));
    var pin = gulp.src(paths.img.dest + 'svg/no-sprite/pin-icon.svg')
        .pipe(gulp.dest(paths.img.dest))
        .pipe(plugins.livereload());

    return plugins.mergeStream(favicon, logo, pin);
});


/**
 * Inject
 */
// Inject critical CSS, minify HTML
gulp.task('inject:criticalcss', function() {
    var critical = require('critical').stream;
    return gulp.src(paths.html)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(critical({
            base: './',
            inline: true,
            minify: true,
            width: 1300,
            height: 900
        }))
        // Correct assets path
        .pipe(plugins.replace('../', 'assets/'))
        // Minify HTML
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.build.main));
});


/**
 * Build Copy
 */
// Copy files to build
gulp.task('build:copy', function() {
    var images = gulp.src([paths.img.dest + '/**/*.{png,jpg,svg}', '!' + paths.img.src])
                .pipe(gulp.dest(paths.build.img));
    var css = gulp.src(paths.css.min)
                // Remove source mapping
                .pipe(plugins.replace('/*# sourceMappingURL=main.min.css.map */', ''))
                .pipe(gulp.dest(paths.build.css));
    var js = gulp.src(paths.js.min)
                // Remove source mapping
                .pipe(plugins.replace('//# sourceMappingURL=main.min.js.map', ''))
                .pipe(gulp.dest(paths.build.js));
    var fonts = gulp.src(paths.fonts)
                .pipe(gulp.dest(paths.build.fonts));
    var others = gulp.src(['humans.txt','LICENSE','robots.txt','.htaccess'])
                .pipe(gulp.dest(paths.build.main));
    var documents = gulp.src([paths.documents])
                .pipe(gulp.dest(paths.build.documents));
    return plugins.mergeStream(css, js, fonts, images, others, documents);
});


/**
 * Bump version
 */
// Major
gulp.task('bump:major', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.bump({type: 'major'}))
        .pipe(gulp.dest('./'))
        .pipe(plugins.git.commit('Bump major version.'));
});
// Minor
gulp.task('bump:minor', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.bump({type: 'minor'}))
        .pipe(gulp.dest('./'))
        .pipe(plugins.git.commit('Bump minor version.'));
});
// Patch
gulp.task('bump:patch', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.bump({type: 'patch'}))
        .pipe(gulp.dest('./'))
        .pipe(plugins.git.commit('Bump patch version.'));
});


/**
 * CSS regression testing
 */
// Init
gulp.task('regression:init', function(cb) {
    exec('cd bower_components/BackstopJS/; npm install; gulp genConfig < /dev/tty', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Create reference point
gulp.task('regression:reference', function(cb) {
    exec('cd bower_components/BackstopJS/; gulp reference < /dev/tty', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Test for regressions
gulp.task('regression:test', function(cb) {
    exec('cd bower_components/BackstopJS/; gulp test', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


/**
 * Linting
 */
// Lint JS
gulp.task('test:js', function() {
    return gulp.src(paths.js.modules)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter());
});

// Lint Stylus
gulp.task('test:styl', function() {
    return gulp.src(paths.styl.src)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.stylint({
            config: '.stylintrc',
            reporter: plugins.stylintStylish,
            reporterOptions: {
                verbose: true
            }
        }))
        .pipe(plugins.stylint.reporter())
        .pipe(plugins.stylint.reporter('fail', { failOnWarning: true }));
});

// Lint HTML
gulp.task('test:html', function() {
    return gulp.src(paths.html)
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.htmlhint('.htmlhintrc'))
        .pipe(plugins.htmlhint.reporter('htmlhint-stylish'))
        .pipe(plugins.livereload());
});


/**
 * Sequences
 */
// Process images for development, sprites, copy
gulp.task('imagesSequence:development', function(cb) {
    plugins.sequence('img:compress:development', 'img:copy', cb);
});

// Process images for production, sprites, copy (Heavy CPU!)
gulp.task('imagesSequence:production', function(cb) {
    plugins.sequence('img:compress:production', 'img:copy', cb);
});

// Sprite
gulp.task('spriteSequence', function(cb) {
    plugins.sequence('img:compress:development', ['sprite:build', 'img:copy'], 'stylus:compile', 'css:process', 'css:minify', cb);
});

// Process styles
gulp.task('stylesSequence', function(cb) {
    plugins.sequence(['stylus:compile', 'test:styl'], 'css:process', 'css:minify', cb);
});

// Scripts
gulp.task('scriptsSequence', function(cb) {
    plugins.sequence(['js:process', 'test:js'], cb);
});

// Tests
gulp.task('testSequence', function(cb) {
    plugins.sequence(['test:styl', 'test:js', 'test:html'], cb);
});

// HTML
gulp.task('htmlSequence', function(cb) {
    plugins.sequence('test:html', cb);
});

// Components
gulp.task('componentsSequence', function(cb) {
    plugins.sequence(['modernizr:build', 'bower:install'], ['bower:compile', 'stylus:compile'],'css:process', 'css:minify', cb);
});

// Bower sequence
gulp.task('bowerSequence', function(cb) {
    plugins.sequence(['modernizr:build', 'bower:install'], 'bower:compile', cb);
});

// Dev sequence
gulp.task('devSequence', function(cb) {
    plugins.sequence(['modernizr:build', 'bower:install', 'testSequence'], ['bower:compile', 'img:compress:development'], ['sprite:build', 'img:copy'], 'stylus:compile', ['css:process', 'js:process'], 'css:minify', cb);
});

// Production sequence
gulp.task('prodSequence', function(cb) {
    plugins.sequence(['modernizr:build', 'bower:install'], ['bower:compile', 'img:compress:production'], ['sprite:build', 'img:copy'], 'stylus:compile', ['css:process', 'js:process'], 'css:minify', ['inject:criticalcss', 'build:copy'], cb);
});


/**
 * Notices
 */
// Build complete
gulp.task('notice:built', function() {
    return gulp.src('./', {read:false})
        .pipe(plugins.notify('Successfully built your project!'));
});


/**
 *  Watch
 */
gulp.task('watch', function() {
    // Live reload listen
    plugins.livereload.listen();

    // Bower
    gulp.watch(paths.plugins.src, { interval: 500 }, ['componentsSequence']);
    // Stylus
    gulp.watch(paths.styl.src, { interval: 500 }, ['stylesSequence']);
    // Javascript
    gulp.watch(paths.js.src, { interval: 500 }, ['scriptsSequence']);
    // Images
    gulp.watch(paths.img.src, { interval: 500 }, ['imagesSequence:development']);
    // Sprite
    gulp.watch(paths.spriteSrc, { interval: 500 }, ['spriteSequence']);
    // HTML
    gulp.watch(paths.html, { interval: 500 }, ['htmlSequence']);
    // Gulp updates
    gulp.watch('./gulpfile.js', { interval: 500 }, ['devSequence']);
});

/**
 * Main tasks
 */
// Development build
gulp.task('development', function (cb) {
    plugins.sequence('devSequence', 'watch', 'notice:built', cb);
});
// Production build
gulp.task('staging', function (cb) {
    plugins.sequence(['clean', 'devSequence'], cb);
});

// Development build
gulp.task('production', function (cb) {
    plugins.sequence(['clean', 'prodSequence'], 'notice:built', cb);
});

// Run tests
gulp.task('test', function (cb) {
    plugins.sequence(['testSequence'], 'notice:built', cb);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['development'], function() {});
