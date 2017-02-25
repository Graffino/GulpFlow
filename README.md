# GulpFlow 3
Gulp basic flow we use at Graffino. This site uses *Stylus* and it's deployed with *Gulp*.

## Before you start ##

1. Explore `/gulpfile.js/config.js` and `/gulpfile.js/modules/paths.js`
2. Read `_readme.md` files in project's main folders to better understand what's going on in the background.
3. Run `gulp --tasks` to see all available tasks.

## Install Node ##

### 1 (macOS). Make sure you have the latest node version

```
# Use Homebrew to install node
$ brew install nodejs
```

### 1 (Linux). Make sure you have the latest node version

```
# Clear NPM's cache
$ npm cache clean -f
# Install a little helper called 'n'
$ npm install -g n
# Install latest node stable version
$ sudo n stable
```

### 1 (Windows). Make sure you have the latest node version
```
# Get & Install NodeJS 6.x.x
https://nodejs.org/download/release/v6.x.x/
```

### 2. Install Python (Windows)
```
# Get & Install Python 2.7.11  
https://www.python.org/downloads/release/python-2711/
```

### 3. Install Yarn for node packet management

```
$ npm install yarn -g
```

### 4. Make sure you have Gulp 4 beta

```
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

## How to start ##

Run in this order:
```
yarn
gulp
```

to generate all assets for a development deployment and enter watch mode.


#### These files & folders are dynamically generated: ####

```
bower_components    -> Needed for development
node_modules        -> Needed for development
www                 -> This is where your project gets deployed
tests/regression    -> Regression testing files
```

## What's included ##
1. Stylus -> compilation to CSS
2. Javascript with jQuery
3. Handlebars (helpers, partials and templates) -> compilation to JS
4. SVG Sprites -> automatic stylus icon and stylus files generation
5. Image optimization -> automatic optimization without significant loss of quality
6. Font generation from TTF -> WOFF, WOFF2
7. Dependencies management via bower -> automatic injection of CSS and JS dependencies into the project
8. Concatenation & minification (CSS, JS, HTML)
9. Critical CSS -> generation and injection into HTML
10. Development mode -> Complete with JS, HTML, Stylus linters, Watch and BrowserSync integration
11. Production mode -> Includes optimizations, minifications and critical CSS
12. Regression testing with BackstopJS
13. Git version bumping
14. Notifications -> via native OS notification system
15. Separate build folder -> 1 command creates a ready for deployment build

## What can it do? ##

#### 1. Run Production Flow ####
By default the flow runs in development mode and starts to watch for changes.
Run `gulp --env production` to enable production flow. This runs minfier and image optimization plugins.

#### 2. Run Development Flow Without Watch ####
Run `gulp --env development` to run the development flow once, without entering watch mode.

#### 3. Gulp Clean Flow ####
Run `gulp clean` to clean out any dynamically generated files.

#### 4. Run In Debug Mode ####
Run `gulp --debug true` to enable certain debug flags. Note that just some plugins have debug flags.

## Inject Critical CSS ##
*Note: injecting happens in the `--env production` task automatically*

Run:

1. `gulp --env production`

## Regression testing ##

#### To get regression testing up and running: ####

1. Install smimerjs: `yarn global add slimerjs`
2. Install casper: `yarn global add casperjs`
3. Install backstopjs: `yarn global add backstopjs`
4. Regression initial config:
    - `gulp backstop:config`
    - Edit/Insert required scenarios in `backstop.json`.

#### To test for regressions ####
1. Create Regression reference:
    - `gulp backstop:reference`
2. Run a regression test:
    - `gulp backstop`
3. Bless files (if we have older reference files):
    - `gulp backstop:bless`
4. Open regression report:
    - `gulp backstop:report`


## Google Lighthouse report ##

1. Configure `url` in `gulpfile.js/common/paths.js`.
2. Run `gulp lighthouse`

## Bump Project Version ##

Run:

1. `gulp bump` to bump package.json & bower.json version to a patch version (0.0.x)
2. `gulp bump:minor` to bump package.json & bower.json version to a minor version (0.x.0)
3. `gulp bump:major` to bump package.json & bower.json version to a major version (x.0.0)


## Update Project Dependencies ##

Run:

1. `yarn run check-npm-updates` to check for node modules updates
2. `yarn run check-npm-updates` to check for node modules updates
3. `yarn run update-npm-modules ` to update package.json with the new node module versions and install all non-breaking module updates.
4. `yarn run update-bower-modules ` to update bower.json with the new bower module versions and install all non-breaking module updates.


#### DISCLAIMER ####
We know it's not complete, not well documented. We're working on it :). You'll need knowledge of node, gulp, bower and stylus to master this.
