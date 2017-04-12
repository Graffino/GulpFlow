/**
 * Name: Scroll handler
 * Author: Graffino (http://www.graffino.com)
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
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized. Scroll event added to the [window] object.');

      // Check for scroll function
      _that.vars.$window.scroll(() => {
        vars.scrollEvent = true;
        // Clear Timeout
        clearTimeout(vars.timeoutID);
        vars.timeoutID = setTimeout(() => {
          // Fire after scroll stopped for 250ms
          _this.onstopScroll();
        }, vars.delay);
        // Fire instantly (performance issue)
        _this.instantScroll();
      });

      // Fire on scroll in 250ms intervals
      vars.intervalID = setInterval(() => {
        if (vars.scrollEvent) {
          _this.throttledScroll();
          // Reset scroll count
          vars.scrollEvent = false;
        }
      }, vars.delay);
    },

    // Fire instantly (performance issue)
    instantScroll() {
      $graffino.callFuncArray(this.vars.instant);
    },

    // Fire after scroll stopped for 250ms
    onstopScroll() {
      $graffino.callFuncArray(this.vars.onstop);
    },

    // Fire on scroll in 250ms intervals
    throttledScroll() {
      $graffino.callFuncArray(this.vars.throttled);
    }
  }
});
