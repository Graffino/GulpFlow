/**
 * Name: SVG handler
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/jonathantneal/svg4everybody
 */


Object.assign($graffino, {
  svgHandler: {
    name: 'svg-handler',

    // Plugin options
    options: {
      hook: 'PLUGINS',
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
