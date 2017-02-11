/**
 * Name: Scroll handler
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
  scrollHandler: {
    name: 'scroll-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      instant: [],
      throttled: [],
      onstop: [],
      scrollEvent: false,
      delay: 250,
      timeoutID: 0,
      intervalID: 0
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized. Scroll event added to the [window] object.');

      // Check for scroll function
      _that.vars.$window.scroll(function () {
        vars.scrollEvent = true;
        // Clear Timeout
        clearTimeout(vars.timeoutID);
        vars.timeoutID = setTimeout(function () {
          // Fire after scroll stopped for 250ms
          _this.onstopScroll();
        }, vars.delay);
        // Fire instantly (performance issue)
        _this.instantScroll();
      });

      // Fire on scroll in 250ms intervals
      vars.intervalID = setInterval(function () {
        if (vars.scrollEvent) {
          _this.throttledScroll();
          // Reset scroll count
          vars.scrollEvent = false;
        }
      }, vars.delay);
    },

    // Fire instantly (performance issue)
    instantScroll: function () {
      $graffino.callFuncArray(this.vars.instant);
    },

    // Fire after scroll stopped for 250ms
    onstopScroll: function () {
      $graffino.callFuncArray(this.vars.onstop);
    },

    // Fire on scroll in 250ms intervals
    throttledScroll: function () {
      $graffino.callFuncArray(this.vars.throttled);
    }
  }
});
