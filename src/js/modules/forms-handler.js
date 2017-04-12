/**
 * Name: Forms Handler
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  formsHandler: {
    name: 'forms-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $formFields: $('.js-form-field')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$formFields)) {
        _this.initNotEmptyClass(vars.$formFields);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    // Function that checks if the value of an input is empty or not
    // The event is fired on 'keyup' and 'change'
    initNotEmptyClass($fields) {
      $fields.each((index, el) => {
        $(el).on('keyup change', event => {
          if (event.target.value.replace(/^\s+/g, '').length > 0) {
            $(el).addClass('is-not-empty');
            $(el).removeClass('is-empty');
          } else {
            $(el).addClass('is-empty');
            $(el).removeClass('is-not-empty');
          }
        });
      });
    }
  }
});
