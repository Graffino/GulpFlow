/**
 * Name: Textarea
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  textarea: {
    name: 'textarea',

    // Plugin options
    options: {
      autoInit: true,
      debug: true
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
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            })
            .height(this.scrollHeight);
        }).on('input', function () {
          $(this)
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            })
            .height(this.scrollHeight);
        });
        _this.log('Initialized.');
      } else {
        _this.log('No elements found in DOM.');
      }
    }
  }
});
