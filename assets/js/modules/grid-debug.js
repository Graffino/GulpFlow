//
// Name: Grid debugger
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
    gridDebug: {
        name: 'grid-debug',

        // Plugin options
        options: {
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
        init: function () {
            var _that = $graffino,
                _this = this,
                vars = this.vars,
                hasLocalStorage = _that.hasStorage();

            _this.log('Initialized. Press keys F2 and F3 to interact.');

            // check localStorage if element was left active last time
            if (hasLocalStorage) {
                // if yes turn the grid on
                if (localStorage.isGridActive === 'true') {
                    vars.$grid.addClass(vars.gridDebugStateClass);
                // if not then make sure it's off
                } else {
                    vars.$grid.removeClass(vars.gridDebugStateClass);
                }

                // if yes turn the console on
                if (localStorage.isConsoleActive === 'true') {
                    _that.vars.$body.addClass(vars.consoleStateClass);
                // if not then make sure it's off
                } else {
                    _that.vars.$body.removeClass(vars.consoleStateClass);
                }
            } // end if

            // Adding key press event for On/Off function
            _that.vars.$document.keydown(function (e) {
                // If F2 key is pressed
                if (e.which === 113) {
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
                } // end if

                // If F3 key is pressed
                if (e.which === 114) {
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
                } // end if
            }); // end of keydown();
        }
    }
});
