/**
 * Name: Navigation
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  navigation: {
    name: 'navigation',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $trigger: undefined,
      triggerClass: '.js-navigation-trigger',
      $nav: undefined,
      navClass: '.js-navigation-container',
      $navList: undefined,
      navListClass: '.js-navigation-list',
      $sectionContent: undefined,
      sectionContentClass: '.js-admin-section-content'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$trigger = $(vars.triggerClass);
      vars.$nav = $(vars.navClass);
      vars.$navList = $(vars.navListClass);
      vars.$sectionContent = $(vars.sectionContentClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$trigger) && _that.isOnPage(vars.$nav)) {
        vars.$trigger.on('click', function (e) {
          e.preventDefault();
          vars.$trigger.toggleClass(_that.vars.stateClass.active);
          vars.$nav.toggleClass(_that.vars.stateClass.expanded);
          // Trigger resize event
          setTimeout(function () {
            _that.vars.$window.trigger('resize');
          }, 0);
        });

        // Set a minimum height for the content container element
        // This prevents subpages with no content from cutting the navigation (overflow)
        vars.$sectionContent.css('min-height', vars.$navList.outerHeight(true) + 48);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
