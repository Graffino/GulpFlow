/**
 * Name: Method template
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  method: {
    name: 'method-template',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: $('.element')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Reference $graffino object with _that;
      _this.log('\t\u251c _that is', _that.name);
      // Reference plugin method with _this;
      _this.log('\t\u251c _this is', _this.name);
      // Reference local variables with vars;
      _this.log('\t\u251c Local variable $element', vars.$element);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        _this.log('\t\u2514', vars.$element);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }

      // Calling private method
      _this.privateMethod();
    },

    privateMethod() {
      const _this = this;

      _this.log('Method [privateMethod] has been called.');
    }
  }
});
