/**
 * Name: IsInView
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  isInView: {
    name: 'is-in-view',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {},

    // Init method
    init: function () {
      var _this = this;
      _this.log('Initialized.');
    },

    check: function (element, topActivationOffset, bottomActivationOffset) {
      topActivationOffset = topActivationOffset || 0.5;
      bottomActivationOffset = bottomActivationOffset || 0.5;

      var _that = $graffino,
        _this = this,
        el = $(element),
        windowHeight = _that.vars.$window.height(),
        scrollPos = _that.vars.$window.scrollTop(),
        topLimit = parseInt(el.offset().top - (windowHeight * topActivationOffset), 10),
        botLimit = parseInt(el.offset().top + el.outerHeight(false) - (windowHeight * bottomActivationOffset), 10),
        condition = scrollPos > topLimit && scrollPos < botLimit;

      if (condition) {
        _this.log('Item [' + $(element).attr('class') + '] in view.');
      }

      return condition;
    }
  }
});
