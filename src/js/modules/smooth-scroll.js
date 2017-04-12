/**
 * Name: Smooth scroll
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  smoothScroll: {
    name: 'smooth-scroll',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      offset: 2,
      scrollDuration: 600,
      smoothScrollClass: '.js-smooth-scroll',
      smoothScrollInitClass: 'js-smooth-scroll-initialized'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      $(vars.smoothScrollClass).each((index, el) => {
        const offset = ($(el).data('scroll-offset') === undefined) ? 0 : parseInt($(el).data('scroll-offset'), 10);
        // Make sure smoothScroll doesn't initialize more than once per page element
        // Check for 'initialized' class
        if (!$(el).hasClass(vars.smoothScrollInitClass)) {
          // Adding click evens to all anchors with smooth scroll class
          $(el).addClass(vars.smoothScrollInitClass).on('click', event => {
            event.preventDefault();
            // Add a timeout to avoid targeting a non-existent item (display: none/block issues)
            setTimeout(() => {
              // Getting the HREF attribute from the anchor
              const href = $(el).attr('href'),
                // Truncate and extract the ID of the element
                target = href.substring(href.indexOf('#'));
              // Call the goTo function and point to the target element
              _that.smoothScroll.goTo($(target), offset);
            }, 50);
          });
        }
      });
    },

    onRefresh() {
      const _that = $graffino,
        _this = this,
        vars = this.vars,
        href = window.location.href,
        offset = vars.offset === undefined ? -96 : vars.offset;
      let target;

      _this.log('[onRefresh] method has been called.');

      // Check if url contains #
      if (href.indexOf('#') >= 0) {
        // Truncate and extract the ID of the element
        target = href.substring(href.indexOf('#'));
        // Call the goTo function and point to the target element
        _this.goTo($(target), offset);
        _this.log('Scrolling to target.');
        if (_this.options.debug && _that.options.debug) {
          console.log('\t\u2514', $(target));
        }
      }
    },

    goTo(target, offset) {
      const _this = this,
        vars = this.vars,
        $target = $(target),
        easing = [0.455, 0.030, 0.515, 0.955]; // Ease: easeInOutQuad

      // Setting default offset value
      offset = offset === undefined ? vars.offset : offset;

      _this.log('[goTo] method has been called.');

      // Check if target exists on the page
      if ($target.length > 0) {
        // Animate the scroll to target position
        $target
          .velocity('stop')
          .velocity('scroll', {
            easing,
            offset,
            duration: vars.scrollDuration
          });
      }
    }
  }
});
