/**
 * Name: Cookie handler
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mathiasbynens/jquery-placeholder
 */

// To use
// bower install js-cookie
Object.assign($graffino, {
  cookieHandler: {
    name: 'cookie-handler',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $cookieAction: $('.js-cookie-action'),
      $cookieContent: $('.js-cookie-content')
    },

    // Init method
    init() {
      const _this = this;
      _this.log('Initialized.');
      _this.checkCookie();
      _this.setCookie();
    },

    checkCookie() {
      const _this = this,
        vars = this.vars,
        cookie = Cookies.get('eu-cookie-notice');

      if (!cookie) {
        vars.$cookieContent.velocity('slideDown');
        _this.log('\t\u2514 Cookie not found. Showing cookie notice.');
      } else {
        _this.log('\t\u2514 Cookie found.');
      }
    },

    setCookie() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;
      if (_that.isOnPage(vars.$cookieAction)) {
        vars.$cookieAction.on('click', () => {
          vars.$cookieContent.velocity('slideUp');
          Cookies.set('eu-cookie-notice', '1', {expires: 7});
          _this.log('Cookie has been set.');
        });
      }
    }
  }
});
