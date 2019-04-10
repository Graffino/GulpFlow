/**
 * Name: Method template
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  copyToClipboard: {
    name: 'copy-to-clipboard',

    // Plugin options
    options: {
      hook: 'PLUGINS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $trigger: $('.js-copy-to-clipboard')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$trigger)) {
        vars.$trigger.on('click', () => {
          const $temp = $('<input>', {
            'class': 'h-visually-hidden',
            value: vars.$trigger.attr('data-url'),
            'readonly': 'readonly'
          });
          const value = $($temp).val();
          vars.$trigger.append($temp);
          $temp.val(value).select();
          document.execCommand('copy');
          $temp.remove();
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
