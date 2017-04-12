/**
 * Name: Method Template
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  formLabels: {
    name: 'form-labels',

    // Plugin options
    options: {
      autoInit: true,
      debug: true
    },

    // Scoped variables
    vars: {
      $formFields: $('.js-form-field')
    },

    // Init method
    init() {
      const _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (vars.$formFields.length > 0) {
        // Calling private method
        _this.initNotEmptyClass(vars.$formFields);

        _this.log('\t\u2514', vars.$element);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    // Function that checks if the value of an input is empty or not
    // The event is fired on 'keyup' and 'change'
    initNotEmptyClass($fields) {
      const _this = this;

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

      _this.log('Method [initNotEmptyClass] has been called.');
    }
  }
});
