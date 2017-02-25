# Stylus files

All stylus stylesheets, live here. 

## Tasks and Files
```
gulpfile.js/tasks/stylus
gulpfile.js/tasks/bower
gulpfile.js/tasks/bundle
gulpfile.js/tasks/minify
gulpfile.js/tasks/lint
```

1. `gulp stylus` - Compiles your stylus files into `./www/css/common/app.css`
2. `gulp bower` - Gets all your bower dependencies and saves them as `./www/css/vendor/bower.css`
3. `gulp bundle` - Concatenates everyting except `main*.css` from your `./www/css/` folder to `./www/css/main.css`
4. `gulp minify` - Uglyfies and minifies everyting `./www/js/main.css` file folder to `./www/js/main.min.css`
5. `gulp lint` - Lints all CSS files for errors.