/**
 * Name: Popup
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/dimsemenov/Magnific-Popup
 */


$.extend($graffino, {
  popup: {
    name: 'popup',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $anchor: $('.js-popup-anchor'),
      $close: $('.js-popup-close')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$anchor)) {
        vars.$anchor.each((index, el) => {
          const $el = $(el),
            options = {
              type: $el.attr('data-popup-type'),
              midClick: true,
              closeOnBgClick: true,
              mainClass: 'mfp-fade',
              closeBtnInside: true
            };
          let $inlineContainer;

          // Popup type: inline
          if (options.type === 'inline') {
            $inlineContainer = $($el.attr('href'));
            if (_that.isOnPage($inlineContainer)) {
              $el.magnificPopup(options);
            }
          } else {
            _this.log('\t\u2514 Inline content container not found in DOM (' + $el.attr('href') + ').');
          }

          // Popup type: iframe (W.I.P)
          if (options.type === 'iframe') {
            $el.magnificPopup(options);
          }

          // Popup type: image (W.I.P)
          if (options.type === 'image') {
            $el.magnificPopup(options);
          }
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
