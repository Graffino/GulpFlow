# Archived - You have served us well for the past 4 years, checkout [Ninja](https://graffino.ninja).

# GulpFlow 4


Gulp basic flow we use at Graffino. This site uses *Stylus* and it's deployed with *Gulp*.

## Before you start

1. Explore `/gulpfile.js/config.js` and `/gulpfile.js/modules/paths.js`
2. Read `_readme.md` files in project's main folders to better understand what's going on in the background.
3. Run `gulp --tasks` to see all available tasks.

## Install Node

### 1 (macOS)

#### Make sure you have *NodeJS 9.11.2*

```bash
# Use Homebrew to install node
brew install n
n 9.11.2
```

### 1 (Linux)

#### Make sure you have *NodeJS 9.11.2*

```bash
# Install a little helper called 'n'
npm install -g n
# Install latest supported node version
sudo n 9.11.2
```

### 1 (Windows). Works only with Windows Linux Subsystem

- This might not work on Windows. We highly suggest you install these on a linux virtual machine / docker instance.

#### Make sure you have *NodeJS 9.11.2*

```bash
# Get & Install NodeJS 9.11.2
https://nodejs.org/download/release/v9.11.2/
```

#### Install Node Build Tools (Windows - May be outdated / may not work)

```bash
# Start Console with Administrator privileges
$ npm install --global --production windows-build-tools
$ npm config set msvs_version 2015
$ npm config set python %USERPROFILE%\.windows-build-tools\python27\python.exe
```

### 2. Suggested global npm packages

```bash
# Install global npm modules
npm install -g babel-cli backstopjs bower browser-sync critical eslint gulp-cli htmlhint lighthouse npm-check-updates nunjucks phantomjs phplint slimerjs stylint stylint-json-reporter stylus ttf2woff xo
```

### 3. Install Yarn for node packet management

See the install option for your OS: [here](https://yarnpkg.com/en/docs/install)

### 4. Make sure you have Gulp 4

```bash
# Install the latest Gulp 4 CLI tools globally
npm -g install gulp-cli

# Check the versions installed
gulp -v
---
CLI version 2.2.0
Local version 4.0.2
```

### 5. Install node modules (in project root folder)

```bash
yarn
```

## How to start in development watch mode

```bash
gulp --env development
# or just
gulp
```

to generate all assets for a development deployment and enter watch mode.

### These files & folders are dynamically generated

```bash
bower_components    -> Needed for development
node_modules        -> Needed for development
www                 -> This is where your project gets deployed (also final Wordpress theme)
tests/regression    -> Regression testing files
```

## What's included

- Stylus -> compilation to CSS
- Javascript with jQuery
- Nunjucks (helpers, partials and templates) -> compilation to JS
- SVG Sprites -> automatic Stylus icon and Stylus files generation
- Image optimization -> automatic optimization without significant loss of quality
- Font generation from TTF -> WOFF, WOFF2
- Dependencies management via bower -> automatic injection of CSS and JS dependencies into the project
- Concatenation & minification (CSS, JS, HTML)
- Critical CSS -> generation and injection into HTML
- Composer install -> automatic install of composer dependencies
- Development mode -> Complete with JS, HTML, PHP, Stylus linters, Watch and BrowserSync integration
- Production mode -> Includes optimizations, minifications and critical CSS
- Regression testing with BackstopJS
- Git version bumping
- Notifications -> via native OS notification system
- Separate build folder -> 1 command creates a `www` folder ready for deployment build
- Wordpress theme build system

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

Run `gulp critical`.

## PHP composer support for automatic dependencies management in Gulp

- Gulp will search for any composer files and execute them when Wordpress build is enabled.

```bash
# Install composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

## Regression testing

### To get regression testing up and running

1. Install smimerjs: `npm -g install slimerjs`
2. Install casper: `npm -g install casperjs`
3. Install backstopjs: `npm -g install backstopjs`
4. Regression initial config:
    - `gulp backstop:config`
    - Edit/Insert required scenarios in `backstop.json`.

### To test for regressions

1. Create Regression reference:
    - `gulp backstop:reference`
2. Run a regression test:
    - `gulp backstop`
3. Bless files (if we have older reference files):
    - `gulp backstop:bless`
4. Open regression report:
    - `gulp backstop:report`

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

1. `npm run check-npm-updates` to check for node modules updates
2. `npm run check-npm-updates` to check for node modules updates
3. `npm run update-npm-modules` to update package.json with the new node module versions and install all non-breaking module updates.
4. `npm run update-bower-modules` to update bower.json with the new bower module versions and install all non-breaking module updates.

## DISCLAIMER

We know it's not complete, not well documented. You'll need knowledge of node, gulp, bower and Stylus to master this.
