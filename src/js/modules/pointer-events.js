/**
 * Name: Pointer events
 * Author: Graffino (http://www.graffino.com)
 */

// To use
// bower install pointer-events-poly
Object.assign($graffino, {
  pointerEvents: {
    name: 'pointer-events',

    // Plugin options
    options: {
      hook: 'HANDLERS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {},

    // Init method
    init() {
      const _that = $graffino,
        _this = this;

      _this.log('Pointer events polyfill initialized.');

      // Initialize polyfill for links
      PointerEventsPolyfill.initialize({selector: 'a'});
      // Initialize polyfill for spans
      PointerEventsPolyfill.initialize({selector: 'span'});
      // Initialize polyfill for divs
      PointerEventsPolyfill.initialize({selector: 'div'});

      // Disable pointer events on iOS drag to prevent scroll stopping when
      // dragging on form elements (iOS workaround)
      if ($.browser.mobile) {
        _this.setPointerEvents('none');

        _that.vars.$document.on('touchstart', () => _this.setPointerEvents('auto'));
        _that.vars.$document.on('touchmove', () => _this.setPointerEvents('none'));
        _that.vars.$document.on('touchend', () => setTimeout(() => _this.setPointerEvents('none'), 1000));
      }
    },

    setPointerEvents(pointerEventsValue) {
      const $nodes = $('input, textarea');
      $.each($nodes, (index, node) => {
        $(node).css('pointer-events', pointerEventsValue);
      });
    }
  }
});
