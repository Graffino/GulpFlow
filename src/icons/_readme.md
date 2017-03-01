# SVG Icons

Drop your SVG icons here. The name of the file will be available in stylus as an icon class. E.g.: `.icon.-placeholder`.

## Tasks and Files
```
gulpfile.js/tasks/sprite
```
This task compiles SVGs into a single `sprite.svg` file and creates a `/stylus/vendor/sprite.styl` file according to `/stylus/vendor/sprite-template.hbs` handlebars template. 

Every icon can be referenced directly in HTML:

```
<svg class="icon">
  <use xlink:href="icons/symbol/svg/sprite.symbol.svg#placeholder" />
</svg>
```

or, be referenced via class:

```
<span class="icon -placeholder"></span>
```

or, extended via Stylus:

```
.search {
	@extends .icon.-placeholder;
}
```

When referencing remote sprites in IE via `use` you have to use the `/js/modules/svg-handler.js` polyfill.


### More info: 
1. https://css-tricks.com/svg-symbol-good-choice-icons/
2. https://cloudfour.com/thinks/our-svg-icon-process/
3. https://github.com/Keyamoon/svgxuse

