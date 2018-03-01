/**
 * Name: Popup
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/dimsemenov/Magnific-Popup
 */

// To use
// bower install magnific-popup
Object.assign($graffino, {
  popup: {
    name: 'popup',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $anchor: undefined,
      anchorClass: '.js-popup-anchor',
      $close: undefined,
      closeClass: '.js-popup-close'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized');

      vars.$anchor = $(vars.anchorClass);
      vars.$close = $(vars.closeClass);

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
            } else {
              _this.log('\t\u2514 Inline content container not found in DOM (' + $el.attr('href') + ').');
            }
          }

          // Popup type: iframe (W.I.P)
          if (options.type === 'iframe') {
            $el.magnificPopup(Object.assign(options, {
              callbacks: {
                beforeAppend() {
                  const $content = this.contentContainer;
                  _this.log('Loading... Adding [is-loading] class to popup content container.');
                  $content.addClass(_that.vars.stateClass.loading);

                  setTimeout(() => {
                    $content.find('iframe').load(() => {
                      _this.log('iFrame content loaded! Removing [is-loading] class.');
                      $content.removeClass(_that.vars.stateClass.loading);
                    });
                  }, 0);
                }
              }
            }));
          }

          // Popup type: image (W.I.P)
          if (options.type === 'image') {
            $el.magnificPopup(options);
          }
        });

        vars.$close.each((index, item) => $(item).on('click', () => _this.close()));
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    close() {
      $.magnificPopup.close();
      window.parent.$.magnificPopup.close();
      return true;
    }
  }
});
