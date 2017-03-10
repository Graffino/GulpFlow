/**
 * Name: Placeholder
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mathiasbynens/jquery-placeholder
 */


$.extend($graffino, {
  select2: {
    name: 'select2',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $formFields: undefined,
      select2Class: '.js-select',
      parentClass: 'select2-parent'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      vars.$formFields = $(vars.select2Class);

      if (_that.isOnPage(vars.$formFields)) {
        vars.$formFields.each(function () {
          var $el = $(this),
            options = {
              dropdownParent: $el.parent()
            };

          // Make sure parent has position relative by adding class
          $el.parent().addClass(vars.parentClass);

          // Check if search is enabled
          if ($el.attr('data-search') === 'false') {
            $.extend(options, {
              minimumResultsForSearch: -1
            });
          }

          // Check if we have a placeholder
          if ($el.attr('data-placeholder') === 'false') {
            $.extend(options, {
              placeholder: {
                id: -1,
                text: $el.attr('data-placeholder')
              }
            });
          }

          // Initialize select2 plugin with options object
          $el.select2(options)
          // Append a span with the "icon" class
          .next('.select2').find('.select2-selection__arrow')
          .append('<span class="icon"></span>');

          if ($el.attr('data-extra-class') !== undefined) {
            $el.next(vars.select2Class).addClass($el.attr('data-extra-class'));
          }
        });

        _this.log('Initialized.');
      } else {
        _this.log('No elements found in DOM.');
      }
    }
  }
});
