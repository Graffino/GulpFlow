/**
 *  Name: Clipboard copy
 *  Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  clipboardCopy: {
    name: 'clipboard-copy',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $trigger: null,
      $copySourceField: null,
      triggerClass: '.js-clipboard-copy'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$trigger = $(vars.triggerClass);
      vars.$copySourceField = $('.' + vars.$trigger.attr('data-copy-source'));

      // Check if element is in DOM
      if (_that.isOnPage(vars.$trigger)) {
        vars.$trigger.on('click', function () {
          vars.$copySourceField.select();
          try {
            document.execCommand('copy');
            _that.notifications.display('Export data was copied to clipboard.', 'success');
          } catch (err) {
            _this.log('There was an error while trying to copy to clipboard: ', err);
          }
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
