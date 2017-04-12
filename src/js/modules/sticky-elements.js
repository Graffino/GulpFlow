/**
 * Name: Sticky Elements
 * Author: Graffino (http://www.graffino.com)
 */


 /* eslint no-lonely-if: 0 */

$.extend($graffino, {
  stickyElements: {
    name: 'sticky-elements',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: undefined,
      elementClass: '.js-sticky-element',
      $parent: undefined,
      parentClass: '.js-admin-section'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$element = $(vars.elementClass);
      vars.$parent = $(vars.parentClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        vars.$element.each((index, el) => {
          const $el = $(el);
          let elHeight,
            parentHeight,
            parentOffset,
            windowHeight,
            scrollLimit;

          // Add custom function to resizeHandler
          // Fetch values for height, offsets, scrollLimit, etc.
          _that.resizeHandler.vars.throttled.push(() => {
            // Update parent element and filter by 'is-current' class
            vars.$parent = $(vars.parentClass).filter($('.' + _that.vars.stateClass.current));
            // Get the element height
            elHeight = $el.outerHeight();
            // Get the element's parent height
            parentHeight = vars.$parent.outerHeight(true);
            // Get the element's parent offset (x, y)
            parentOffset = vars.$parent.offset();
            // Get the window height
            windowHeight = _that.vars.$window.height();
            // Calculate the scroll limit
            scrollLimit = parentOffset.top + parentHeight - windowHeight;
            // Also trigger the scroll event to reposition the element
            _that.vars.$window.trigger('scroll');
          });

          // Add custom function to scrollHandler
          // Reposition element when user is scrolling
          _that.scrollHandler.vars.instant.push(() => {
            let newPos = 0;
            // Get the new scroll position
            const scrollTop = _that.vars.$window.scrollTop();

            // If the scroll position is less the the scroll limit
            if (scrollTop <= scrollLimit && parentHeight > windowHeight) {
              // Check if element doesn't have the sticky class
              if (!$el.hasClass(_that.vars.stateClass.sticky)) {
                // Add the sticky class to the element
                $el.addClass(_that.vars.stateClass.sticky);
              }
              // Calculate the element's new position
              newPos += scrollTop;
              newPos += windowHeight;
              newPos -= parentOffset.top;
              newPos -= elHeight;
            } else {
              // Check if the element has the sticky class
              if ($el.hasClass(_that.vars.stateClass.sticky)) {
                // Remove the sticky class from the element
                $el.removeClass(_that.vars.stateClass.sticky);
              }
            }

            // Set the new position for the element
            $el.css('transform', 'translate3d(0, ' + newPos + 'px, 0)');
          });

          // Init event triggers
          _that.vars.$window
            // Trigger the window resize event at init
            .trigger('resize')
            // Trigger the window scroll event at init
            .trigger('scroll');
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
