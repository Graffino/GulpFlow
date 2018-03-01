/**
 * Name: Browser detection
 * Author: Graffino (http://www.graffino.com)
 */

// To use
// bower install jquery.browser
Object.assign($graffino, {
  detectBrowser: {
    name: 'detect-browser',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      isIE: false
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this;
      let classes = '';

      // Check for browser information and build classes string
      classes += $.browser.msie ? 'browser-ie browser-ie' + $.browser.versionNumber : '';
      classes += $.browser.msedge ? ' browser-edge' : '';
      classes += $.browser.mozilla ? ' browser-moz' : '';
      classes += $.browser.chrome ? ' browser-chrome' : '';
      classes += $.browser.safari ? ' browser-safari' : '';
      classes += $.browser.ipad || $.browser.ipod || $.browser.iphone ? ' browser-ios' : '';
      classes += $.browser.desktop ? ' browser-desktop' : '';
      classes += $.browser.mobile ? ' browser-mobile' : '';
      classes += $.browser.win ? ' browser-windows' : '';
      classes += $.browser.mac ? ' browser-mac' : '';

      // Remove the first space from the string, if exists
      classes = /^\s/.test(classes) ? classes.substr(1) : classes;

      // Adding the classes to the html element
      _that.vars.$html.addClass(classes);

      // Set local variables for IE detection
      _this.vars.isIE = $.browser.msie || $.browser.msedge || false;

      _this.log('Initialized. Class(es) [' + classes + '] added to the [html] object.');
    }
  }
});
