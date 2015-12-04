// Plugins
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    config = {
        DEBUG: false,
        pattern: '*',
        replaceString: /^gulp(-|\.)/,
        camelize: true
    },
    plugins = gulpLoadPlugins(config);
require('gulp-stats')(gulp);

// Paths
var paths = {
    styl: {
        src: 'assets/styl/**/*.styl',
        main: 'assets/styl/main.styl',
        dest: 'assets/css/modules/'
    },
    css: {
        src: ['assets/css/plugins/bower.css', 'assets/css/modules/app.css'],
        dest: 'assets/css/'
    },
    js: {
        src: ['assets/js/plugins/bower.js', 'assets/js/modules/app.js'],
        dest: 'assets/js/'
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
    sprite: 'assets/images/svg/*.svg',
    spriteSrc: 'assets/images/src/svg/*.svg',
    html: './*.html'
};

// Clean
gulp.task('clean', function() {
    var toClean = [
        paths.styl.dest + '*',
        paths.css.dest + '**/*.{css,map}',
        paths.js.dest + '**/*.{js,map}',
        '!' + paths.js.dest + 'modules/*.{js,map}',
        paths.img.dest +'**/*',
        '!' + paths.img.dest + 'src/**'
    ];
    
    return plugins.del(toClean);
});

// Bower plugins
gulp.task('bower', function() {
    var jsFiles = plugins.filter('**/*.js', {restore: true}),
        cssFiles = plugins.filter('**/*.css', {restore: true});

    return gulp.src(plugins.mainBowerFiles({
            includeDev: true,
            includeSelf: true,
            debugging: false
        }))
        .pipe(cssFiles)
        .pipe(plugins.concat('bower.css'))
        .pipe(gulp.dest(paths.plugins.css))
        .pipe(cssFiles.restore)
        .pipe(jsFiles)
        .pipe(plugins.concat('bower.js'))
        .pipe(gulp.dest(paths.plugins.js));
});

// Styles
gulp.task('stylus', function() {
    var processors = [
        require('autoprefixer')({browsers:['last 2 versions']}),
        plugins.combineMq,
        plugins.postcssQuantityQueries
    ];
    
    return gulp.src(paths.styl.main)
        .pipe(plugins.stylint({config: '.stylintrc'}))
        .pipe(plugins.stylint.reporter())
        .pipe(plugins.stylus({
            paths:  ['assets/styl/base/', 'assets/styl/modules/'],
            'include css': true
        }))
        .pipe(plugins.postcss(processors))
        .pipe(plugins.rename('app.css'))
        .pipe(gulp.dest(paths.styl.dest));
});

gulp.task('css', function() {
    return gulp.src(paths.css.src)
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.gulp.dest(paths.css.dest))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.postcss([plugins.csswring]))
        .pipe(plugins.rename({ suffix: '.min'}))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest));
});

// CSS Regression Testing
gulp.task('regression:init', function() {
    return gulp.src('/')
        .pipe(plugins.shell('cd bower_components/BackstopJS/ ; npm install ; gulp genConfig'));
});
gulp.task('regression:reference', function() {
    return gulp.src('/')
        .pipe(plugins.shell('cd bower_components/BackstopJS/ ; gulp reference'));
});
gulp.task('regression:test', function() {
    return gulp.src('/')
        .pipe(plugins.shell('cd bower_components/BackstopJS/ ; gulp test'));
});

// Scripts
gulp.task('modernizr', ['stylus'], function() {
    var config = {
        cache: true,
        crawl: false,
        uglify: false,
        options: [
            'setClasses'
        ],
        tests: [
            'canvas',
            'fullscreen-api',
            'hiddenscroll',
            'history',
            'htmlimports',
            'input',
            'inputsearchevent',
            'inputtypes',
            'lists-reversed',
            'requestanimationframe',
            'svg',
            'touchevents',
            'geolocation',
            'touchevents',
            'vibration',
            'a/download',
            'battery/lowbattery',
            'css/appearance',
            'css/backgroundblendmode',
            'css/backgroundcliptext',
            'css/backgroundposition-shorthand',
            'css/calc',
            'css/columns',
            'css/filters',
            'css/flexbox',
            'css/flexboxlegacy',
            'css/flexwrap',
            'css/invalid',
            'css/mask',
            'css/pointerevents',
            'css/positionsticky',
            'css/reflections',
            'css/transitions',
            'css/vhunit',
            'css/vmaxunit',
            'css/vminunit',
            'css/vwunit',
            'css/will-change',
            'forms/placeholder',
            'img/sizes',
            'img/srcset',
            'svg/asimg',
            'svg/filters',
            'svg/inline',
            'svg/svgclippaths',
            'video/autoplay'
        ]
    };
    gulp.src(['./assets/js/modules/app.js', './assets/css/modules/app.css'])
        .pipe(plugins.modernizr(config))
        .pipe(gulp.dest(paths.js.dest + 'plugins/'));
});

