/**
 * Name: Validate
 * Author: Graffino (http://www.graffino.com)
 * Plugin: Plugin: https://github.com/ericelliott/h5Validate
 */


$.extend($graffino, {
  validate: {
    name: 'validate',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $forms: undefined,
      formsClass: '.js-validate',
      smoothScrollOffset: -68
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      vars.$forms = $(vars.formsClass);

      _this.log('Initialized.');

      // Adding custom validation paterns
      $.h5Validate.addPatterns({
        'nonzero-decimal': /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/
      });

      if (_that.isOnPage(vars.$forms)) {
        setTimeout(() => {
          vars.$forms.each((index, form) => {
            const $form = $(form);
            let isValid = false;
            // Init h5-validate
            $form
            .h5Validate()
            .attr('data-h5-valid', $form.get(0).checkValidity())
            .on('submit change', () => {
              isValid = $form.get(0).checkValidity();
              $form.attr('data-h5-valid', isValid);
            });

            // Outputting the form information to console
            _this.log('\n\t\u251c h5-Validate was enabled for form id ' + index + '.');
            if (_this.options.debug && _that.options.debug) {
              console.log('\t\u2514', $form);
            }
          });
        }, 250);
      } else {
        _this.log('No elements found in DOM.');
      }
    },

    check() {
      const _that = $graffino,
        _this = this,
        vars = _this.vars;

      vars.$forms = $(vars.formsClass);
      vars.$forms.find('.ui-state-error').removeClass('ui-state-error');

      const invalidFields = _this.getInvalidFields();

      if (invalidFields.length > 0) {
        _that.smoothScroll.goTo($(invalidFields[0]), vars.smoothScrollOffset);
      }

      return vars.$forms.h5Validate('allValid');
    },

    getInvalidFields() {
      const _this = this,
        vars = _this.vars;
      let invalidFields = [];

      vars.$forms.each((index, $form) => {
        const formFields = $form.elements;
        invalidFields = invalidFields.concat(
          Object.keys(formFields)
            .filter(key => Number.isInteger(parseInt(key, 10)))
            .reduce((fields, key) => fields = fields.concat([formFields[key]]), [])
            .filter(element => element.validity.valid === false && element.clientWidth > 0 && element.clientHeight > 0)
        );
      });
      return invalidFields;
    }
  }
});
