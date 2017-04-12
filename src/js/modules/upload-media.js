/**
 * Name: Upload Media
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  uploadMedia: {
    name: 'upload-media',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $elements: $('.js-upload-media-field'),
      uploadButtonClass: '.js-upload-media-button',
      inputClass: '.js-upload-media-url',
      inputWrapperClass: '.js-upload-input-wrapper',
      inputThumbnailClass: '.js-upload-media-thumbnail',
      inputTitleClass: '.js-upload-media-title',
      inputWidthClass: '.js-upload-media-width',
      inputHeightClass: '.js-upload-media-height',
      previewClass: '.js-upload-preview',
      previewImageClass: '.js-upload-preview-image',
      previewTitleLabelClass: '.js-upload-preview-title',
      previewWidthLabelClass: '.js-upload-size-x',
      previewHeightLabelClass: '.js-upload-size-y',
      removeButtonClass: '.js-upload-remove'
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$elements)) {
        vars.$elements.each((index, field) => {
          const $field = $(field),
            $uploadButton = $field.find(vars.uploadButtonClass),
            $input = $field.find(vars.inputClass),
            $inputWrapper = $field.find(vars.inputWrapperClass),
            $inputThumbnail = $field.find(vars.inputThumbnailClass),
            $inputTitle = $field.find(vars.inputTitleClass),
            $inputWidth = $field.find(vars.inputWidthClass),
            $inputHeight = $field.find(vars.inputHeightClass),
            $preview = $field.find(vars.previewImageClass),
            $labelTitle = $field.find(vars.previewTitleLabelClass),
            $labelWidth = $field.find(vars.previewWidthLabelClass),
            $labelHeight = $field.find(vars.previewHeightLabelClass),
            $removeButton = $field.find(vars.removeButtonClass);
          let $frame;

          $uploadButton.on('click', event => {
            event.preventDefault();

            // Check if frame is already initialized
            if ($frame) {
              // If it is, reopen it
              $frame.open();
              // Quit the function
              return;
            }

            // Setting WP media frame options
            $frame = wp.media({
              title: 'My custom title for this media frame',
              button: {
                text: 'Use this media'
              },
              mime: [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
                'image/x-icon'
              ],
              multiple: false
            });

            // Binding the 'select' event to the frame
            $frame.on('select', () => {
              // Getting the media file data
              const attachment = $frame.state().get('selection').first().toJSON(),
                mime = attachment.mime,
                url = attachment.url.replace(/^.*\/\/[^/]+/, ''),
                title = attachment.title,
                sizes = attachment.sizes;
              let thumbURL,
                width,
                height;

              if (sizes !== undefined) {
                switch (mime) {
                  case 'image/svg+xml':
                    thumbURL = sizes.full.url.replace(/^.*\/\/[^/]+/, '');
                    width = sizes.full.width;
                    height = sizes.full.height;
                    break;
                  default:
                    // If we have it get the thumbnail url, if not set the thumbURL to an empty string
                    thumbURL = (sizes !== undefined && sizes.thumbnail !== undefined) ? sizes.thumbnail.url : '';
                    width = attachment.width;
                    height = attachment.height;
                }
              }

              // Place the media URL in the input field
              $input.val(url ? url : '').trigger('change');
              $inputThumbnail.val(thumbURL ? thumbURL : '').trigger('change');
              $inputTitle.val(title !== undefined ? title : '').trigger('change');
              $inputWidth.val(width !== undefined ? width : '').trigger('change');
              $inputHeight.val(height !== undefined ? height : '').trigger('change');

              // If field is empty remove the empty class
              if ($uploadButton.hasClass(_that.vars.stateClass.empty)) {
                $uploadButton.removeClass(_that.vars.stateClass.empty);
              }

              // If field wrapper is empty remove the empty class
              if ($inputWrapper.hasClass(_that.vars.stateClass.empty)) {
                $inputWrapper.removeClass(_that.vars.stateClass.empty);
              }

              // Add the the scr attribute to the preview img
              $preview.css('background-image', 'url("' + (thumbURL ? thumbURL : '') + '")');

              // Updating the title and size labels
              $labelTitle.text(title !== undefined ? title : 'No title available');
              $labelWidth.text(width !== undefined ? width : '0');
              $labelHeight.text(height !== undefined ? height : '0');

              // Focus on the input field
              $input.focus();
            });

            // Open the frame
            $frame.open();
          });

          $removeButton.on('click', () => {
            // Empty the input fields
            $input.val('').trigger('change');
            $inputThumbnail.val('').trigger('change');
            $inputTitle.val('').trigger('change');
            $inputWidth.val('').trigger('change');
            $inputHeight.val('').trigger('change');

            // If field is not empty add the empty class
            if (!$uploadButton.hasClass(_that.vars.stateClass.empty)) {
              $uploadButton.addClass(_that.vars.stateClass.empty);
            }

            // If field wrapper is not empty add the empty class
            if (!$inputWrapper.hasClass(_that.vars.stateClass.empty)) {
              $inputWrapper.addClass(_that.vars.stateClass.empty);
            }

            // Remove the preview background image
            $preview.css('background-image', '');

            // Updating the title and size labels
            $labelTitle.text('No title available');
            $labelWidth.text('0');
            $labelHeight.text('0');

            // Focus on the input field
            $input.focus();
          });
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
