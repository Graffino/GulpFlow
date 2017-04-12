/**
 * Name: Links handler
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  linksHandler: {
    name: 'links-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {},

    // Init method
    init() {
      // Open in new window links with rel=external code
      $('a[rel="external"]').attr('target', '_blank');
      // Prevent default action on # (hash) links
      $('a[href="#"]').on('click', event => {
        // Prevent the default "go-to" action
        event.preventDefault();
      });

      this.log('Initialized.');
    }
  }
});
