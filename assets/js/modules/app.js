//
// Main Javascript file
// Author: Graffino (http://www.graffino.com)
//

/**
 *  Global Vars
 */
// Linting exceptions
/* global FontFaceObserver, PointerEventsPolyfill */

// Global
var $html                      = $('html');
var $window                    = $(window);

// Check if webfonts are loaded. Set to false to prevent detection.
var fontFaceObserverName       = 'Arial';

// Scroll
var scrollPoolingDelay         = 250;
var scrollEvent                = false;

// Validate
var $validate                  = $('.js-validate');

// Placeholder
var $placeHolder               = $('input, textarea');

// All functions added in this array will be alled when the
// window.resize event will fire
var resizeFunctionsArray       = [];

/**
 * Init
 */
var graffino = {

    init: function() {
        // Console handler
        graffino.consoleHandler();

        // Links actions
        graffino.linksHandler();

        // Fonts hander
        graffino.fontsHandler();

        // Browser Detect
        // Plugin: https://github.com/gabceb/jquery-browser-plugin
        graffino.detectBrowser();
        
        // Pointer events
        // Plugin: https://github.com/kmewhort/pointer_events_polyfill
        graffino.pointerEvents();

        // Scroll events
        graffino.scrollHandler();

        // Resize events
        graffino.resizeHandler();

        // Validate
        // Plugin: https://github.com/ericelliott/h5Validate/
        graffino.validate();
        
        // Placeholder
        // Plugin: https://github.com/mathiasbynens/jquery-placeholder
        graffino.placeholder();
        
        // Call all functions in the resize function array
        graffino.callArrayFunctions(resizeFunctionsArray);
    },

    // Console handler
    consoleHandler: function () {
        // Initialize function
        function __init () {
            // Avoid `console` errors in browsers that lack a console.
            var method;
            var noop = function () {};
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var console = (window.console = window.console || {});

            while (length--) {
                method = methods[length];

                // Only stub undefined methods.
                if (!console[method]) {
                    console[method] = noop;
                }
            }
        }

        // Initialize module
        return __init();
    },

    // Links handler
    linksHandler: function() {
        // Initialize function
        function __init () {
            // Open in new window links with rel=external code
            $('a[rel="external"]').attr('target','_blank');
            // Prevent default action on # (hash) links
            $('a[href="#"]').on('click', function(e) { e.preventDefault(); });
        }

        // Initialize module
        return __init();
    },

    // Fonts handler
    fontsHandler: function() {
        // Initialize function
        function __init() {
            if (fontFaceObserverName) {
                var observer = new FontFaceObserver(fontFaceObserverName);
                // Add fonts-class when fonts are loaded
                observer.check().then( function() {
                    $html.removeClass('no-fonts')
                        .addClass('fonts');
                });
            }
        }

        // Initialize module
        return __init();
    },

    // Browser Detect
    // Plugin: https://github.com/gabceb/jquery-browser-plugin
    detectBrowser: function() {
        // Initialize function
        function __init() {
            if ($.browser.msie) {
                $html.addClass('browser-ie');
            }
            if ($.browser.msedge) {
                $html.addClass('browser-edge');
            }
            if ($.browser.mozilla) {
                $html.addClass('browser-moz');
            }
            if ($.browser.chrome) {
                $html.addClass('browser-chrome');
            }
            if ($.browser.safari) {
                $html.addClass('browser-safari');
            }
            if ($.browser.ipad || $.browser.ipod || $.browser.iphone) {
                $html.addClass('browser-ios');
            }
            if ($.browser.desktop) {
                $html.addClass('browser-desktop');
            }
            if ($.browser.mobile) {
                $html.addClass('browser-mobile');
            }
            if ($.browser.win) {
                $html.addClass('browser-windows');
            }
            if ($.browser.mac) {
                $html.addClass('browser-mac');
            }
        }
        // Initialize module
        return __init();
    },

    // Pointer events (adds support for IE)
    // Plugin: https://github.com/kmewhort/pointer_events_polyfill
    pointerEvents: function() {
    
        // Initialize function
        function __init() {
            // Initialize polyfill
            PointerEventsPolyfill.initialize({});
        
            // Disable pointer events on iOS drag to prevent scroll stopping when
            // dragging on form elements (iOS workaround)
            if ($.browser.mobile) {
                setPointerEvents('none');

                $(document).on('touchstart', function() {
                    setPointerEvents('auto');
                });

                $(document).on('touchmove', function() {
                    setPointerEvents('none');
                });

                $(document).on('touchend', function() {
                    setTimeout(function() {
                        setPointerEvents('none');
                    }, 1000);
                });
            }
        }
        
        function setPointerEvents(pointerEventsValue) {
            var $nodes = $('input, textarea');

            $.each($nodes, function(i, $node) {
                $($node).css('pointer-events', pointerEventsValue);
            });
        }
        // Initialize module
        return __init();
    },

    // Scroll handler
    scrollHandler: function() {
        // Initialize function
        function __init() {
            // Check for scroll function
            $(window).scroll(function() {
                scrollEvent = true;

                // Clear Timeout
                clearTimeout($.data(this, 'scrollTimer'));

                $.data(this, 'scrollTimer', setTimeout(function() {

                    // Fire after scroll stopped for 250ms
                    scrollStopped();

                }, scrollPoolingDelay));

                // Fire instantly (performance issue)
                scrollInstantly();
            });

            // Fire on scroll in 250ms intervals
            setInterval (function() {
                if (scrollEvent) {

                    scrollThrottled();

                    // Reset scroll count
                    scrollEvent = false;
                }
            }, scrollPoolingDelay);
        }

        // Fire after scroll stopped for 250ms
        function scrollStopped() {

        }

        // Fire instantly (performance issue)
        function scrollInstantly() {

        }

        // Fire on scroll in 250ms intervals
        function scrollThrottled() {

        }

        // Initialize module
        return __init();
    },

    // Resize handler
    resizeHandler: function() {
        // Initialize function
        function __init() {
            $window.on('resize', function() {
                // Fire all functions in the resize functions array
                graffino.callArrayFunctions(resizeFunctionsArray);
            });
        }

        // Initialize module
        return __init();
    },

    // Validate
    // Plugin: https://github.com/ericelliott/h5Validate/
    validate: function() {
        // Initialize function
        function __init() {

            if ($validate.length > 0) {
                $validate.h5Validate();
            }
        }

        // Initialize module
        return __init();
    },
    
    // Placeholder
    // Plugin: https://github.com/mathiasbynens/jquery-placeholder
    placeholder: function() {
        // Initialize function
        function __init() {
            // Placeholder
            if ($placeHolder.length > 0) {
                $placeHolder.placeholder();
            }
        }

        // Initialize module
        return __init();
    },
    
    // This method calls all the functions found in an array
    callArrayFunctions: function(functionsArray) {
        // Initialize Function
        function __init() {
            // firing each function found in the resizeFunctionsArray
            $(functionsArray).each(function(key, func){
                func();
            });
        }
        
        // Initialize module
        __init();
    }
};

/**
 * Document ready (loaded)
 */
jQuery(document).ready(function() {
    // Init scripts
    graffino.init();
});

/**
 *  Document load (in process of loading)
 */
jQuery(window).load(function() {
    // Do stuff
});
