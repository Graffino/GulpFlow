/**
 * Name: Nunjucks JS Template
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/mozilla/nunjucks
 */


$.extend($graffino, {
  jsTemplate: {
    name: 'js-template',

    // Plugin options
    options: {
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      dataJSONPath: '/data/common.json',
      templateEnv: null,
      templateName: {
        module: 'moduleName.njk'
      },
      templatePlaceholder: {
        module: '.js-template-module'
      },
      templatePath: '/js/templates/views',
      templateRendered: null,
      moduleData: {}
    },

    // Init method
    init: function () {
      var _this = this;

      _this.log('Initialized.');

      // Load precompiled templates
      _this.loadTemplates();
      // Render module template
      _this.moduleName();
    },

    loadTemplates: function () {
      var _this = this,
        vars = this.vars;
      // Load nunjucks WebLoader to detect precompiled templates (Compiled with gulp)
      // IMPORTANT: If templates are not precompiled a path error will be thrown (there is no workaround)
      vars.templateEnv = new nunjucks.Environment(new nunjucks.WebLoader(vars.templatePath), {autoescape: true});

      _this.log('Precompiled JS templates loaded.');
    },

    moduleName: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      // Check if element is in DOM
      if (_that.isOnPage(vars.templatePlaceholder.module)) {
        // Fetch JSON
        $.getJSON(vars.dataJSONPath).done(function (data) {
          if (data !== undefined && data !== null) {
            vars.moduleData = {
              module: {
                title: data[0].title,
                list: data[0].list
              }
            };
          } else {
            vars.moduleData = {
              module: {
                title: 'H1 - Template JSON Test!',
                list: [
                  'JSON fetch failed',
                  'JSON fetch failed'
                ]
              }
            };
          }

          // Render nunjucks template using WebLoader
          vars.templateRendered = vars.templateEnv.render(vars.templateName.module, vars.moduleData);

          // Apend template to DOM
          $(vars.templatePlaceholder.module).html(vars.templateRendered);

          _this.log('ModuleName template added to DOM.');
        });
      }
    }
  }
});
