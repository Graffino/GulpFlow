/**
 * Name: WordPress AJAX
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  wpAjax: {
    name: 'wp-ajax',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $ajaxForm: undefined,
      ajaxFormClass: '.js-wp-ajax-form',
      ajaxSubmitClass: '.js-wp-ajax-submit'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$ajaxForm = $(vars.ajaxFormClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$ajaxForm)) {
        vars.$ajaxForm.each(function () {
          var $form = $(this),
            $ajaxSubmit = $form.find(vars.ajaxSubmitClass);

          $ajaxSubmit.on('click', function (e) {
            e.preventDefault();
            $.ajax({
              url: ajaxurl,
              type: $form.attr('method'),
              data: $form.serialize(),
              dataType: 'json',
              cache: false,
              success: function (response) {
                console.log(response.settings_export);
                _that.notifications.display(response.message, response.type);
                if (response.settings !== null) {
                  _this.updateFields(response.settings, response.settings_export);
                }
              },
              error: function (response) {
                _that.notifications.display(response.message, response.type);
              }
            });
          });
        });
        _this.log('\t\u2514', vars.$ajaxForm);
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    // Method that updates the form fields after save/import
    updateFields: function (importedSettings, exportedSettings) {
      var _this = this,
        parsedSettings = JSON.parse(importedSettings),
        $exportField = $('[data-field-type=settings_export]');
      exportedSettings = exportedSettings !== null ? exportedSettings : false;
      // Go through each returned value
      Object.keys(parsedSettings).map(function (optionName) {
        var $formField = $('[name*=' + optionName + ']'),
          optionType = $formField.attr('data-field-type');

        // Check if there are any fields matching the setting id
        // and if the optionType is defined
        if ($formField.size() > 0 && optionType !== undefined) {
          // Switch by form field type
          switch (optionType) {
            case 'text':
            case 'hidden':
            case 'textarea':
              // Set the value with the new setting
              $formField.val(parsedSettings[optionName])
              .trigger('change');
              break;
            case 'upload':
              _this.updateUploadField($formField, parsedSettings, optionName);
              break;
            case 'dropdown':
              // Go through each option
              $formField.children('option')
              .attr('selected', false)
              .each(function () {
                var $option = $(this);
                // Check for a value match
                if ($option.attr('value') === parsedSettings[optionName]) {
                  // If the option value matches the setting, set the "selected" attribute to "true"
                  $option.attr('selected', true);
                }
              })
              .end()
              .trigger('change');
              break;
            case 'radio':
              $formField.attr('checked', false);
              $formField.each(function () {
                var $radio = $(this);
                if ($radio.val() === parsedSettings[optionName]) {
                  $radio.attr('checked', true)
                  .trigger('change');
                }
              });
              break;
            case 'toggle':
            case 'checkbox':
              if (parsedSettings[optionName] === '0') {
                $formField.filter('[type="checkbox"]')
                .attr('checked', false)
                .trigger('change');
              } else if (parsedSettings[optionName] === '1') {
                $formField.filter('[type="checkbox"]')
                .attr('checked', true)
                .trigger('change');
              }
              break;
            default:
              // If none of the above match, return false and exit function
              return false;
          }
          // Return true if there's a match
          return true;
        }
        // Return false if there aren't input fields with given field id
        return false;
      });

      // Update the export settings field with all the new settings
      if ($exportField.size() > 0 && exportedSettings !== false) {
        $exportField.val(exportedSettings)
        .trigger('change');
      }
    },

    updateUploadField($formField, parsedSettings, optionName) {
      var _that = $graffino;

      // Get values from parsed JSON
      // Set the URL value
      if (parsedSettings[optionName].url !== undefined &&
        parsedSettings[optionName].url !== '') {
        $formField.val(parsedSettings[optionName].url).trigger('change');

        // Check if the thumbnail is set, if it's not, use the same value as the main url
        if (parsedSettings[optionName].thumbnail !== undefined ||
          parsedSettings[optionName].thumbnail !== '') {
          parsedSettings[optionName].thumbnail = parsedSettings[optionName].url;
        }

        $formField.parent().removeClass(_that.vars.stateClass.empty);
        $formField.parent().siblings('.js-upload-media').removeClass(_that.vars.stateClass.empty);
      } else {
        $formField.parent().addClass(_that.vars.stateClass.empty);
        $formField.parent().siblings('.js-upload-media').addClass(_that.vars.stateClass.empty);
        parsedSettings[optionName].thumbnail = '';
      }

      // Set the thumbnail URL value
      if (parsedSettings[optionName].thumbnail !== undefined &&
        parsedSettings[optionName].thumbnail !== '') {
        $formField.siblings('[name*=thumbnail]')
        .val(parsedSettings[optionName].thumbnail).trigger('change');
        // Set the thumbnail background-image url to the preview element
        $formField.siblings().find('.js-upload-preview-image')
        .css('background-image', 'url("' + parsedSettings[optionName].thumbnail + '")');
      }
      // Set the title value
      if (parsedSettings[optionName].title !== undefined &&
        parsedSettings[optionName].title !== '') {
        $formField.siblings('[name*=title]')
        .val(parsedSettings[optionName].title).trigger('change');
        $formField.siblings()
        .find('.js-upload-preview-title').text(parsedSettings[optionName].title);
      }
      // Set the width value
      if (parsedSettings[optionName].width !== undefined &&
        parsedSettings[optionName].width !== '') {
        $formField.siblings('[name*=width]')
        .val(parsedSettings[optionName].width).trigger('change');
        $formField.siblings()
        .find('.js-upload-size-x').text(parsedSettings[optionName].width);
      }
      // Set the height value
      if (parsedSettings[optionName].height !== undefined &&
        parsedSettings[optionName].height !== '') {
        $formField.siblings('[name*=height]')
        .val(parsedSettings[optionName].height).trigger('change');
        $formField.siblings()
        .find('.js-upload-size-y').text(parsedSettings[optionName].height);
      }
    }
  }
});
