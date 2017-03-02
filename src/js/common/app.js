/**
 * Name: Graffino Global Object
 * Author: Graffino (http://www.graffino.com)
 */


/* eslint array-callback-return: 0, no-mixed-operators: 0 */

// Mute jQuery migrate
$.migrateMute = true;

var $graffino = {
  project: 'Graffino',
  name: 'god-object',

  // Global options
  options: {
    debug: true,
    forceDebug: false
  },

  // Global object variables
  vars: {
    // Internal vars
    initErrors: 0,
    initErrorMethods: [],
    // DOM elements
    $window: $(window),
    $document: $(document),
    $html: $('html'),
    $body: $('body'),
    // State Classes
    stateClass: {
      active: 'is-active',
      hidden: 'is-hidden',
      visible: 'is-visible',
      overlay: 'has-overlay',
      loading: 'is-loading',
      animated: 'is-animated'
    }
  },

  // Initialize methods
  init: function () {
    var _this = this;

    // Clearing the console
    if (_this.options.debug) {
      console.clear();
    }

    // Output to console init message
    _this.log('God object initialized. Console cleared. Loading plugins...');


    /**
     * Call the auto-init methods
     */

    Object.keys(_this).filter(function (key) {
      if ({}.hasOwnProperty.call(_this[key], 'init') && _this[key].options.autoInit) {
        return _this[key];
      }
    }).forEach(function (key, index, arr) {
      var loadMsg = '';
      try {
        // Assign and bind the log method for every auto-init method
        $.extend(_this[key], {log: _this.log.bind(_this[key])});
        // Check if force debug mode option is enabled
        if (_this.options.forceDebug) {
          // If it is, change the debug option to true in all methods
          _this[key].options.debug = true;
        }
        // Initialize method
        _this[key].init();
      } catch (err) {
        // Counting plugins that failed to load
        _this.vars.initErrors += 1;
        // Adding the name of the method to an array
        _this.vars.initErrorMethods.push(key);
        _this.log('ERROR in ' + key + '.init()');
        console.error('\t', err);
      }
      if (index === arr.length - 1) {
        loadMsg += (_this.vars.initErrors === 0) ? '\u2705' : '\u2757';
        loadMsg += ' Plugins loaded with ' + _this.vars.initErrors + ' error(s)';
        loadMsg += (_this.vars.initErrors > 0) ? ' in [' + _this.vars.initErrorMethods + '].' : '.';
        _this.log(loadMsg);
      }
    });
  },


  /**
   * Reusable generic methods
   */

  log: function () {
    var newMsg = [];
    if (this.options.debug && $graffino.options.debug) {
      newMsg = Array.prototype.slice.call(arguments).reduce(function (accum, item) {
        return accum + ' ' + item;
      }, '');
      console.log($graffino.project + '/' + this.name + ' ▶', newMsg);
    }
  },

  searchWord: function (str, word) {
    return (str.indexOf(word) >= 0) ? str.substr(str.indexOf(word) + word.length) : false;
  },

  lastChar: function (str) {
    return str.charAt(str.length - 1);
  },

  isOnPage: function (el) {
    var condition;

    if (typeof el === 'string') {
      condition = $(el).size() > 0;
    }

    if (typeof el === 'object') {
      condition = el.size() > 0;
    }

    return condition ? 1 : 0;
  },

  remove: function (item, obj) {
    if (typeof obj === 'object') {
      return obj.splice(obj.indexOf(item), 1);
    }
  },

  searchKey: function (key, obj) {
    var result = false;

    // called with every property and it's value
    function process(k) {
      if (k === key) {
        result = true;
      }
    }

    // Traverse function that iterates over the objects tree
    function traverse(o, func) {
      for (var i in o) {
        if ({}.hasOwnProperty.call(o, i)) {
          func.apply(this, [i, o[i]], i);
          if (o[i] !== null && typeof o[i] === 'object') {
            traverse(o[i], func);
          }
        }
      }
    }

    traverse(obj, process);
    return result;
  },

  hasStorage: function () {
    var _this = this,
      result;

    // Try accessing localStorage
    try {
      localStorage.setItem('testKey', 'testValue');
      localStorage.removeItem('testKey');
      result = true;
    } catch (err) {
      _this.log(err);
      result = false;
    }
    return result;
  },

  callFuncArray: function (arr) {
    // Firing each function found in the array if it passes minimum validation
    if (typeof arr === 'object' && arr.length > 0) {
      arr.map(function (func) {
        return typeof func === 'function' ? func() : false;
      });
    }
  },

  // Add leading zeros to a number
  pad: function (num, size) {
    var s = num.toString();
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  },

  randomFromRange: function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

$(document).ready(function () {
  try {
    $graffino.init();
  } catch (err) {
    $graffino.log('ERROR in god-object init().');
    console.error('\t', err);
  }
});
