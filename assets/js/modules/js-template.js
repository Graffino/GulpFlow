//
// Name: Method Template
// Author: Graffino (http://www.graffino.com)
//

/* global $graffino */

/* eslint
    block-scoped-var: 0,
    no-return-assign: 0,
    no-else-return: 0,
    no-negated-condition: 0,
    no-lonely-if: 0 */

$.extend($graffino, {
    jsTemplate: {
        name: 'js-template',

        // Plugin options
        options: {
            autoInit: true,
            debug: true
        },

        // Scoped variables
        vars: {
            dataJSONPath: '/data/data.json',
            templateEnv: null,
            templateName: {
                module: 'moduleName.njk'
            },
            templatePlaceholder: {
                module: '.js-template-module'
            },
            templatePath: '/assets/js/templates/views',
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
