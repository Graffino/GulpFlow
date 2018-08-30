/**
 * Name: Gobal Functions
 * Author: Graffino (http://www.graffino.com)
 */

// Reusable generic methods
$graffino.doAction('GLOBAL_FUNCTIONS', 'global-functions', () => {
  return Object.assign($graffino, {
    // Search for string inside another string
    searchWord(str, word) {
      return str.indexOf(word) > -1 ? str.substr(str.indexOf(word) + word.length) : false;
    },

    // Get last character of a given string
    lastChar(str) {
      return str.charAt(str.length - 1);
    },

    // Check if element is on the page
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

    // Remove item from array
    remove(item, array) {
      if (Array.isArray(array)) {
        return array.splice(array.indexOf(item), 1);
      }
    },

    // Recursively search for a key in a given object
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

    // Check if browser support localStorage
    hasStorage() {
      const _this = this;
      let result;

      // Try accessing localStorage
      try {
        localStorage.setItem('testKey', 'testValue');
        localStorage.removeItem('testKey');
        result = true;
      } catch (error) {
        _this.log(error);
        result = false;
      }
      return result;
    },

    // Iterate over an aray of functions and call them
    callFuncArray(arr) {
      // Firing each function found in the array if it passes minimum validation
      if (typeof arr === 'object' && arr.length > 0) {
        arr.map(func => typeof func === 'function' ? func() : false);
      }
    },

    // Replace object keys' value recursively
    replaceObjectValuesRecursively(object, value) {
      const _this = this;
      return Object.keys(object).map(key => {
        if (typeof object[key] === 'object') {
          return _this.replaceObjectValuesRecursively(object[key], value);
        } else {
          return object[key] = value;
        }
      }, {});
    },

    // Add leading zeros to a number
    pad(num, size) {
      let s = num.toString();
      while (s.length < size) {
        s = '0' + s;
      }
      return s;
    },

    // Returns a given random between the max and minimum
    randomFromRange(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Searches for the pipe ("|") character in a string and removes it
    removePipeChar(string) {
      if (string === undefined || string === null) {
        return string;
      }
      return string.toString().replace(/\|/g, '');
    }
  });
});
