//
// Name: Placeholder
// Author: Graffino (http://www.graffino.com)
// Plugin: https://github.com/mathiasbynens/jquery-placeholder
//

/* global $graffino */

/* eslint
    block-scoped-var: 0,
    no-return-assign: 0,
    no-else-return: 0,
    no-negated-condition: 0,
    no-lonely-if: 0 */

$.extend($graffino, {
    placeholder: {
        name: 'placeholder',

        // Plugin options
        options: {
            autoInit: false,
            debug: false
        },

        // Scoped variables
        vars: {
            $formFields: $('input, textarea')
        },

        // Init method
        init: function () {
            var _that = $graffino,
                _this = this,
                vars = this.vars;

            if (_that.isOnPage(vars.$formFields)) {
                vars.$formFields.placeholder();
                _this.log('Initialized.');
            } else {
                _this.log('No elements found in DOM.');
            }
        }
    }
});
