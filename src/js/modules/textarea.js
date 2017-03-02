/**
 * Name: Placeholder
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mathiasbynens/jquery-placeholder
 */


$.extend($graffino, {
  textarea: {
    name: 'textarea',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $formFields: $('.js-textarea')
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      if (_that.isOnPage(vars.$formFields)) {
        vars.$formFields.each(function () {
          $(this)
            .height(this.scrollHeight)
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            });
        }).on('input', function () {
          $(this)
            .height(this.scrollHeight)
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            });
        });
        _this.log('Initialized.');
      } else {
        _this.log('No elements found in DOM.');
      }
    }
  }
});
