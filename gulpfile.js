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
        '!' + paths.img.dest + "src/**"
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
            debugging: true
        }))
        .pipe(cssFiles)
        .pipe(plugins.concat('bower.css'))
        .pipe(gulp.dest(paths.plugins.css))
        .pipe(cssFiles.restore)
        .pipe(jsFiles)
        .pipe(plugins.concat('bower.js'))
        .pipe(gulp.dest(paths.plugins.js))
});

// Styles
gulp.task('stylus', function() {
    var processors = [
        require('autoprefixer')({browsers:['last 2 versions']}),
        plugins.combineMq,
        plugins.postcssQuantityQueries
    ];
    
    return gulp.src(paths.styl.main)
        .pipe(plugins.stylus({
            paths:  ['assets/styl/base/', 'assets/styl/modules/'],
            'include css': true
        }))
        // .pipe(plugins.stylint({config: '.stylintrc'}))
        // .pipe(plugins.stylint.reporter())
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

gulp.task('styles', function (cb) {
    plugins.sequence('stylus', 'css', cb);
});

// Scripts
gulp.task('modernizr', function() {
  gulp.src(paths.js.src)
    .pipe(plugins.modernizr())
    .pipe(gulp.dest(paths.js.dest + 'plugins/'));
});

gulp.task('js', function() {
    var appJs = plugins.filter('app.js', {restore: true});

    return gulp.src(paths.js.src)
        .pipe(appJs)
        // .pipe(plugins.jshint('.jshintrc'))
        // .pipe(plugins.jshint.reporter())
        .pipe(appJs.restore)
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('scripts', function (cb) {
    plugins.sequence('modernizr', 'js', cb);
});

// Images
gulp.task('img', function() {
    var config = {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [plugins.imageminPngquant({ quality: '85', speed: 1 }), plugins.imageminMozjpeg({quality: 80})]
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

gulp.task('images', function (cb) {
    plugins.sequence('img', 'sprite', cb);
});

// Html
gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(plugins.htmlhint('.htmlhintrc'))
        .pipe(plugins.htmlhint.reporter());
});

// Copy files
gulp.task('copy', function() {
    var favicon = gulp.src(paths.img.dest + 'src/favicon.ico')
        .pipe(gulp.dest(paths.img.dest));
    var logo = gulp.src(paths.img.dest + 'svg/no-sprite/logo.svg')
        .pipe(gulp.dest(paths.img.dest));

    return plugins.mergeStream(favicon, logo);
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

// Watch
gulp.task('watch', function() {
    gulp.watch(paths.plugins.src, ['bower, styles, scripts']);
    gulp.watch(paths.styl.src, ['styles']);
    gulp.watch(paths.js.src, ['scripts']);
    gulp.watch(paths.img.src, ['img']);
    gulp.watch(paths.sprite, ['sprite']);
    gulp.watch(paths.html, ['html']);
    gulp.watch('./package.json', ['update:npm']);
    gulp.watch('./bower.json', ['update:bower']);
});

gulp.task('build', function (cb) {
    plugins.sequence(['bower', 'images', 'html'],['styles', 'scripts'], 'watch', cb);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build'], function() {
    return gulp.src('./')
        .pipe(plugins.notify('Successfully built your project!'));
});
