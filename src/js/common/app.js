/**
 * Name: Graffino Global Object
 * Author: Graffino (http://www.graffino.com)
 */


/* eslint array-callback-return: 0, no-mixed-operators: 0 */

// Mute jQuery migrate
$.migrateMute = true;

const $graffino = {
  project: 'Graffino',
  name: 'god-object',

  // Global options
  options: {
    debug: true,
    forceDebug: false,
    clearConsole: false
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
      open: 'is-open',
      active: 'is-active',
      hidden: 'is-hidden',
      sticky: 'is-sticky',
      notValid: 'not-valid',
      current: 'is-current',
      visible: 'is-visible',
      focused: 'is-focused',
      touched: 'is-touched',
      loading: 'is-loading',
      overlay: 'has-overlay',
      animated: 'is-animated',
      submitted: 'is-submitted',
      minimized: 'is-minimized',
      scrollable: 'is-scrollable',
      noResults: 'has-no-results',
      slicked: 'slick-initialized',
      notInitialized: 'not-initialized',
      isMasonry: 'is-masonry-initialized'
    },
    // Responsive breakpoints
    breakpoints: {
      large: 1050,
      medium: 940,
      tablet: 768,
      small: 640,
      xsmall: 480
    },
    // Easing
    ease: {
      easeOutQuad: [0.250, 0.460, 0.450, 0.940],
      easeOutBack: [0.175, 0.885, 0.320, 1.275]
    }
  },

  // Initialize methods
  init() {
    const _this = this;

    // Clearing the console
    if (_this.options.debug && _this.options.clearConsole) {
      console.clear();
    }

    // Output to console init message
    _this.log('God object initialized. Console cleared. Loading plugins...');


    /**
     * Call the auto-init methods
     */

    Object.keys(_this).filter(key => {
      // Assign and bind the log method for every inner method
      $.extend(_this[key], {log: _this.log.bind(_this[key])});
      if ({}.hasOwnProperty.call(_this[key], 'init') && _this[key].options.autoInit) {
        return _this[key];
      }
    }).forEach((key, index, arr) => {
      let loadMsg = '';
      try {
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

  log() {
    let newMsg = [];
    if (this.options.debug && $graffino.options.debug) {
      newMsg = Array.prototype.slice.call(arguments).reduce((accum, item) => accum + ' ' + item, '');
      console.log($graffino.project + '/' + this.name + ' ▶', newMsg);
    }
  },

  searchWord(str, word) {
    return (str.indexOf(word) >= 0) ? str.substr(str.indexOf(word) + word.length) : false;
  },

  lastChar(str) {
    return str.charAt(str.length - 1);
  },

  isOnPage(el) {
    let condition;

    if (typeof el === 'string') {
      condition = $(el).size() > 0;
    }

    if (typeof el === 'object') {
      condition = el.size() > 0;
    }

    return condition ? 1 : 0;
  },

  remove(item, obj) {
    if (typeof obj === 'object') {
      return obj.splice(obj.indexOf(item), 1);
    }
  },

  searchKey(key, obj) {
    let result = false;

    // Called with every property and it's value
    function process(k) {
      if (k === key) {
        result = true;
      }
    }

    // Traverse function that iterates over the objects tree
    function traverse(o, func) {
      for (const i in o) {
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

  hasStorage() {
    const _this = this;
    let result;

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

  callFuncArray(arr) {
    // Firing each function found in the array if it passes minimum validation
    if (typeof arr === 'object' && arr.length > 0) {
      arr.map(func => typeof func === 'function' ? func() : false);
    }
  },

  // Add leading zeros to a number
  pad(num, size) {
    let s = num.toString();
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  },

  randomFromRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

$(document).ready(() => {
  try {
    $graffino.init();
  } catch (err) {
    $graffino.log('ERROR in god-object init().');
    console.error('\t', err);
  }
});
