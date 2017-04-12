/**
 * Name: Section tabs
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  sectionTabs: {
    name: 'section-tabs',

    // Plugin options
    options: {
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $tabs: undefined,
      tabsClass: '.js-tabs',
      tabsNavItemClass: '.js-tabs-nav-item',
      tabsContentItemClass: '.js-tabs-content-item'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$tabs = $(vars.tabsClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$tabs)) {
        // Going through each admin section
        vars.$tabs.each((index, tabs) => {
          const $tabs = $(tabs),
            $tabNavItems = $tabs.find(vars.tabsNavItemClass),
            $tabContentItems = $tabs.find(vars.tabsContentItemClass);

          if (_that.isOnPage($tabNavItems) && _that.isOnPage($tabContentItems)) {
            $tabNavItems.on('click', event => {
              const $item = $(event.currentTarget),
                tabID = $item.attr('data-tab-id');

              $tabNavItems.not($item).parent().removeClass(_that.vars.stateClass.current);
              $item.parent().addClass(_that.vars.stateClass.current);

              $tabContentItems
                .removeClass(_that.vars.stateClass.current)
                .filter('[data-tab-id="' + tabID + '"]')
                .addClass(_that.vars.stateClass.current);

              // Trigger resize event
              setTimeout(() => _that.vars.$window.trigger('resize'), 0);
            });
          } else {
            _this.log('\t\u2514 Tab items not found in DOM.');
          }
        });
      } else {
        _this.log('\t\u2514 No tabs found in DOM.');
      }
    }
  }
});
