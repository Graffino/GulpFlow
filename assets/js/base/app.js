//
// Main Javascript file
// Author: Graffino (http://www.graffino.com)
//

// Linting exceptions
/* global FontFaceObserver, PointerEventsPolyfill, nunjucks */

// Mute jQuery migrate
$.migrateMute = true;


/**
 *  Global Vars
 */

// Global
var $html = $('html');
var $body = $('body');
var $window = $(window);

// Check if webfonts are loaded. Type in main font-family name. Set to false to prevent detection.
var fontFaceObserverName = false;

// Boolean variable for storing localStorage capability checker
var hasLocalStorage = false;

// Scroll
var scrollPoolingDelay = 250;
var scrollEvent = false;

// Validate
var $validate = $('.js-validate');

// Form
var $form = $('.js-form');
var $formContent = $('.js-form-content');
var $formNotice = $('.js-form-notice');

// Placeholder
var $placeHolder = $('input, textarea');

// Grid toggle element
var $grid = $('.js-grid');

// Smooth scroll class
var smoothScrollClass = '.js-smooth-scroll';

// Template
var $templatePlaceholder = {
    module: $('.js-template-module')
};
var templatePath = '/assets/js/templates/views';
var templateEnv;

// Data
var dataJSONPath = 'data/data.json';

// All functions added in this array will be alled when the
// window.resize event will fire
var resizeFunctionsArray = [];


/**
 * Init
 */

// Avoiding 'out of scope' problems by declaring the variable first;
// Then we can assign the objects needed. This is needed because
// we're calling the 'graffino' variable inside the object we're
// assigning to the 'graffino' variable. Inception stuff...
var graffino;

