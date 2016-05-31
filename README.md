# GulpFlow 2
Gulp basic flow we use at Graffino. This site uses *Stylus* and it's deployed with *Gulp.*

## Before you start ##

### 1. Make sure you have Gulp 4 beta

```
# Uninstall previous Gulp installation, if any
$ npm uninstall gulp -g
$ cd [your_project_root]
$ npm uninstall gulp

# Install the latest Gulp 4 CLI tools globally
$ npm install gulpjs/gulp-cli -g

# Install Gulp 4 into your project
$ npm install gulpjs/gulp.git#4.0 --save-dev

# Check the versions installed
$ gulp -v
---
[10:48:35] CLI version 1.2.1
[10:48:35] Local version 4.0.0-alpha.2
```

### 2. Make sure you have the latest node version

```
# Clear NPM's cache
$ npm cache clean -f
# Install a little helper called 'n'
$ npm install -g n
# Install latest node stable version
$ sudo n stable

```

## How to start ##

Run in this order:
```
npm install
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

## What can it do? ##

#### 1. Run Production Flow ####
By default the flow runs in development mode and starts to watch for changes.
Run `gulp build --env production` to enable production flow. This runs minfier and image optimisation plugins.

#### 2. Run Development Flow Without Watch ####
Run `gulp build --env development` to run the development flow without once, and not enter watch mode.

#### 3. Gulp Clean Flow ####
Run `gulp clean` to clean out any dynamically generated files.

#### 4. Run In Debug Mode ####
Run `gulp build --debug true` to enable certain debug flags. Note that just some plugins have debug flags.

## Inject Critical CSS ##
*This is still WIP*

Run:

1. `gulp build --env production`
2. `gulp critical`

## Regression testing ##

#### To get regression testing up and running: ####

1. Install smimerjs: `npm install -g slimerjs`
2. Install casper: `npm install -g casperjs`
3. Initialize backstopjs:
    - `cd ./node_modules/backstopjs/ `
    - `npm install`
4. Regression initial config:
    - `npm run regression-config`
    - Edit/Insert required scenarios in `backstop.json`.

#### To test for regressions ####
1. Create Regression reference:
    - `npm run regression-reference`
2. Run a regression test:
    - `npm run regression-test`
3. Bless files (if we have older reference files):
    - `npm run regression-bless`
4. Open regression report:
    - `npm run regression-report`


## Bump Project Version ##

Run:

1. `gulp bump` to bump package.json & bower.json version to a patch version (0.0.x)
2. `gulp bump:minor` to bump package.json & bower.json version to a minor version (0.x.0)
3. `gulp bump:major` to bump package.json & bower.json version to a major version (x.0.0)


## Update Project Dependencies ##

Run:

1. `npm run check-npm-updates` to check for node modules updates
2. `npm run check-npm-updates` to check for node modules updates
3. `npm run update-npm-modules ` to update package.json with the new node module versions and install all non-breaking module updates.
4. `npm run update-bower-modules ` to update bower.json with the new bower module versions and install all non-breaking module updates.


#### DISCLAIMER ####
We know it's not complete, not well documented. We're working on it :). You'll need knowledge of node, gulp, bower and stylus to master this.
