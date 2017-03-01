# JS and Nunjucks dynamic templates

All your JS lives here. 

## Tasks and Files
```
gulpfile.js/tasks/js
gulpfile.js/tasks/bower
gulpfile.js/tasks/nunjucks
gulpfile.js/tasks/bundle
gulpfile.js/tasks/minify
gulpfile.js/tasks/lint
```

1. `gulp js` - Converts your code to ES6 and copies it to `./www/js/`
2. `gulp bower` - Gets all your bower dependencies and saves them as `./www/js/vendor/bower.js`
3. `gulp nunjucks` - Compiles all Nunjucks dynamic templates from `./src/js/templates/`and saves them as `./www/js/vendor/templates.js`
4. `gulp bundle` - Concatenates everyting except `main*.js` from your `./www/js/` folder to `./www/js/main.js`
5. `gulp minify` - Uglyfies and minifies everyting `./www/js/main.js` file folder to `./www/js/main.min.js`
6. `gulp lint` - Lints all JS files for errors.
