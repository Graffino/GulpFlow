/**
 * Name: Resize handler
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  resizeHandler: {
    name: 'resize-handler',

    // Plugin options
    options: {
      hook: 'HANDLERS',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      instant: [],
      throttled: [],
      onstop: [],
      resizeEvent: false,
      delay: 250,
      timeoutID: 0,
      intervalID: 0
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized. Resize event added to the [window] object.');

      // Check for resize function
      _that.vars.$window.resize(() => {
        vars.resizeEvent = true;
        // Clear Timeout
        clearTimeout(vars.timeoutID);
        vars.timeoutID = setTimeout(() => {
          // Fire after resize stopped for 250ms
          _this.onstopResize();
        }, vars.delay);
        // Fire instantly (performance issue)
        _this.instantResize();
      });

      // Fire on resize in 250ms intervals
      vars.intervalID = setInterval(() => {
        if (vars.resizeEvent) {
          _this.throttledResize();
          // Reset resize count
          vars.resizeEvent = false;
        }
      }, vars.delay);
    },

    // Fire instantly (performance issue)
    instantResize() {
      $graffino.callFuncArray(this.vars.instant);
    },

    // Fire after resize stopped for 250ms
    onstopResize() {
      $graffino.callFuncArray(this.vars.onstop);
    },

    // Fire on resize in 250ms intervals
    throttledResize() {
      $graffino.callFuncArray(this.vars.throttled);
    }
  }
});