gulp.task('scripts', function() {
    var appJs = plugins.filter('app.js', {restore: true});

    return gulp.src(paths.js.src)
        .pipe(appJs)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter())
        .pipe(appJs.restore)
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest));
});

// Images
gulp.task('img:development', function() {
    var config = {
        optimizationLevel: 0,
        progressive: false,
        interlaced: false
    };

    return gulp.src(paths.img.src)
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('img:production', function() {
    var config = {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [plugins.imageminPngquant({ quality: '85', speed: 1 }), plugins.imageminMozjpeg({quality: '80'})]
    };

    return gulp.src(paths.img.src)
        .pipe(plugins.imagemin(config))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('sprite', function() {
    var config = {
        mode: {
            shape: {
                spacing: {
                    padding: 0
                }
            },
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
        .pipe(plugins.svgSprite(config))
        .pipe(gulp.dest(paths.img.dest));
});

// HTML
gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(plugins.htmlhint('.htmlhintrc'))
        .pipe(plugins.htmlhint.reporter());
});

// Copy files
gulp.task('copy', function() {
    var favicon = gulp.src(paths.img.dest + '/src/favicon.ico')
        .pipe(gulp.dest(paths.img.dest));
    var logo = gulp.src(paths.img.dest + 'svg/no-sprite/logo.svg')
        .pipe(gulp.dest(paths.img.dest));
    var pin = gulp.src(paths.img.dest + 'svg/no-sprite/pin-icon.svg')
        .pipe(gulp.dest(paths.img.dest));

    return plugins.mergeStream(favicon, logo, pin);
});

// Versioning
gulp.task('bump:major', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump:patch', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(plugins.bump({type: 'patch'}))
        .pipe(gulp.dest('./'));
});

// Updates
gulp.task('update:npm', function() {
    return gulp.src('./package.json')
        .pipe(plugins.shell('npm run update:npm'));
});

gulp.task('update:bower', function() {
    return gulp.src('./bower.json')
        .pipe(plugins.shell('npm run update:bower'));
});

// Sequences
gulp.task('images:development', function (cb) {
    plugins.sequence('img:development', 'sprite', cb);
});

gulp.task('images:production', function (cb) {
    plugins.sequence('img:production', 'sprite', cb);
});

gulp.task('styles', function (cb) {
    plugins.sequence('stylus', 'css', cb);
});

gulp.task('spriteSequence', function (cb) {
    plugins.sequence('images:development', 'styles', cb);
});

gulp.task('bowerSequence', function (cb) {
    plugins.sequence('bower', 'styles', 'scripts', cb);
});

gulp.task('scriptsSequence', function (cb) {
    plugins.sequence('modernizr', 'scripts', cb);
});

// Watch
gulp.task('watch', function() {
    gulp.watch(paths.plugins.src, ['bowerSequence']);
    gulp.watch(paths.styl.src, ['styles']);
    gulp.watch(paths.js.src, ['scriptsSequence']);
    gulp.watch(paths.img.src, ['img:development']);
    gulp.watch(paths.spriteSrc, ['spriteSequence']);
    gulp.watch(paths.html, ['html']);
    gulp.watch('./package.json', ['update:npm']);
    gulp.watch('./bower.json', ['update:bower']);
});

gulp.task('build:development', function (cb) {
    plugins.sequence(['bower', 'images:development', 'html'], 'modernizr', ['styles', 'scripts'], 'watch', cb);
});

gulp.task('build:production', function (cb) {
    plugins.sequence('clean',['update:bower', 'update:npm'], ['bower', 'images:production', 'html'], 'modernizr', ['styles', 'scripts'], cb);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build:development'], function() {
    return gulp.src('./')
        .pipe(plugins.notify('Successfully built your project!'));
});

gulp.task('production', ['build:production'], function() {
    return gulp.src('./')
        .pipe(plugins.notify('Project ready for production!'));
});
