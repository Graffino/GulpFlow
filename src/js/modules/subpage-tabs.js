/**
 * Name: Subpages tabs
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  subpagesTabs: {
    name: 'subpages-tabs',

    // Plugin options
    options: {
      autoInit: true,
      debug: true
    },

    // Scoped variables
    vars: {
      $subpages: undefined,
      $subpagesTriggers: undefined,
      subpageClass: '.js-admin-section',
      subpagesTriggerClass: '.js-admin-section-item'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$subpages = $(vars.subpageClass);
      vars.$subpagesTriggers = $(vars.subpagesTriggerClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$subpages)) {
        vars.$subpagesTriggers.each((index, trigger) => {
          const $trigger = $(trigger),
            subpageID = $trigger.attr('data-subpage-id');

          $trigger.on('click', () => {
            vars.$subpagesTriggers.not($trigger).removeClass(_that.vars.stateClass.current);
            $trigger.addClass(_that.vars.stateClass.current);

            vars.$subpages
              .removeClass(_that.vars.stateClass.current)
              .filter('[data-subpage-id="' + subpageID + '"]')
              .addClass(_that.vars.stateClass.current);

            // Trigger resize event
            setTimeout(() => _that.vars.$window.trigger('resize'), 0);
          });
        });
      } else {
        _this.log('\t\u2514 Admin sections not found in DOM.');
      }
    }
  }
});
