# Nunjucks static templates

Create your Nunjucks templates here.

## Tasks and Files
```
gulpfile.js/tasks/nunjucks
gulpfile.js/tasks/critical
gulpfile.js/tasks/minify
gulpfile.js/tasks/lint
```

1. `gulp nunjucks` - Compiles Nunjucks static files to HTML and places them in './www/' preserving the `views` `folder structure.
2. `gulp critical` - Generates critical CSS for all files in the `./www` folder and injects it into them.
3. `gulp minify` - Minifies all HTML files in the `./www` folder.
4. `gulp lint` - Lints all Nunjucks templates for errors.


