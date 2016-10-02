//
// Name: Validate
// Author: Graffino (http://www.graffino.com)
// Plugin: Plugin: https://github.com/ericelliott/h5Validate
//

/* global $graffino */

/* eslint
    block-scoped-var: 0,
    no-return-assign: 0,
    no-else-return: 0,
    no-negated-condition: 0,
    no-lonely-if: 0 */

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
            $forms: $('.js-validate')
        },

        // Init method
        init: function () {
            var _that = $graffino,
                _this = this,
                vars = this.vars;

            _this.log('Initialized.');

            if (_that.isOnPage(vars.$forms)) {
                vars.$forms.each(function (index) {
                    var $form = $(this),
                        isValid = false;
                    // Init h5-validate
                    $form
                        .h5Validate()
                        .attr('data-h5-valid', $form.get(0).checkValidity())
                        .on('submit change', function () {
                            isValid = $form.get(0).checkValidity();
                            $form.attr('data-h5-valid', isValid);
                        });

                    // Outputting the form information to console
                    _this.log('\n\t\u251c h5-Validate was enabled for form id ' + index + '.');
                    if (_this.options.debug && _that.options.debug) {
                        console.log('\t\u2514', $form);
                    }
                });
            } else {
                _this.log('No elements found in DOM.');
            }
        }
    }
});
