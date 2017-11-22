/**
 * Name: Main navigation
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  navigation: {
    name: 'navigation',

    // Plugin options
    options: {
      hook: 'HANDLERS',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $nav: $('.js-navigation'),
      $navTrigger: $('.js-navigation-trigger')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$nav) && _that.isOnPage(vars.$navTrigger)) {
        vars.$navTrigger.on('click', () => {
          vars.$navTrigger.toggleClass(_that.vars.stateClass.active);
          vars.$nav.toggleClass(_that.vars.stateClass.visible);
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
