/**
 * Name: Grid debugger
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  gridDebug: {
    name: 'grid-debug',

    // Plugin options
    options: {
      hook: 'HELPERS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      gridDebugStateClass: 'is-debug',
      consoleStateClass: 'is-console',
      $grid: $('.grid')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars,
        hasLocalStorage = _that.hasStorage();

      _this.log('Initialized. Press keys F2 and F3 to interact.');

      // Check localStorage if element was left active last time
      if (hasLocalStorage) {
        // If yes turn the grid on
        if (localStorage.isGridActive === 'true') {
          vars.$grid.addClass(vars.gridDebugStateClass);
        // If not then make sure it's off
        } else {
          vars.$grid.removeClass(vars.gridDebugStateClass);
        }

        // If yes turn the console on
        if (localStorage.isConsoleActive === 'true') {
          _that.vars.$body.addClass(vars.consoleStateClass);
        // If not then make sure it's off
        } else {
          _that.vars.$body.removeClass(vars.consoleStateClass);
        }
      } // End if

      // Adding key press event for On/Off function
      _that.vars.$document.keydown(event => {
        // If F2 key is pressed
        if (event.which === 113) {
          // Hide/show the grid
          vars.$grid.toggleClass(vars.gridDebugStateClass);
          // Store current state in LocalStorage
          if (hasLocalStorage) {
            if (vars.$grid.hasClass(vars.gridDebugStateClass)) {
              localStorage.isGridActive = true;
            } else {
              localStorage.isGridActive = false;
            }
          }
          return false;
        } // End if

        // If F3 key is pressed
        if (event.which === 114) {
          // Hide/show the grid
          _that.vars.$body.toggleClass(vars.consoleStateClass);
          // Store current state in LocalStorage
          if (hasLocalStorage) {
            if (_that.vars.$body.hasClass(vars.consoleStateClass)) {
              localStorage.isConsoleActive = true;
            } else {
              localStorage.isConsoleActive = false;
            }
          }
          return false;
        } // End if
      }); // End of keydown();
    }
  }
});
