/**
 * Name: Sticky Elements
 * Author: Graffino(http: //www.graffino.com)
 */

Object.assign($graffino, {
  stickyElements: {
    name: 'sticky-elements',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $sticky: $('.js-sticky-element'),
      parentClass: 'js-sticky-element-parent',
      delta: 20,
      disableBreakpoint: $graffino.vars.breakpoints.medium
    },

    // Init method
    init() {
      const _that = $graffino;
      const _this = this;
      const vars = this.vars;
      let objectsLength = 0;

      _this.log('Initialized.');

      // Check if element is on page
      if (_that.isOnPage(vars.$sticky)) {
        // Get length
        objectsLength = vars.$sticky.length;

        // Calculate values for each sticky element
        vars.$sticky.each((index, element) => {
          const $el = $(element);
          const $parent = $el.parent();
          let offset = $parent.offset();
          let topLimit = offset.top;
          let botLimit = offset.top + $parent.outerHeight() - $el.outerHeight();
          let slide = 0;
          let refresh = 0;

          // Add 'is-sticky' class
          $el.addClass(_that.vars.stateClass.sticky);

          // Remove 'is-floating' class
          $el.removeClass(_that.vars.stateClass.floating);

          // Add custom class to parent
          $parent.addClass(vars.parentClass);

          // Function to slide the element to the new scroll position
          slide = () => {
            const scrollPos = _that.vars.$window.scrollTop();
            let newTop = 0;

            // If scroll position hasn't reached the top limit
            if (scrollPos < topLimit) {
              newTop = 0;
              $el.removeClass(_that.vars.stateClass.floating);
              // If scroll position is between the top and bottom limits
            } else if (scrollPos >= topLimit && scrollPos <= botLimit) {
              newTop = scrollPos - offset.top + 12;

              if (newTop > vars.delta) {
                $el.addClass(_that.vars.stateClass.floating);
              } else {
                $el.removeClass(_that.vars.stateClass.floating);
              }

              // If scroll position is below the bottom limit
            } else if (scrollPos > botLimit) {
              newTop = $parent.outerHeight() - $el.outerHeight();
              // If anything else fails :-)
            } else {
              newTop = offset;
            }

            // Request animation frame to prevent stutters in between the draws
            window.requestAnimationFrame(() => {
              $el.css({
                'opacity': 1,
                'transform': 'translate3d(0, ' + newTop + 'px, 0)'
              });
            });
          };

          // Function to calculate the parent and element dimensions and offsets
          // Also: add or remove the slide function from the scrollHandler depending on the window breakpoints
          refresh = () => {
            const windowWidth = _that.vars.$window.width();
            const scrollHandler = _that.scrollHandler.vars.instant;
            const slideInstanceID = scrollHandler.indexOf(slide);
            // Re-calculate the offset and top/bottom limits
            offset = $parent.offset();
            topLimit = offset.top;
            botLimit = offset.top + $parent.outerHeight() - $el.outerHeight();
            // Check if window width is less than the tablet breakpoint value
            if (windowWidth <= vars.disableBreakpoint && slideInstanceID > -1) {
              // Remove slide instance from scrollHandler
              scrollHandler.splice(slideInstanceID, 1);
              // Remove 'is-sticky' class
              $el.removeClass(_that.vars.stateClass.sticky);
              // Remove 'is-floating' class
              $el.removeClass(_that.vars.stateClass.floating);
              // Reset element's position
              window.requestAnimationFrame(() => {
                $el.css('transform', 'translate3d(0, 0, 0)');
              });
              // Output to console
              if (index === objectsLength - 1) {
                _this.log('Removed slide() instance from scrollHandler.');
                _this.log('Added "is-not-sticky" class to element.');
              }
            } else if (windowWidth > vars.disableBreakpoint && slideInstanceID < 0) {
              // Add the slide function to the scroll handler
              scrollHandler.push(slide);
              // Add 'is-sticky' class
              $el.addClass(_that.vars.stateClass.sticky);
              // Slide the element into position
              slide();
              // Output to console
              if (index === objectsLength - 1) {
                _this.log('Added slide() instance to scrollHandler.');
                _this.log('Removed "is-not-sticky" class to element.');
              }
            }
          };

          // Add the refresh function to the resize handler
          _that.resizeHandler.vars.throttled.push(refresh);
          // Add the slide function to the scroll handler
          _that.scrollHandler.vars.instant.push(slide);
          _that.scrollHandler.vars.throttled.push(refresh);
          // Iitial call for refresh and slide functions
          if (index === objectsLength - 1) {
            _this.log('\t\u251c', 'refresh() was added to resizeHandler array.');
            _this.log('\t\u2514', 'slide() was added to scrollHandler array.');
          }

          slide();
          refresh();
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
