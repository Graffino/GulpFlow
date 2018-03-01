/**
 * Name: WordPress AJAX Request Handler
 * Author: Graffino (http://www.graffino.com)
 */


Object.assign($graffino, {
  wpAjax: {
    name: 'wp-ajax',

    // Plugin options
    options: {
      hook: 'HANDLERS',
      autoInit: false,
      debug: false
    },

    // Scoped variables
    vars: {
      $element: $('.js-wp-ajax-submit')
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      // Get Window "href" IE Fix
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }

      // Check if element is in DOM
      if (_that.isOnPage(vars.$element)) {
        vars.$element.each((index, el) => {
          const $el = $(el);
          let isValid = false;

          if ($el.is('form')) {
            $el.on('submit', event => {
              event.preventDefault();
              setTimeout(() => {
                // Checking if the form fields contain valid data
                isValid = $el.attr('data-h5-valid') === 'true';
                if (isValid) {
                  $el.find('[type="submit"]').addClass(_that.vars.stateClass.loading);
                  _this.ajaxRequest(
                    $el.serialize(),
                    $el.attr('method'),
                    $el.attr('data-ajax-before'),
                    $el.attr('data-ajax-success'),
                    $el.attr('data-ajax-error'),
                    $el.attr('data-ajax-complete'),
                    $el.find('[type="submit"]')
                  );
                }
              }, 0);
            });
          } else if ($el.is('a')) {
            $el.on('click', event => {
              event.preventDefault();
              setTimeout(() => {
                const data = $el.attr('data-ajax-data');
                let parsedJSON = false;
                try {
                  parsedJSON = JSON.parse(data);
                } catch (err) {
                  _this.log('There was an error trying to get JSON data from element attribute.');
                }

                if (parsedJSON !== false) {
                  $el.addClass(_that.vars.stateClass.loading);
                  _this.ajaxRequest(
                    $.param(parsedJSON),
                    $el.attr('data-ajax-method'),
                    $el.attr('data-ajax-before'),
                    $el.attr('data-ajax-success'),
                    $el.attr('data-ajax-error'),
                    $el.attr('data-ajax-complete'),
                    $el
                  );
                }
              }, 0);
            });
          } // End if
        });
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    ajaxRequest(data, type, beforeSendCallback, successCallback, errorCallback, completeCallback, element) {
      const _this = this,
        options = {
          url: window.location.origin + '/wp-admin/admin-ajax.php',
          type,
          data,
          dataType: 'json',
          cache: false,
          beforeSend(xhr) {
            if (beforeSendCallback !== undefined) {
              _this.log('Before submit callback function: ');
              const returnValue = _this.fireCallback(beforeSendCallback);
              if (returnValue === false) {
                xhr.abort();
              }
            }
          },
          success(response) {
            if (successCallback !== undefined) {
              _this.log('Success callback function: ');
              response.element = element;
              _this.fireCallback(successCallback, response);
            }
          },
          error(response) {
            if (errorCallback !== undefined) {
              _this.log('AJAX request failed: ');
              if (_this.vars.debug) {
                console.log(response);
              }
              _this.log('Error callback function: ');
              _this.fireCallback(errorCallback);
            }
          },
          complete(xhr, status) {
            _this.log('AJAX request complete.', status);
            if (completeCallback !== undefined) {
              _this.log('Complete callback function: ');
              _this.fireCallback(completeCallback);
            }
          }
        };
      if (_this.options.debug) {
        console.log(options);
      }
      $.ajax(options);
    },

    fireCallback(functionName, response) {
      const _this = this;
      if (typeof functionName === 'string' && typeof _this[functionName] === 'function') {
        return response !== undefined ? _this[functionName](response) : _this[functionName]();
      } else if (typeof functionName === 'function') {
        return response !== undefined ? functionName(response) : functionName();
      } else {
        _this.log('\t\u2514 Callback function with name [', functionName, '] not found.');
        if (_this.options.debug && response !== undefined) {
          console.log(response);
        }
      }
    },

    callbackSearchResults(response) {
      const _that = $graffino,
        _this = this,
        resultsListClass = '.js-search-results-list',
        containerClass = '.js-iscroll',
        searchNoticeClass = '.js-search-notice';

      // Check if the request was successful
      if (response.success) {
        _this.log('\t\u2514 Handler response was successful.');
        _this.log('\t\u2514 Response message:', response.message);
        if (_this.options.debug) {
          console.log(response);
        }

        // If we don't have the DOM needed elemnts in the vars object
        if (_this.vars.$searchResultsList === undefined) {
          // Add the list element to the vars object
          _this.vars.$searchResultsList = $(resultsListClass);
        }

        if (_this.vars.$searchResultsContainer === undefined) {
          // Add the container element to the vars object
          _this.vars.$searchResultContainer = $(containerClass);
        }

        if (_this.vars.$searchNotice === undefined) {
          // Add the form notice element to the vars object
          _this.vars.$searchNotice = $(searchNoticeClass);
        }

        if (response.output === false) {
          _this.vars.$searchNotice.html(response.message)
            .removeClass(_that.vars.stateClass.hidden);
        } else {
          _this.vars.$searchNotice.addClass(_that.vars.stateClass.hidden);
        }

        if (response.element !== undefined && _that.isOnPage($(response.element))) {
          $(response.element).removeClass(_that.vars.stateClass.loading);
        }

        // Replace the content of the list with the response output
        _this.vars.$searchResultsList.html(response.output);
        // Refresh iScroll element
        _this.vars.$searchResultContainer.trigger('refresh');
      } else {
        _this.log('\t\u2514 Handler request failed:');
        if (_this.options.debug) {
          console.log(response);
        }
      }
    }
  }
});
