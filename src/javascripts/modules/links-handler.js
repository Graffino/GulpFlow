//
// Name: Links handler
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
    linksHandler: {
        name: 'links-handler',

        // Plugin options
        options: {
            autoInit: true,
            debug: false
        },

        // Scoped variables
        vars: {},

        // Init method
        init: function () {
            // Open in new window links with rel=external code
            $('a[rel="external"]').attr('target', '_blank');
            // Prevent default action on # (hash) links
            $('a[href="#"]').on('click', function (e) {
                // Prevent the default "go-to" action
                e.preventDefault();
            });

            this.log('Initialized.');
        }
    }
});
