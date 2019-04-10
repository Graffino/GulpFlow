/**
 * Name: Share popup
 * Author: Graffino(http: //www.graffino.com)
 */

Object.assign($graffino, {
  sharePopup: {
    name: 'share-popup',

    // Plugin options
    options: {
      hook: 'HANDLERS',
      autoInit: true,
      debug: true
    },

    // Scoped variables
    vars: {
      $shareLink: $('.js-social-popup')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$shareLink) && _that.vars.$window.width() > 600) {
        const h = 400;
        const w = 500;

        vars.$shareLink.on('click', event => {
          const url = $(event.currentTarget).attr('href'),
            title = $(event.currentTarget).attr('title'),
            y = Math.round(window.top.outerHeight / 2) + Math.round(window.top.screenY - (h / 2)),
            x = Math.round(window.top.outerWidth / 2) + Math.round(window.top.screenX - (w / 2));

          window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x);

          // Prevent the default "go-to" action
          event.preventDefault();

          _this.log('\t\u2514 Popup triggered.');
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
