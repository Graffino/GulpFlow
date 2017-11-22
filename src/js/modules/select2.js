/**
 * Name: Select2
 * Author: Graffino (http://www.graffino.com)
 * Plugin: https://github.com/select2/select2
 */


Object.assign($graffino, {
  select2: {
    name: 'select2',

    // Plugin options
    options: {
      hook: 'AFTER_INIT',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $formFields: undefined,
      select2Class: '.js-select',
      parentClass: 'select2-parent'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      vars.$formFields = $(vars.select2Class);

      if (_that.isOnPage(vars.$formFields)) {
        vars.$formFields.each((index, el) => {
          const $el = $(el),
            options = {
              dropdownParent: $el.parent()
            };

          // Emit Vue events when selecting options
          const emitVueEvent = $element => {
            let vueEvents = $element.attr('data-vue-emit');
            const selectName = $element.attr('name');
            // Splitting the events string or setting a default
            vueEvents = vueEvents !== undefined ? vueEvents.split(',') : ['dropdown.select'];
            // Firing each custom event
            return vueEvents.forEach(item => {
              const event = item.trim();
              _this.log(`Dropdown with name [${selectName}] emmited Vue event [${event}].`);
              _that.Vue.Bus.$emit(event, {
                el: $element,
                parent: $element.attr('data-parent-parameter'),
                name: $element.attr('data-parameter-name') || selectName,
                value: $element.select2('val')
              });
            });
          };

          if (!$el.hasClass(_that.vars.stateClass.selectified)) {
            // Make sure parent has position relative by adding class
            $el.parent().addClass(vars.parentClass);

            // Check if search is enabled
            if ($el.attr('data-search') === 'false') {
              Object.assign(options, {
                minimumResultsForSearch: -1
              });
            }

            // Check if we have a placeholder
            if ($el.attr('data-placeholder') === 'false') {
              Object.assign(options, {
                placeholder: {
                  id: -1,
                  text: $el.attr('data-placeholder')
                }
              });
            }

            // Initialize select2 plugin with options object
            $el.select2(options);
            // Adding initialized class
            $el.addClass(_that.vars.stateClass.selectified);

            $el.on('select2:select', () => emitVueEvent($el));
            if ($el.attr('data-vue-autoemit') === 'true') {
              setTimeout(() => $el.trigger('select2:select'), 0);
            }

            if ($el.attr('data-extra-class') !== undefined) {
              $el.next(vars.select2Class).addClass($el.attr('data-extra-class'));
            }

            // Listen to custom event
            $el.on('dropdown.update', (event, data) => $el.val(data.value).trigger('change'));
            $el.on('dropdown.reset', () => $el.val($el.find('option:eq(0)').val()).trigger('change'));
          }
        });
        _this.log('Initialized.');
      } else {
        _this.log('No elements found in DOM.');
      }
    },

    refresh() {
      const _this = this,
        vars = _this.vars;

      return setTimeout(() => {
        vars.$formFields = $(vars.select2Class);
        return _this.init();
      }, 0);
    }
  }
});
