/**
 * Name: Color Picker
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  colorPicker: {
    name: 'color-picker',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: undefined,
      elementClass: '.js-colorpicker',
      swatchClass: '.js-colorpicker-swatch',
      placeholderClass: '.js-colorpicker-placeholder'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');
      vars.$element = $(vars.elementClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        vars.$element.each(function () {
          var $el = $(this),
            $colorpicker,
            $swatch = $el.siblings(vars.swatchClass),
            $placeholder = $el.siblings(vars.placeholderClass);
          // Create an instance of the color picker object
          $colorpicker = $.farbtastic($placeholder, {
            // What to do when the color changes
            // Custom function for user interaction
            callback: function (value) {
              // Apply the color only after the colorpicker has been initialized
              if ($colorpicker !== undefined) {
                // Change the input value and trigger the change event
                $el.val(value).trigger('change');
                // Change the swatch color
                $swatch.css('border-color', value);
              }
            },
            width: 192
          });

          $el.on('change', function (e) {
            e.preventDefault();
            $colorpicker.setColor($el.val());
            _this.log('Input (' + $el.attr('name') + ') — color was changed to: ' + $el.val() + '.');
          });

          // Set the saved color at init
          $colorpicker.setColor($el.val());
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
