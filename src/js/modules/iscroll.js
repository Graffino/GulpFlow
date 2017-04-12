/**
 * Name: iScroll
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/cubiq/iscroll (v4.x)
 */


$.extend($graffino, {
  iScroll: {
    name: 'iScroll',

    // Plugin options
    options: {
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: $('.js-iscroll')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        vars.$element.each((index, el) => {
          const $el = $(el),
            $scrollableChild = $el.children().first(),
            options = {
              click: false,
              bounce: true,
              momentum: true,
              mouseWheel: true,
              scrollbars: true,
              useTransform: true,
              useTransition: true,
              bindToWrapper: true,
              scrollbarClass: 'iscroll__bar--',
              onBeforeScrollStart: () => {
                // Void here
              },
              onScrollStart: () => {
                $el.addClass(_that.vars.stateClass.touched);
              }
            };
          let instance;

          function isScrollableToggle() {
            if ($scrollableChild.outerWidth(true) > $el.outerWidth(true) ||
              $scrollableChild.outerHeight(true) > $el.outerHeight(true)) {
              $el.addClass(_that.vars.stateClass.scrollable);
            } else {
              $el.removeClass(_that.vars.stateClass.scrollable);
            }
          }

          if ($el.attr('data-scroll-axis') !== undefined) {
            switch ($el.attr('data-scroll-axis')) {
              case 'x':
                $.extend(options, {
                  vScroll: false,
                  vScrollbar: false
                });
                break;
              case 'y':
                $.extend(options, {
                  hScroll: false,
                  hScrollbar: false
                });
                break;
              case 'x,y':
              default:
                $.extend(options, {
                  hScroll: true,
                  hScrollbar: true,
                  vScroll: true,
                  vScrollbar: true
                });
                break;
            }
          }
          setTimeout(() => {
            instance = new IScroll($el.get(0), options);
            isScrollableToggle();
          }, 250);

          // Bind 'refresh' event to element and refresh iScroll instance
          $el.on('refresh', () => instance.refresh());

          _that.resizeHandler.vars.throttled.push(() => {
            isScrollableToggle();
            setTimeout(() => {
              instance.refresh();
            }, 0);
          });
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
