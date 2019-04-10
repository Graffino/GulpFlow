/**
 * Name: Header Handler
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/select2/select2
 */

Object.assign($graffino, {
  headerHandler: {
    name: 'header-handler',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: true
    },

    // Scoped variables
    vars: {
      $header: $('.js-header'),
      $scrollIcon: $('.js-header-scroll-icon'),
      $logo: $('.js-header-logo'),
      lastScrollTop: 0,
      delta: 125,
      scrolled: 0,
      navbarHeight: $('.js-header').outerHeight(),
      topPosition: $('.js-header').offset().top
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      if (_that.isOnPage(vars.$header)) {
        _this.toggleAppearance();

        _that.scrollHandler.vars.instant.push(() => {
          _this.toggleAppearance();
        });

        _this.log('Initialized.');
      }
    },

    toggleAppearance() {
      const _that = $graffino,
        vars = this.vars;
      vars.scrolled = _that.vars.$window.scrollTop();

      if ($graffino.vars.$window.scrollTop() > vars.topPosition + vars.navbarHeight) {
        if ($graffino.vars.$window.scrollTop() > vars.delta) {
          vars.$header.addClass(_that.vars.stateClass.active);
          if (vars.scrolled > vars.lastScrollTop && vars.scrolled > vars.navbarHeight) {
            vars.$header.removeClass(_that.vars.stateClass.visible).addClass(_that.vars.stateClass.hidden);
          } else if (vars.scrolled + _that.vars.$window.height() < _that.vars.$document.height()) {
            vars.$header.removeClass(_that.vars.stateClass.hidden).addClass(_that.vars.stateClass.visible);
          }
        } else {
          vars.$header.removeClass(_that.vars.stateClass.active);
        }

        vars.lastScrollTop = vars.scrolled;
      } else {
        vars.$header
          .removeClass(_that.vars.stateClass.active)
          .removeClass(_that.vars.stateClass.visible);
      }
    }
  }
});
