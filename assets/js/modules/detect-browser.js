//
// Name: Browser Detection
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
    detectBrowser: {
        name: 'detect-browser',

        // Plugin options
        options: {
            autoInit: false,
            debug: false
        },

        // Scoped variables
        vars: {
            variable: 'value'
        },

        // Init method
        init: function () {
            var _that = $graffino,
                _this = this,
                classes = '';

            // Check for browser information and build classes string
            classes += $.browser.msie ? 'browser-ie browser-ie' + $.browser.versionNumber : '';
            classes += $.browser.msedge ? ' browser-edge' : '';
            classes += $.browser.mozilla ? ' browser-moz' : '';
            classes += $.browser.chrome ? ' browser-chrome' : '';
            classes += $.browser.safari ? ' browser-safari' : '';
            classes += $.browser.ipad || $.browser.ipod || $.browser.iphone ? ' browser-ios' : '';
            classes += $.browser.desktop ? ' browser-desktop' : '';
            classes += $.browser.mobile ? ' browser-mobile' : '';
            classes += $.browser.win ? ' browser-windows' : '';
            classes += $.browser.mac ? ' browser-mac' : '';

            // Remove the first space from the string, if exists
            classes = /^\s/.test(classes) ? classes.substr(1) : classes;

            // Adding the classes to the html element
            _that.vars.$html.addClass(classes);
            _this.log('Initialized. Class(es) [' + classes + '] added to the [html] object.');
        }
    }
});
