/**
 * Name: Textarea
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  textarea: {
    name: 'textarea',

    // Plugin options
    options: {
      hook: 'HELPERS',
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $formFields: $('.js-textarea')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      if (_that.isOnPage(vars.$formFields)) {
        vars.$formFields.each((index, field) => {
          const $field = $(field);
          $field
            .height(this.scrollHeight)
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            });
        }).on('input', event => {
          $(event.currentTarget)
            .height(this.scrollHeight)
            .css({
              'height': 'auto',
              'overflow-y': 'hidden'
            });
        });
        _this.log('Initialized.');
      } else {
        _this.log('No elements found in DOM.');
      }
    }
  }
});
