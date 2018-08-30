'use strict';

/*
 * Gulp watch file
 * Author: Graffino (http://www.graffino.com)
 */


/* eslint
  unicorn/no-process-exit: 0
*/


/**
 * Module imports
 */

// Use to watch gulp itself
const fs = require('fs');
const spawn = require('child_process').spawn;

// Node requires
const path = require('path');
const debounce = require('debounce');
const browserSync = require('browser-sync');

// Gulp & plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Gulp requries
const config = require('../config');
const notice = require('../modules/notice');
const paths = require('../modules/paths');

// Gulp tasks
const bower = require('../tasks/bower');
const bundle = require('../tasks/bundle');
const clean = require('../tasks/clean');
const copy = require('../tasks/copy');
const fonts = require('../tasks/fonts');
const js = require('../tasks/js');
const lint = require('../tasks/lint');
const nunjucks = require('../tasks/nunjucks');
const sprite = require('../tasks/sprite');
const stylus = require('../tasks/stylus');
const utils = require('../modules/utils');
const wordpress = require('../tasks/wordpress');
const externals = require('../tasks/externals');
const composer = require('../tasks/composer');
const patternlab = require('../tasks/patternlab');

let gulpProcess;

/**
 * Watch for changes
 */

function watchChanges() {
  // Gulp watch issue, must use debounce with gulp.series to work around it:
  // https://github.com/gulpjs/gulp/issues/1304

  // Autowatch Gulp
  if (config.enabled.gulpReload) {
    gulp.watch(
      [paths.base.root + 'gulpfile.js/**/*.js'], () => {
        let pid;
        // Quit all BrowserSync processes
        browserSync.exit();

        // Read current PID & kill it
        if (fs.existsSync('gulpfile.js/gulp.pid')) {
          pid = fs.readFileSync('gulpfile.js/gulp.pid');
          try {
            process.kill(pid, 0);
          } catch (error) {}
          // Delete PID file
          fs.unlinkSync('gulpfile.js/gulp.pid');
        }

        // Spawn new detached process
        gulpProcess = spawn('gulp', ['watch'], {
          stdio: 'inherit',
          detached: true
        });
        // Write process PID to file
        fs.writeFileSync('gulpfile.js/gulp.pid', gulpProcess.pid);

        plugins.util.log(plugins.util.colors.green('Re-Starting Gulp: (╯°□°）╯︵ ┻━┻'));

        // Detach child process
        gulpProcess.unref();

        // Kill main process
        process.kill(0);
      }
    );
  }

  // Init Browser Sync
  browserSync.init(config.modules.browsersync);

  // Gulp
  gulp.watch(
    [paths.base.root + 'gulpfile.js/**/*.js'],
    debounce(
      gulp.parallel(
        lint.gulp
      ),
      500
    )
  );

  // JS Common, Modules
  gulp.watch(
    [
      paths.base.src + paths.patterns.js.common,
      paths.base.src + paths.patterns.js.modules
    ],
    debounce(
      gulp.series(
        gulp.parallel(
          config.clean.watch.js ? clean.js.common : utils.noop,
          config.clean.watch.js ? clean.js.modules : utils.noop
        ),
        js.process,
        bundle.js,
        externals.js,
        lint.js,
        patternlab.process,
        utils.reload,
        notice.rebuilt
      ),
      500
    )
  );

  // Stylus
  gulp.watch(
    [
      paths.base.src + paths.patterns.stylus.all,
      path.normalize('!**/{' + paths.patterns.stylus.exclude.join(',') + '}')
    ],
    debounce(
      gulp.series(
        stylus.process,
        bundle.css,
        externals.css,
        lint.stylus,
        patternlab.process,
        notice.rebuilt
      ),
      500
    )
  );

  // Nunjucks HTML Templates
  gulp.watch(
    [paths.base.src + paths.patterns.nunjucks.all],
    debounce(
      gulp.series(
        config.clean.watch.html ? clean.html : utils.noop,
        nunjucks.process,
        lint.html,
        utils.reload,
        notice.rebuilt
      ),
      500
    )
  );

  // Fonts
  gulp.watch(
    [paths.base.src + paths.patterns.fonts.all],
    debounce(
      gulp.series(
        config.clean.watch.fonts ? clean.fonts : utils.noop,
        copy.fonts,
        fonts.process,
        patternlab.process,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Media
  gulp.watch(
    [paths.base.src + paths.patterns.media.all],
    debounce(
      gulp.series(
        config.clean.watch.media ? clean.media : utils.noop,
        copy.media,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Data
  gulp.watch(
    [paths.base.src + paths.patterns.data.all],
    debounce(
      gulp.series(
        config.clean.watch.data ? clean.data : utils.noop,
        copy.data,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Static
  gulp.watch(
    [paths.base.src + paths.patterns.static.all],
    debounce(
      gulp.series(
        config.clean.watch.static ? clean.static : utils.noop,
        copy.static,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Images
  gulp.watch(
    [paths.base.src + paths.patterns.images.all],
    debounce(
      gulp.series(
        config.clean.watch.images ? clean.images : utils.noop,
        copy.images,
        patternlab.process,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Sprite icons
  gulp.watch(
    [
      paths.base.src + paths.patterns.icons.all,
      paths.base.src + paths.modules.stylus.mustache
    ],
    debounce(
      gulp.series(
        config.clean.watch.icons ? clean.icons : utils.noop,
        sprite.process,
        stylus.process,
        bundle.css,
        patternlab.process,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Vendor
  gulp.watch(
    [paths.base.src + paths.patterns.vendor.all],
    debounce(
      gulp.series(
        config.clean.watch.vendor ? clean.vendor : utils.noop,
        copy.vendor,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Wordpress
  gulp.watch(
    [
      paths.patterns.wordpress.all,
      path.normalize('!**/{' + paths.patterns.wordpress.exclude.join(',') + '}')
    ],
    debounce(
      gulp.parallel(
        config.enabled.watch.php ? lint.php : utils.noop,
        gulp.series(
          config.clean.watch.wordpress ? clean.wordpress : utils.noop,
          wordpress.process,
          utils.reload,
          notice.rebuilt
        )
      ),
      500
    )
  );

  // Composer
  gulp.watch(
    [
      paths.base.wordpress + paths.patterns.composer.all,
      path.normalize('!**/{' + paths.patterns.composer.exclude.join(',') + '}')
    ],
    debounce(
      gulp.series(
        clean.composer,
        composer.install,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Patternlab
  // JS SRC
  const excludePatternlab = paths.patterns.patternlab.exclude.map(
    item => '!' + path.normalize(paths.modules.patternlab.source.root + '**/' + item)
  );
  const filesPatternlab = [path.normalize(paths.patterns.patternlab.all)];
  const srcPatternlab = filesPatternlab.concat(excludePatternlab);
  gulp.watch(
    [srcPatternlab],
    debounce(
      gulp.series(
        patternlab.process,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );

  // Bower
  gulp.watch(
    [paths.base.root + 'bower.json'],
    debounce(
      gulp.series(
        bower.process,
        bundle.js,
        bundle.css,
        utils.reload,
        notice.rebuilt
      ),
      2000
    )
  );
}


/**
 * Watch app
 */

const watchApp = gulp.series(
  notice.watching,
  watchChanges
);


/**
 * Export module functions
 */

module.exports = {
  app: watchApp
};


/**
 * Gulp watch tasks
 */

watchApp.displayName = 'watch';
watchApp.description = 'Enters watch mode. This watches for changes in the assets, CSS, JS, etc. If a file changes, a series of tasks are ran to reflect the changes in the `/www` build folder. CSS is also injected automatically in the page.';
gulp.task(watchApp);
