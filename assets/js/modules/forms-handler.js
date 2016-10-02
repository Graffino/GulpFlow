//
// Name: Forms Handler
// Author: Graffino (http://www.graffino.com)
//

/* global $graffino */

/* eslint
    block-scoped-var: 0,
    no-return-assign: 0,
    no-else-return: 0,
    no-negated-condition: 0,
    no-lonely-if: 0 */

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
        init: function () {
            var _that = $graffino,
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
        initNotEmptyClass: function ($fields) {
            $fields.each(function (index, el) {
                $(el).on('keyup change', function (e) {
                    if (e.target.value.replace(/^\s+/g, '').length) {
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
