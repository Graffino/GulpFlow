/**
 * Name: Prevent Embed of page in iframe
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mozilla/nunjucks
 */


$.extend($graffino, {
  preventEmbed: {
    name: 'preent-embed',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: $('.prevent-embed')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        if (window.self !== window.top) {
          window.top.location.href = window.location.href;
        }
      }
    }
  }
});
