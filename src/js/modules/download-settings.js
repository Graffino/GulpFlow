/**
 * Name: Download Settings
 * Author: Graffino (http://www.graffino.com)
 */


$.extend($graffino, {
  downloadSettings: {
    name: 'download-settings',

    // Plugin options
    options: {
      autoInit: true,
      debug: false
    },

    // Scoped variables
    vars: {
      $trigger: undefined,
      $source: undefined,
      downloadSourceClass: '.js-download-source',
      downloadTriggerClass: '.js-download-settings-trigger',
      exportData: undefined
    },

    // Init method
    init() {
      const _that = $graffino,
        _this = this,
        vars = this.vars;

      _this.log('Initialized.');

      vars.$trigger = $(vars.downloadTriggerClass);
      vars.$source = $(vars.downloadSourceClass);

      // Check if element is in DOM
      if (_that.isOnPage(vars.$trigger) && _that.isOnPage(vars.$source)) {
        // Get the export data from the source field
        _this.getExportData();
        _this.toggleDownloadButton();

        // Bind the click event for the download trigger button
        vars.$trigger.on('click', event => {
          // If data is not valid prevent the file from being downloaded
          if (vars.exportData === false) {
            event.preventDefault();
            _that.notifications.display('Sorry, there is no data to export.', 'error');
          } else {
            _that.notifications.display('Settings JSON file has started downloading...', 'success');
          }
        });

        // Bind the 'change' event to the export data source field
        vars.$source.on('change', () => _this.toggleDownloadButton());
      } else {
        _this.log('\t\u2514 Element(s) not found in DOM.');
      }
    },

    // Method to fetch the export data field value
    getExportData() {
      const _this = this,
        vars = _this.vars;
      // Get the value from the download settings source field
      vars.exportData = vars.$source.val();
      // Check if export data is valid (not empty)
      vars.exportData = (vars.exportData.length > 0 && vars.exportData !== '[]') ? vars.exportData : false;
    },

    // Method that disables/enables the download trigger button
    toggleDownloadButton() {
      const _that = $graffino,
        _this = this,
        vars = _this.vars;
      // Fetch the settings data
      _this.getExportData();
      // Check if it's valid
      if (vars.exportData === false) {
        // If it's not valid disable the button
        vars.$trigger.attr('disabled', true);
      } else {
        // If it is enable the button
        vars.$trigger.attr('disabled', false)
        // Add the href value
        // Return the href value with base64 encoded data settings
        .attr('href', () => 'data:application/octet-stream;charset=utf-8;base64,' + btoa(vars.exportData))
        // Set the name for the file
        .attr('download', () => {
          const currentDate = new Date(),
            site = vars.$trigger.attr('data-site-name'),
            date = {
              y: currentDate.getFullYear(),
              // Get month with leading 0
              m: _that.pad(currentDate.getMonth(), 2),
              // Bet day with leading 0
              d: _that.pad(currentDate.getDay(), 2),
              h: currentDate.getHours(),
              i: currentDate.getMinutes(),
              s: currentDate.getSeconds()
            };
          return '{0}__{1}-{2}-{3}__{4}h-{5}m-{6}s.json'.format(site, date.y, date.m, date.d, date.h, date.i, date.s);
        });
      }
    }
  }
});
