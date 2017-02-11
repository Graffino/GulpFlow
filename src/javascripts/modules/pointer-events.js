/**
 * Name: Pointer events
 * Author: Graffino (http://www.graffino.com)
 */


/* global $graffino, PointerEventsPolyfill */

/* eslint
  block-scoped-var: 0,
  no-return-assign: 0,
  no-else-return: 0,
  no-negated-condition: 0,
  no-lonely-if: 0
*/

$.extend($graffino, {
  pointerEvents: {
    name: 'pointer-events',

    // Plugin options
    options: {
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {},

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this;

      _this.log('Pointer events polyfill initialized.');

      // Initialize polyfill for links
      PointerEventsPolyfill.initialize({
        selector: 'a'
      });
      // Initialize polyfill for spans
      PointerEventsPolyfill.initialize({
        selector: 'span'
      });
      // Initialize polyfill for divs
      PointerEventsPolyfill.initialize({
        selector: 'div'
      });

      // Disable pointer events on iOS drag to prevent scroll stopping when
      // dragging on form elements (iOS workaround)
      if ($.browser.mobile) {
        _this.setPointerEvents('none');

        _that.vars.$document.on('touchstart', function () {
          _this.setPointerEvents('auto');
        });

        _that.vars.$document.on('touchmove', function () {
          _this.setPointerEvents('none');
        });

        _that.vars.$document.on('touchend', function () {
          setTimeout(function () {
            _this.setPointerEvents('none');
          }, 1000);
        });
      }
    },

    setPointerEvents: function (pointerEventsValue) {
      var $nodes = $('input, textarea');
      $.each($nodes, function (i, $node) {
        $($node).css('pointer-events', pointerEventsValue);
      });
    }
  }
});
