# GulpFlow
## Gulp basic flow we use at Graffino ##
*This site uses stylus and it's precompiled with node / Gulp.*

### DISCLAIMER ###
We know it's not complete, not well documented. We're working on it :). You'll need knowledge of node, gulp, bower and stylus to master this.

### Development Deployment ###

Run in this order:
```
npm install
gulp
```

to generate all assets for a development deployment.


### These files & folders are dynamically generated: ###

```
bower_components
node_modules

assets/js/plugins/
assets/js/main.js
assets/js/main.js.map
assets/js/main.min.js
assets/js/main.min.js.map

assets/css/
assets/images/ -> Except src folder

```

### Source files (Javascript, Stylus, Images), config files needed by node, gulp and bower: ###

```
assets/js/modules/ -> All source Javascript Files are stored here
assets/images/src -> All source images are stored here
assets/styl/ -> All source CSS (Stylus files are stored here)

bower.json -> Bower configuration
package.json -> Node configuration
gulpfile.js -> Gulp configuration
readme.md -> This file

docs -> Documentation on technologies used

```

### These files & folders are not needed for live deployment:

```
bower_components
node_modules

assets/images/src

assets/js/plugins/
assets/js/modules/
assets/js/main.js
assets/js/main.js.map
assets/js/main.min.js.map

assets/css/main.css
assets/css/main.css.map
assets/css/main.min.css.map
assets/styl/

bower.json
package.json
gulpfile.js
readme.md

docs

```

### Compilation flow when running: ###

```
Initialization
```
Run 'npm install ; gulp'

```
Gulp
```

1. Bower components are fetched and installed in /bower_components.
2. Bower libraries's main js and css files are compiled to bower.js, bower.css respectively.
3. Images are copied from source into images/.
4. SVG sprite is generated (sprite.styl, sprite.svg), sprite.styl file copied into /styl/base/, sprite.svg is copied into images/svg.
5. HTML files are linted for errors via HTMLHint according to .htmlhintrc configuration file.
6. Stylus is compiled from /assets/styl/ & CSS to /css/modules/app.css.
7. /css/modules/app.css and /css/plugins/bower.css are concatenated into /css/main.css.
8. PostCSS along with Autoprefixer, combineMq and Quantity Queries is run on /css/main.css for automatically adding needed CSS browser prefixes and minifying the css to /css/main.min.css.
9. Javascript files (/js/main.js) is linted for errors via JSHint.
10. /js/modules/app.js and /js/plugins/bower.js are concatenated into /js/main.js and then minified into /js/main.min.js.
14. Base logo, favicon, iOS icons are copied to /images.
15. A watch for changes function is launched.

```
Gulp production
```

Apart from development steps:

1. Gulp clean is being run, deleting all dynamically generated files & paths including /bower_components.
2. Any eventual modification in package.json are resolved.
3. Images are heavily optimized, compressed and copied into images/ (this might take a while).
4. Watch doesn't run on production.


```
Gulp clean
```
* Deletes all dynamically generated files & paths including /bower_components


```
Gulp test
```
* HTML, Stylus and Javascript files (/js/main.js) are linted for errors via JSHint and HTMLHint and Stylint
