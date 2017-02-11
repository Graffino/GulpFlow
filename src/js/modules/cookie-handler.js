/**
 * Name: Cookie handler
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mathiasbynens/jquery-placeholder
 */


/* global $graffino, Cookies */

/* eslint
  block-scoped-var: 0,
  no-return-assign: 0,
  no-else-return: 0,
  no-negated-condition: 0,
  no-lonely-if: 0
*/

$.extend($graffino, {
  cookieHandler: {
    name: 'cookie-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $cookieAction: $('.js-cookie-action'),
      $cookieContent: $('.js-cookie-content')
    },

    // Init method
    init: function () {
      var _this = this;
      _this.log('Initialized.');
      _this.checkCookie();
      _this.setCookie();
    },

    checkCookie: function () {
      var _this = this,
        vars = this.vars,
        cookie = Cookies.get('eu-cookie-notice');

      if (!cookie) {
        vars.$cookieContent.velocity('slideDown');
        _this.log('\t\u2514 Cookie not found. Showing cookie notice.');
      } else {
        _this.log('\t\u2514 Cookie found.');
      }
    },

    setCookie: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;
      if (_that.isOnPage(vars.$cookieAction)) {
        vars.$cookieAction.on('click', function () {
          vars.$cookieContent.velocity('slideUp');
          Cookies.set('eu-cookie-notice', '1', {expires: 7});
          _this.log('Cookie has been set.');
        });
      }
    }
  }
});
