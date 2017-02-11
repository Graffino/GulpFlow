/**
 * Name: Fonts handler
 * Author: Graffino (http://www.graffino.com)
 */


/* global $graffino, FontFaceObserver */


/* eslint
  block-scoped-var: 0,
  no-return-assign: 0,
  no-else-return: 0,
  no-negated-condition: 0,
  no-lonely-if: 0
*/

$.extend($graffino, {
  fontsHandler: {
    name: 'fonts-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      // Check if webfonts are loaded. Type in main font-family name. Set to false to prevent detection.
      fontFaceObserverName: 'Avenir'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars,
        observer;

      _this.log('Initialized. Waiting for fonts to load...');

      if (vars.fontFaceObserverName) {
        observer = new FontFaceObserver(vars.fontFaceObserverName);
        // Add fonts-class when fonts are loaded
        observer.load().then(function () {
          _this.log('Fonts loaded, replacing [no-fonts] class with [fonts] on the [html] object.');
          _that.vars.$html
            .removeClass('no-fonts')
            .addClass('fonts');
        }, function () {
          _this.log('Fonts not available.');
        });
      } else {
        _this.log('Custom font-face name not specified, replacing [no-fonts] class with [fonts] on the [html] object.');
        _that.vars.$html
          .removeClass('no-fonts')
          .addClass('fonts');
      }
    }
  }
});
