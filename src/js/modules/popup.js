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
      debug: true
    },

    // Scoped variables
    vars: {
      $popup: $('.js-popup'),
      $anchor: $('.js-popup-anchor'),
      $close: $('.js-popup-close')
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$popup) || _that.isOnPage(vars.$anchor)) {
        vars.$anchor.each(function () {
          var $el = $(this),
            $inlineContainer = $($el.attr('href')),
            options = {
              type: $el.attr('data-popup-type'),
              midClick: true,
              closeOnBgClick: true,
              mainClass: 'mfp-fade',
              closeBtnInside: true
            };

          if (_that.isOnPage($inlineContainer)) {
            $el.magnificPopup(options);
          } else {
            _this.log('\t\u2514 Inline content container not found in DOM (' + $el.attr('href') + ').');
          }
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
