# GulpFlow 4

Gulp basic flow we use at Graffino. This site uses *Stylus* and it's deployed with *Gulp*.

## Before you start

1. Explore `/gulpfile.js/config.js` and `/gulpfile.js/modules/paths.js`
2. Read `_readme.md` files in project's main folders to better understand what's going on in the background.
3. Run `gulp --tasks` to see all available tasks.

## Install Node

### 1 (macOS). Make sure you have the latest node version

```bash
# Use Homebrew to install node
$ brew install nodejs
```

### 1 (Linux). Make sure you have the latest node version

```bash
# Clear NPM's cache
$ npm cache clean -f
# Install a little helper called 'n'
$ npm install -g n
# Install latest node stable version
$ sudo n stable
```

### 1 (Windows). Make sure you have the latest node version

```bash
# Get & Install NodeJS 8.x.x
https://nodejs.org/download/release/v8.x.x/
```

### 2. Install Node Build Tools (Windows)

```bash
# Start Console with Administrator privileges
$ npm install --global --production windows-build-tools
$ npm config set msvs_version 2015
$ npm config set python %USERPROFILE%\.windows-build-tools\python27\python.exe
```

#### It may help to have these packages globally installed (because Windows :/)

```bash
npm install -g babel-cli backstopjs bower browser-sync critical eslint gulp-cli htmlhint lighthouse npm-check-updates nunjucks phantomjs phplint slimerjs stylint stylint-json-reporter stylus ttf2woff xo
```

### 3. Install Yarn for node packet management

See the install option for your OS: [here](https://yarnpkg.com/en/docs/install)

### 4. Make sure you have Gulp 4 beta

```bash
# Uninstall previous Gulp installation, if any
$ yarn global remove gulp
$ cd [your_project_root]
$ yarn remove gulp

# Install the latest Gulp 4 CLI tools globally
$ yarn global add gulpjs/gulp-cli

# Install Gulp 4 into your project
$ yarn add gulpjs/gulp.git#4.0 --dev

# Check the versions installed
$ gulp -v
---
[10:48:35] CLI version 1.2.2
[10:48:35] Local version 4.0.0-alpha.2
```

## How to start

Run in this order:

```bash
yarn
gulp
```

to generate all assets for a development deployment and enter watch mode.

### These files & folders are dynamically generated

```bash
bower_components    -> Needed for development
node_modules        -> Needed for development
www                 -> This is where your project gets deployed
tests/regression    -> Regression testing files
```

## What's included

* Stylus -> compilation to CSS
* Javascript with jQuery
* Handlebars (helpers, partials and templates) -> compilation to JS
* SVG Sprites -> automatic Stylus icon and Stylus files generation
* Image optimization -> automatic optimization without significant loss of quality
* Font generation from TTF -> WOFF, WOFF2
* Dependencies management via bower -> automatic injection of CSS and JS dependencies into the project
* Concatenation & minification (CSS, JS, HTML)
* Critical CSS -> generation and injection into HTML
* Composer install -> automatic install of composer dependencies
* Development mode -> Complete with JS, HTML, PHP, Stylus linters, Watch and BrowserSync integration
* Production mode -> Includes optimizations, minifications and critical CSS
* Regression testing with BackstopJS
* Git version bumping
* Notifications -> via native OS notification system
* Separate build folder -> 1 command creates a ready for deployment build

## What can it do

### 1. Run Production flow

By default the flow runs in development mode and starts to watch for changes.
Run `gulp --env production` to enable production flow. This runs minfier and image optimization plugins.

### 2. Run Development Flow Without Watch

Run `gulp --env development` to run the development flow once, without entering watch mode.

### 3. Gulp Clean Flow

Run `gulp clean` to clean out any dynamically generated files.

### 4. Run In Debug Mode

Run `gulp --debug true` to enable certain debug flags. Note that just some plugins have debug flags.

## Inject Critical CSS

*Note: injecting happens in the `--env production` task automatically*

Run:

1. `gulp --env production`

## Regression testing

### To get regression testing up and running

1. Install smimerjs: `yarn global add slimerjs`
2. Install casper: `yarn global add casperjs`
3. Install backstopjs: `yarn global add backstopjs`
4. Regression initial config:
    * `gulp backstop:config`
    * Edit/Insert required scenarios in `backstop.json`.

### To test for regressions

1. Create Regression reference:
    * `gulp backstop:reference`
2. Run a regression test:
    * `gulp backstop`
3. Bless files (if we have older reference files):
    * `gulp backstop:bless`
4. Open regression report:
    * `gulp backstop:report`

## Google Lighthouse report

1. Configure `url` and `routes` in `gulpfile.js/common/paths.js`.
2. Run `gulp lighthouse` or `gulp lighthouse:crawl` for a full website report

## Bump Project Version

Run:

1. `gulp bump` to bump package.json & bower.json version to a patch version (0.0.x)
2. `gulp bump:minor` to bump package.json & bower.json version to a minor version (0.x.0)
3. `gulp bump:major` to bump package.json & bower.json version to a major version (x.0.0)

## Update Project Dependencies

Run:

1. `yarn run check-npm-updates` to check for node modules updates
2. `yarn run check-npm-updates` to check for node modules updates
3. `yarn run update-npm-modules` to update package.json with the new node module versions and install all non-breaking module updates.
4. `yarn run update-bower-modules` to update bower.json with the new bower module versions and install all non-breaking module updates.

## DISCLAIMER

We know it's not complete, not well documented. We're working on it :). You'll need knowledge of node, gulp, bower and Stylus to master this.
