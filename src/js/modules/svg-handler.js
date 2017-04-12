/**
 * Name: SVG handler
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/jonathantneal/svg4everybody
 */


$.extend($graffino, {
  svgHandler: {
    name: 'svg-handler',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {},

    // Init method
    init() {
      // Polyfill remote SVGs
      svg4everybody();

      this.log('Remove SVGs polyfilled.');
    }
  }
});
