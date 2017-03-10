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
      $elements: $('.js-upload-media'),
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
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Check if element is in DOM
      if (_that.isOnPage(vars.$elements)) {
        vars.$elements.each(function () {
          var $el = $(this),
            $input = $el.parent().find(vars.inputClass),
            $inputWrapper = $el.parent().find(vars.inputWrapperClass),
            $inputThumbnail = $el.parent().find(vars.inputThumbnailClass),
            $inputTitle = $el.parent().find(vars.inputTitleClass),
            $inputWidth = $el.parent().find(vars.inputWidthClass),
            $inputHeight = $el.parent().find(vars.inputHeightClass),
            $preview = $el.parent().find(vars.previewImageClass),
            $labelTitle = $el.parent().find(vars.previewTitleLabelClass),
            $labelWidth = $el.parent().find(vars.previewWidthLabelClass),
            $labelHeight = $el.parent().find(vars.previewHeightLabelClass),
            $removeButton = $el.parent().find(vars.removeButtonClass),
            $frame;

          $el.on('click', function (e) {
            e.preventDefault();

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
              mime: 'image/jpeg',
              multiple: false
            });

            // Binding the 'select' event to the frame
            $frame.on('select', function () {
              // Getting the media file data
              var attachment = $frame.state().get('selection').first().toJSON(),
                url = attachment.url,
                // Check if we have the sizes key
                sizes = attachment.sizes,
                // If we have it get the thumbnail url, if not set the thumbURL to an empty string
                thumbURL = (sizes !== undefined) ? sizes.thumbnail.url : '',
                title = attachment.title,
                width = attachment.width,
                height = attachment.height;

              // Place the media URL in the input field
              $input.val(url ? url : '').trigger('change');
              $inputThumbnail.val(thumbURL ? thumbURL : '').trigger('change');
              $inputTitle.val(title !== undefined ? title : '').trigger('change');
              $inputWidth.val(width !== undefined ? width : '').trigger('change');
              $inputHeight.val(height !== undefined ? height : '').trigger('change');

              // If field is empty remove the empty class
              if ($el.hasClass(_that.vars.stateClass.empty)) {
                $el.removeClass(_that.vars.stateClass.empty);
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

          $removeButton.on('click', function () {
            // Empty the input fields
            $input.val('').trigger('change');
            $inputThumbnail.val('').trigger('change');
            $inputTitle.val('').trigger('change');
            $inputWidth.val('').trigger('change');
            $inputHeight.val('').trigger('change');

            // If field is not empty add the empty class
            if (!$el.hasClass(_that.vars.stateClass.empty)) {
              $el.addClass(_that.vars.stateClass.empty);
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
