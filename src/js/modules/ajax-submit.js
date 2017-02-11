/**
 * Name: AJAX Form submit
 * Author: Graffino (http://www.graffino.com)
 */


/* global $graffino */

/* eslint
  block-scoped-var: 0,
  no-return-assign: 0,
  no-else-return: 0,
  no-negated-condition: 0,
  no-lonely-if: 0
*/

$.extend($graffino, {
  ajaxSubmit: {
    name: 'ajax-submit',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $forms: $('.js-ajax-form'),
      defaultMethod: 'POST',
      initClass: 'js-ajax-initialized',
      formNoticeClass: '.js-ajax-form-notice',
      formContentClass: '.js-ajax-form-content'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      if (_that.isOnPage(vars.$forms)) {
        vars.$forms.each(function (index, form) {
          var $form = $(form),
            $element = $form,
            $notice = $form.find(vars.formNoticeClass),
            $content = $form.find(vars.formContentClass),
            customCallback = $form.data('ajax-callback'),
            data,
            dataType,
            contentType,
            method,
            action,
            triggerClass,
            $trigger = false,
            isRequesting = false,
            isValid = false,
            eventType = 'submit';

          // Check if form already has the init class
          if (!$form.hasClass(vars.initClass)) {
            // Adding the initialized class
            $form.addClass(vars.initClass);

            // Getting form's method (POST or GET)
            method = $form.attr('method');
            if (method === undefined || method === '') {
              _this.log('Form id ' + index + ' method is undefined or invalid.');
              if (_this.options.debug && _that.options.debug) {
                console.log('\t', form);
              }
              // Setting default method
              $form.attr('method', vars.defaultMethod);
              _this.log('Setting default method ' + vars.defaultMethod + ' to form id ' + index + '.');
            }

            // Getting form's action
            action = $form.attr('action');
            if (action === undefined || action === '') {
              _this.log('Form id ' + index + ' action is undefined or invalid.');
            }

            // Getting form AJAX trigger
            triggerClass = $form.data('ajax-trigger');
            if (triggerClass === undefined) {
              // If the form doesn't have a specified trigger
              _this.log('Form id ' + index + ' has no specified trigger.');
            } else {
              // If the form has a specified trigger
              _this.log('Form id ' + index + ' has a defined trigger .' + triggerClass);
              // Check if the trigger is in DOM
              // If it is change the AJAX request event to 'click'
              if (_that.isOnPage('.' + triggerClass)) {
                $trigger = $form.find('.' + triggerClass);
                eventType = 'click';
                _this.log('\n\t\u251c The AJAX request will be fired by the [' + eventType + '] event.');
                if (_this.options.debug && _that.options.debug) {
                  console.log('\t\u2514', $trigger);
                }
              // If the trigger could not be found in DOM leave default events
              } else {
                _this.log('\t\u2514 \u2757 Trigger not found in DOM.');
              }
            }

            // Getting form data-type
            dataType = $form.attr('data-type');
            if (dataType === undefined || dataType === '') {
              dataType = 'text';
              _this.log('Form id ' + index + ' dataType is undefined or invalid. Using `text` as default.');
            // Getting form data-type
            }

            contentType = $form.attr('data-content-type');
            if (contentType === undefined || dataType === '') {
              contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
              _this.log('Form id ' + index + ' dataType is undefined or invalid. Using `application/x-www-form-urlencoded; charset=UTF-8` as default.');
            }

            // Validating the custom callback function
            if (customCallback === undefined || typeof _this[customCallback] !== 'function') {
              customCallback = false;
            } else {
              _this.log('Form id ' + index + ' has custom callback [' + customCallback + '].');
            }

            // Outputting the form information to console
            _this.log('\n\t\u251c Form id ' + index + '\n\t\u251c Method: ' + method + '\n\t\u251c Action: ' + action);
            if (_this.options.debug && _that.options.debug) {
              console.log('\t\u2514', $form);
            }

            // Check if all the form variables are defined
            if (method !== undefined && action !== undefined) {
              // If trigger is defined use it for the AJAX request by 'click' event
              // If not, use the form and 'submit' event
              $element = $trigger === false ? $form : $trigger;
              // Adding the event listener
              $element.on(eventType, function (e) {
                // Prevent the form for default submit
                e.preventDefault();
                // AJAX request and form validation is wrapped in a setTimeout to move it to the next stack
                // This is needed to give time to other event listener handlers to perform their logic
                setTimeout(function () {
                  // Checking if the form fields contain valid data
                  isValid = $form.attr('data-h5-valid') === 'true';
                  // Check if a request is already in progress
                  if (!isRequesting && isValid === true) {
                    // Raising flag to prevent another request until this one is completed
                    isRequesting = true;
                    // Serializing form's data
                    try {
                      data = $form.serialize();
                    } catch (err) {
                      _this.log('Form id ' + index + ' data could not be serialized. ' + err);
                      return;
                    }
                    // Sending an AJAX request
                    $.ajax({
                      url: action,
                      type: method,
                      data: data,
                      dataType: dataType,
                      contentType: contentType,
                      cache: false,
                      // On success callback
                      success: function (response) {
                        _this.onSuccess($form, index, data, response, $content, $notice, customCallback);
                      },
                      // On error callback
                      error: function (response) {
                        // Lowering flag to allow another request to be sent
                        isRequesting = false;
                        // Fire the onError callback function
                        _this.onError($form, index, data, response, $content, $notice);
                      },
                      // On request complete
                      complete: function () {
                        // Lowering flag to allow another request to be sent
                        isRequesting = false;
                        _this.log('\t\u2514 Request completed.');
                      }
                    });
                  } else {
                    // Form fields data is not valid or an AJAX request is already in progress
                    _this.log('Form id ' + index + ' valid: ' + isValid + ', request in progress: ' + isRequesting);
                    _this.log('\t\u2514 AJAX request prevented.');
                  }
                }, 0); // end of setTimeout()
              });
              _this.log('AJAX submit methods bound to given form elements.');
            }
          } else {
            _this.log('Form id ' + index + ' has already been initialized.');
            if (_this.options.debug && _that.options.debug) {
              console.log('\t\u2514', $form);
            }
          }
        });
      } else {
        _this.log('No forms found with given class.');
      }
    },

    onSuccess: function ($form, formID, data, response, $content, $notice, customCallback) {
      var _that = $graffino,
        _this = this,
        noticeText;

      _this.log('[SENT] Form id ' + formID + ' information was sent successfully!');
      _this.log('\t\u251c Data:', data);
      _this.log('\t\u251c Response:', JSON.stringify(response));

      // Checking if a custom callback is available
      if (customCallback === false) {
        // Adding visible class to the success notice element
        // Adding the text message from the AJAX response

        // Save notice text
        noticeText = $notice.html();

        // Reset form fields
        $form[0].reset();

        // Hide content
        $content.addClass(_that.vars.stateClass.hidden);

        // Show notice
        setTimeout(function () {
          $notice.addClass(_that.vars.stateClass.visible);
        }, 500);

        if (response.result === 'error') {
          $notice
            .addClass(_that.vars.stateClass.error)
            .html('<p class="text">' + response.msg + '</p>');
        } else {
          $notice
            .addClass(_that.vars.stateClass.success);
        }

        setTimeout(function () {
          $notice
            .removeClass(_that.vars.stateClass.visible)
            .removeClass(_that.vars.stateClass.error)
            .removeClass(_that.vars.stateClass.success)
            .html(noticeText);

          $content.removeClass(_that.vars.stateClass.hidden);
        }, 5000);
      } else {
        // Calling the custom success callback
        _this[customCallback](response, $notice, customCallback);
      }
    },

    onError: function ($form, formID, data, response, $content, $notice) {
      var _that = $graffino,
        _this = this,
        noticeText;

      // Save notice text
      noticeText = $notice.html();

      // Hide content
      $content.addClass(_that.vars.stateClass.hidden);

      // Show notice
      setTimeout(function () {
        $notice.addClass(_that.vars.stateClass.visible);
      }, 500);

      // Adding visible class to the success notice element
      $notice
        .addClass(_that.vars.stateClass.error)
        .html('<p class="text">' + response.msg + '</p>');

      setTimeout(function () {
        $notice
          .removeClass(_that.vars.stateClass.visible)
          .removeClass(_that.vars.stateClass.error)
          .html(noticeText);

        $content.removeClass(_that.vars.stateClass.hidden);
      }, 5000);

      _this.log('\u2757 ERROR on sending request for form id ' + formID);
      _this.log('\t\u251c Data:', data);
      _this.log('\t\u251c Response:', JSON.stringify(response));
    },


    /**
     * Callbacks for custom forms
     */

    notice: function (response, $notice, notice) {
      var _this = this;
      // Making sure response is an AJAX object
      response = typeof response === 'object' ? response : JSON.parse(response);

      _this.log('\t\u251c Custom callback [' + notice + '] was fired.');
    }
  }
});
