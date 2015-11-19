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
var fontFaceObserverName       = 'Arial';

// Scroll
var scrollPoolingDelay         = 250;
var scrollEvent                = false;

// Validate
var $validate                  = $('.js-validate');

/**
 * [graffino Object]
 * @type {Object}
 */
var graffino = {

    init: function() {
        // Console handler
        graffino.consoleHandler();

        // Links actions
        graffino.linksHandler();

        // Fonts hander
        graffino.fontsHandler();

        // Detect browsers
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
            var observer = new FontFaceObserver(fontFaceObserverName);
            // Add fonts-class when fonts are loaded
            observer.check().then( function() {
                $html.addClass(' fonts-loaded');
            });
        }

        // Initialize module
        return __init();
    },

    // Detect browsers
    detectBrowser: function(action) {
        // Set variable to false if not defined
        action = action || false;
        
        // Initialize function
        function __init() {
            var isIE = detectIE();
            var isIOS = detectIOS();
            var isIOS8 = detectIOS8();

            switch(action) {
                case 'ie':
                   return isIE;
                case 'ios':
                    return isIOS;
                case 'ios8':
                    return isIOS8;
                default:
                    if (isIE) { $html.addClass('ie '+isIE); }
                    if (isIOS) { $html.addClass('ios'); }
                    if (isIOS8) { $html.addClass('ios8'); }
                break;
            }
        }

        // Detect IE
        function detectIE() {
            var ua      = window.navigator.userAgent;
            var msie    = ua.indexOf('MSIE ');
            var trident = ua.indexOf('Trident/');

            if (msie > 0) {
                // IE 10 or older => return version number
                return 'ie'+parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            if (trident > 0) {
                // IE 11 (or newer) => return version number
                var rv = ua.indexOf('rv:');
                return 'ie'+parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            // Other browser
            return false;
        }
        // Detect iOS
        function detectIOS () {
            var deviceAgent = window.navigator.userAgent.toLowerCase();
            return /(iphone|ipod|ipad).*/.test(deviceAgent)  && !window.MSStream;
        }
        
        // Detect iOS8
        function detectIOS8 () {
            var deviceAgent = window.navigator.userAgent.toLowerCase();
            return /(iphone|ipod|ipad).* os 8_/.test(deviceAgent)  && !window.MSStream;
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
            if (graffino.detectBrowser('ios')) {
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
                // Do stuff
            });
        }

        // Initialize module
        return __init();
    },

    // Validate
    // https://github.com/ericelliott/h5Validate/
    validate: function() {
        // Initialize function
        function __init() {

            if ($validate.length > 0) {
                $validate.h5Validate();
            }
        }

        // Initialize module
        return __init();
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
