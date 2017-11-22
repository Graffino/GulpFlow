/**
 * Name: Fonts handler
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  fontsHandler: {
    name: 'fonts-handler',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      // Check if webfonts are loaded. Type in main font-family name. Set to false to prevent detection.
      fontFaceObserverName: 'FiraSans'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;
      let observer;

      _this.log('Initialized. Waiting for fonts to load...');

      if (vars.fontFaceObserverName) {
        observer = new FontFaceObserver(vars.fontFaceObserverName);
        // Add fonts-class when fonts are loaded
        observer.load().then(() => {
          _this.log('Fonts loaded, replacing [no-fonts] class with [fonts] on the [html] object.');
          _that.vars.$html
            .removeClass('no-fonts')
            .addClass('fonts');
        }, () => _this.log('Fonts not available.'));
      } else {
        _this.log('Custom font-face name not specified, replacing [no-fonts] class with [fonts] on the [html] object.');
        _that.vars.$html
          .removeClass('no-fonts')
          .addClass('fonts');
      }
    }
  }
});
