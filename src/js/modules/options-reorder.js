/**
 * Name: Options Reorder
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  optionsReorder: {
    name: 'options-reorder',

    // Plugin options
    options: {
      autoInit: true,
      debug: true
    },

    // Scoped variables
    vars: {
      $sortable: undefined,
      sortableClass: '.js-sortable',
      fieldsClass: '.js-form-field',
      handleClass: '.js-form-reorder-handle'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');
      vars.$sortable = $(vars.sortableClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$sortable)) {
        vars.$sortable.each((index, item) => {
          const $sortableItem = $(item);
          let $fields = $sortableItem.find(vars.fieldsClass);
          $sortableItem.sortable({
            item: $fields,
            axis: 'y',
            handle: vars.handleClass,
            containment: $sortableItem,
            start(event, ui) {
              ui.item.addClass(_that.vars.stateClass.active);
            },
            stop(event, ui) {
              ui.item.removeClass(_that.vars.stateClass.active)
              .css('left', 'auto');
            },
            update() {
              $fields = $sortableItem.find(vars.fieldsClass);
              $fields.each(function (index) {
                console.log(index, $(this).attr('data-field-id'));
              });
              console.log('\n');
            }
          });
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
