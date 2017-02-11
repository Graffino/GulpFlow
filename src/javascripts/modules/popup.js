/**
 * Name: Popup
 * Author: Graffino (http://www.graffino.com)
 */


/* global $graffino */

/* eslint
  block-scoped-var: 0,
  no-return-assign: 0,
  no-else-return: 0,
  no-negated-condition: 0,
  no-lonely-if: 0
*/

$.extend($graffino, {
  popup: {
    name: 'popup',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $popup: $('.js-popup'),
      $anchor: $('.js-popup-anchor'),
      $close: $('.js-popup-close')
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$popup)) {
        vars.$anchor.magnificPopup({
          type: 'inline',
          modal: true,
          mainClass: 'mfp-fade'
        });

        vars.$close.on('click', function (e) {
          e.preventDefault();
          $.magnificPopup.close();
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
