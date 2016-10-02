//
// Name: IsInView
// Author: Graffino (http://www.graffino.com)
//

/* global $graffino */

/* eslint
    block-scoped-var: 0,
    no-return-assign: 0,
    no-else-return: 0,
    no-negated-condition: 0,
    no-lonely-if: 0,
    no-unneeded-ternary: 0 */

$.extend($graffino, {
    isInView: {
        name: 'is-in-view',

        // Plugin options
        options: {
            autoInit: true,
            debug: false
        },

        // Scoped variables
        vars: {},

        // Init method
        init: function () {
            var _this = this;
            _this.log('Initialized.');
        },

        check: function (element, topActivationOffset, bottomActivationOffset) {
            topActivationOffset = topActivationOffset || 0.5;
            bottomActivationOffset = bottomActivationOffset || 0.5;
            var _that = $graffino,
                _this = this,
                el = $(element),
                windowHeight = _that.vars.$window.height(),
                scrollPos = _that.vars.$window.scrollTop(),
                topLimit = parseInt(el.offset().top - (windowHeight * topActivationOffset), 10),
                botLimit = parseInt(el.offset().top + el.outerHeight(false) - (windowHeight * bottomActivationOffset), 10),
                condition = scrollPos > topLimit && scrollPos < botLimit;
            if (condition) {
                _this.log('Item [' + $(element).attr('class') + '] in view.');
            }
            return condition;
        }
    }
});