graffino = {
    init: function () {
        'use strict';

        // Check for localStorage
        graffino.hasStorage();

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

        // Forms
        graffino.formsHandler();

        // Placeholder
        // Plugin: https://github.com/mathiasbynens/jquery-placeholder
        graffino.placeholder();

        // Nunjucks templates
        // Plugin: http://mozilla.github.io/nunjucks/
        graffino.template.module(function () {
            return;
        });

        // Call all functions in the resize function array
        graffino.callArrayFunctions(resizeFunctionsArray);

        // Toggle grid
        graffino.toggleGrid();
    },


    // Check for local storage capability
    hasStorage: function () {
        'use strict';

        // Initialize function
        function init() {
            var result;
            // Try accessing localStorage
            try {
                localStorage.setItem('testKey', 'testValue');
                localStorage.removeItem('testKey');
                result = true;
            } catch (err) {
                console.log(err);
                result = false;
            }
            hasLocalStorage = result;
            return result;
        }

        init();
    },

    // Console handler
    consoleHandler: function () {
        'use strict';

        // Initialize function
        function init() {
            // Avoid `console` errors in browsers that lack a console.
            var method;
            var console;
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var noop = function () {
                return;
            };

            if (window.console) {
                console = window.console;
            } else {
                console = {};
            }

            while (length) {
                length -= 1;
                method = methods[length];

                // Only stub undefined methods.
                if (!console[method]) {
                    console[method] = noop;
                }
            }
        }

        // Initialize module
        return init();
    },

    // Links handler
    linksHandler: function () {
        'use strict';

        // Initialize function
        function init() {
            // Open in new window links with rel=external code
            $('a[rel="external"]').attr('target', '_blank');
            // Prevent default action on # (hash) links
            $('a[href="#"]').on('click', function (e) {
                // Stop event propagation bubble
                e.stopPropagation();
                // Prevent the default "go-to" action
                e.preventDefault();
            });
        }

        // Initialize module
        return init();
    },

    // Fonts handler
    fontsHandler: function () {
        'use strict';

        // Initialize function
        function init() {
            if (fontFaceObserverName) {
                var observer = new FontFaceObserver(fontFaceObserverName);
                // Add fonts-class when fonts are loaded
                observer.check().then(function () {
                    $html.removeClass('no-fonts')
                        .addClass('fonts');
                });
            }
        }

        // Initialize module
        return init();
    },

    // Browser Detect
    // Plugin: https://github.com/gabceb/jquery-browser-plugin
    detectBrowser: function () {
        'use strict';

        // Initialize function
        function init() {
            if ($.browser.msie) {
                $html.addClass('browser-ie');
                $html.addClass('browser-ie' + $.browser.versionNumber);
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
        return init();
    },

    // Pointer events (adds support for IE)
    // Plugin: https://github.com/kmewhort/pointer_events_polyfill
    pointerEvents: function () {
        'use strict';

        function setPointerEvents(pointerEventsValue) {
            var $nodes = $('input, textarea');

            $.each($nodes, function (i, $node) {
                $($node).css('pointer-events', pointerEventsValue);
            });
        }

        // Initialize function
        function init() {
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
                setPointerEvents('none');

                $(document).on('touchstart', function () {
                    setPointerEvents('auto');
                });

                $(document).on('touchmove', function () {
                    setPointerEvents('none');
                });

                $(document).on('touchend', function () {
                    setTimeout(function () {
                        setPointerEvents('none');
                    }, 1000);
                });
            }
        }

        // Initialize module
        return init();
    },

    // Scroll handler
    scrollHandler: function () {
        'use strict';

        // Fire after scroll stopped for 250ms
        function scrollStopped() {
            return;
        }

        // Fire instantly (performance issue)
        function scrollInstantly() {
            return;
        }

        // Fire on scroll in 250ms intervals
        function scrollThrottled() {
            // Sticky Header
            return;
        }

        // Initialize function
        function init() {
            // Check for scroll function
            $(window).scroll(function (e) {
                scrollEvent = true;

                // Clear Timeout
                clearTimeout($.data(e, 'scrollTimer'));

                $.data(e, 'scrollTimer', setTimeout(function () {
                    // Fire after scroll stopped for 250ms
                    scrollStopped();
                }, scrollPoolingDelay));

                // Fire instantly (performance issue)
                scrollInstantly();
            });

            // Fire on scroll in 250ms intervals
            setInterval(function () {
                if (scrollEvent) {
                    scrollThrottled();

                    // Reset scroll count
                    scrollEvent = false;
                }
            }, scrollPoolingDelay);
        }

        // Initialize module
        return init();
    },

    // Resize handler
    resizeHandler: function () {
        'use strict';

        // Initialize function
        function init() {
            $window.on('resize', function () {
                // Fire all functions in the resize functions array
                graffino.callArrayFunctions(resizeFunctionsArray);
            });
        }

        // Initialize module
        return init();
    },

    // Validate
    // Plugin: https://github.com/ericelliott/h5Validate/
    validate: function () {
        'use strict';

        // Initialize function
        function init() {
            if ($validate.length > 0) {
                $validate.h5Validate();
            }
        }

        // Initialize module
        return init();
    },

    // Forms
    formsHandler: function () {
        'use strict';

        // Initialize function
        function init() {
            // Vars
            if ($form.length > 0) {
                // Validate contact form
                $form.h5Validate();

                // Process contact form
                $form.submit(function (e) {
                    // Vars
                    var $this = $(this);
                    var result = $this.h5Validate('allValid');
                    var data;
                    var url;
                    var method;

                    if (result === true) {
                        // Serialize contact data
                        data = $this.serialize();
                        // Get URL from action
                        url = $this.attr('action');
                        // Get form method
                        method = $this.attr('method');

                        // Send request
                        $.ajax({
                            url: url,
                            data: data,
                            type: method,
                            cache: false,
                            success: function () {
                                // Hide form content for 10s
                                $formContent.velocity('fadeOut', {duration: 800})
                                            .velocity('fadeIn', {delay: 10000, duration: 1000});
                                // Show form notice for 9s
                                $formNotice.velocity('fadeIn', {delay: 850, duration: 1500})
                                            .velocity('fadeOut', {delay: 9000, duration: 800});

                                $this.trigger('reset');
                            }
                        });
                    }

                    // Prevent actual form submit
                    e.preventDefault();
                });
            }
        }

        // Initialize module
        return init();
    },

    // Placeholder
    // Plugin: https://github.com/mathiasbynens/jquery-placeholder
    placeholder: function () {
        'use strict';

        // Initialize function
        function init() {
            // Placeholder
            if ($placeHolder.length > 0) {
                $placeHolder.placeholder();
            }
        }

        // Initialize module
        return init();
    },

    // This method calls all the functions found in an array
    callArrayFunctions: function (functionsArray) {
        'use strict';

        // Initialize Function
        function init() {
            // Firing each function found in the resizeFunctionsArray
            $(functionsArray).each(function (key, func) {
                func();
            });
        }

        // Initialize module
        init();
    },

    // Toggle On/Off for grid guides
    toggleGrid: function () {
        'use strict';

        // Initialize function
        function init() {
            // check localStorage if element was left active last time
            if (hasLocalStorage) {
                // if yes turn the grid on
                if (localStorage.isGridActive === 'true') {
                    $grid.addClass('is-visible');
                // if not then make sure it's off
                } else {
                    $grid.removeClass('is-visible');
                }

                // if yes turn the console on
                if (localStorage.isConsoleActive === 'true') {
                    $body.addClass('-console');
                // if not then make sure it's off
                } else {
                    $body.removeClass('-console');
                }
            } // end if

            // Adding key press event for On/Off function
            $(document).keydown(function (e) {
                // If F2 key is pressed
                if (e.which === 113) {
                    // Hide/show the grid
                    $grid.toggleClass('is-visible');
                    // Store current state in LocalStorage
                    if (hasLocalStorage) {
                        if ($grid.hasClass('is-visible')) {
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
                    $body.toggleClass('-console');
                    // Store current state in LocalStorage
                    if (hasLocalStorage) {
                        if ($body.hasClass('-console')) {
                            localStorage.isConsoleActive = true;
                        } else {
                            localStorage.isConsoleActive = false;
                        }
                    }
                    return false;
                } // end if
            }); // end of keydown();
        }

        // Initialize module
        return init();
    },

    // Smooth scrolling function to specific target
    smoothScroll: {
        init: function () {
            'use strict';

            // Adding click evens to all anchors with smooth scroll class
            $(smoothScrollClass).on('click', function () {
                var $this = $(this),
                    // Getting the HREF attribute from the anchor
                    href = $this.attr('href'),
                    // Truncate and extract the ID of the element
                    target = href.substring(href.indexOf('#'));
                // Call the goTo function and point to the target element
                graffino.smoothScroll.goTo($(target));
            });
        },

        onRefresh: function () {
            'use strict';

            var href = window.location.href,
                target;

            // Check if url contains #
            if (href.indexOf('#') >= 0) {
                // Truncate and extract the ID of the element
                target = href.substring(href.indexOf('#'));
                // Call the goTo function and point to the target element
                graffino.smoothScroll.goTo($(target));
            }
        },

        goTo: function (target) {
            'use strict';

            var $target = $(target),
                position = 0;

            // Check if target exists on the page
            if ($target.length > 0) {
                // Getting the target's position and subtract the sticky header height and a few more pixels
                position = $target.offset().top - 40;
                // Animate the scroll to target position
                $('body, html').stop().animate({
                    scrollTop: position
                }, 600, 'swing');
            }
        }
    },

    // Nunjucks templates
    // Plugin: http://mozilla.github.io/nunjucks/
    template: {
        // Progress template
        module: function (callback) {
            // Module data
            var moduleData;
            var template;

            // Get data values from an api
            $.getJSON(dataJSONPath).done(function (data) {
                if (data !== undefined && data !== null) {
                    moduleData = {
                        module: {
                            title: data[0].title,
                            list: data[0].list
                        }
                    };
                } else {
                    moduleData = {
                        module: {
                            title: 'H1 - Template JSON Test!',
                            list: [
                                'JSON fetch failed',
                                'JSON fetch failed'
                            ]
                        }
                    };
                }
                templateEnv = new nunjucks.Environment(new nunjucks.WebLoader(templatePath), {autoescape: true});
                template = templateEnv.render('moduleName.njk', moduleData);

                // Apend template to DOM
                $templatePlaceholder.module.html(template);
                // Calling callback function
                callback();
            });
            return;
        }
    }
};


/**
 * Document ready (loaded)
 */

$(document).ready(function () {
    'use strict';

    // Init scripts
    graffino.init();
});


/**
 *  Document load (in process of loading)
 */

$(window).on('load', function () {
    'use strict';

    // Smooth Scrolling function
    graffino.smoothScroll.init();
    graffino.smoothScroll.onRefresh();
});
