/**
 * Name: Notifications
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  notifications: {
    name: 'notifications',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $parentContainer: undefined,
      parentContainerClass: '.js-notification-container',
      // Time in milliseconds to display the message
      displayTime: 5000
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$parentContainer = $(vars.parentContainerClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$parentContainer)) {
        _this.log('\t\u2514', vars.$parentContainer);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    display(content, type) {
      const _this = this,
        vars = this.vars;
      let $notification = null;

      // Set a default type for the notification
      type = type === undefined ? 'default' : type;
      content = content === undefined ? 'No message was received from the server.' : content;


      // Creating the dom element
      $notification = $('<div class="notification -type-' + type + '"><span class="notification__icon icon"></span><p class="notification__text">' + content + '</p></div>');
      vars.$parentContainer.prepend($notification);

      $notification.velocity('stop')
        .velocity({
          'opacity': [1, 0],
          'translateX': ['0%', '100%']
        });

      _this.log('Notification pushed. Message: ' + content);

      setTimeout(() => {
        $notification.velocity('stop')
          .velocity({
            'opacity': [0, 1],
            'translateX': ['100%', '0%']
          }, {
            complete() {
              $notification.remove();
              $notification = null;
              _this.log('Notification deleted.');
            }
          });
      }, vars.displayTime);
    }
  }
});
