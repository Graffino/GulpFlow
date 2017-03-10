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
      autoInit: true,
      debug: true
    },

    // Scoped variables
    vars: {
      $element: $('.js-iscroll')
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        vars.$element.each(function () {
          var $el = $(this),
            $scrollableChild = $el.children().first(),
            instance,
            options = {
              click: true,
              bounce: true,
              wheelAction: 'none',
              scrollbars: true,
              useTransform: true,
              useTransition: true,
              bindToWrapper: true,
              scrollbarClass: 'iscroll__bar--',
              onBeforeScrollStart: function () {
                // void here
              },
              onScrollStart: function () {
                $el.addClass(_that.vars.stateClass.touched);
              }
            };

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
          setTimeout(function () {
            instance = new iScroll($el.get(0), options);
            isScrollableToggle();
          }, 250);

          _that.resizeHandler.vars.throttled.push(function () {
            isScrollableToggle();
            setTimeout(function () {
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
