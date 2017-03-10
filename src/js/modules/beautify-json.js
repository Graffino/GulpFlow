/**
 * Name: Beautify JSON
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  beautifyJSON: {
    name: 'beautifyJSON',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: undefined,
      elementClass: '.js-beautify-json'
    },

    // Init method
    init: function () {
      var _that = $graffino,
        _this = this,
        vars = this.vars,
        fieldData = {};

      _this.log('Initialized.');

      vars.$element = $(vars.elementClass);

      // Function that returns the beautified JSON object
      function beautifyJSONHandler(data) {
        var parsedJSON = false;

        // Try to parse the data as a JSON object
        try {
          parsedJSON = JSON.parse(data);
        // If it fails output error to console
        } catch (err) {
          _this.log('\t\u2514 The input value doesn\'t seem to be a valid JSON object.');
        }

        // If the data was successfully parsed as JSON
        if (parsedJSON !== false) {
          // Return the stringified version with formatting (indentation set to 4)
          return JSON.stringify(parsedJSON, null, 4);
        }
        // If data could not be parsed, return the original data
        return data;
      }

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        // Getting the input field value
        fieldData = vars.$element.val();

        // Setting the field value to the following...
        vars.$element.val(beautifyJSONHandler(fieldData));

        // Binding a "change" event to the field, when it updates, to beautify the JSON again
        vars.$element.on('change', function () {
          // Getting the input field value
          fieldData = vars.$element.val();
          // Setting the field value to the following...
          vars.$element.val(beautifyJSONHandler(fieldData));
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    }
  }
});
