/**
 * Name: Graffino Global Object
 * Author: Graffino (http://www.graffino.com)
 */

/* global Vue */
/* eslint array-callback-return: 0, no-mixed-operators: 0 */

// Mute jQuery migrate
$.migrateMute = true;

const $graffino = {
  project: 'Graffino',
  name: 'god-object',

  // Vue related objects (comms. bus, components, etc)
  Vue: {
    Bus: new Vue(),
    Filters: {},
    Mixins: {},
    Components: {}
  },

  // Global options
  options: {
    debug: false,
    forceDebug: false,
    clearConsole: false
  },

  // Global object variables
  vars: {
    // Hooks and actions
    hooks: [
      'BEFORE_INIT',
      'GLOBAL_FUNCTIONS',
      'HANDLERS',
      'PLUGINS',
      'VUE_FILTERS',
      'VUE_MIXINS',
      'VUE_COMPONENTS',
      'VUE_INSTANCES',
      'HELPERS',
      'AFTER_INIT'
    ],
    actions: {},
    initErrors: {},

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
      hasArrow: 'has-arrow',
      overlay: 'has-overlay',
      animated: 'is-animated',
      submitted: 'is-submitted',
      minimized: 'is-minimized',
      scrollable: 'is-scrollable',
      noResults: 'has-no-results',
      slicked: 'slick-initialized',
      selectified: 'select2-initialized',
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

  // Resources
  resources: {
    data: {}
  },

  // Initialize god object and its methods
  init() {
    const _this = this;

    // Clearing the console
    if (_this.options.debug && _this.options.clearConsole) {
      console.clear();
    }

    // Replace no-js
    _this.vars.$html.removeClass('no-js').addClass('js');

    // Output to console init message
    _this.log('God object initialized. Loading plugins...');

    // Call auto-init methods and registered components (for hooks)
    _this.vars.hooks.map(hook => this.handleHook(hook));
  },

  // Get method keys
  getComponentKeys() {
    return Object.keys(this).filter(key => {
      const method = this[key];
      // Filter methods that have autoInit set to true and have an init method
      if (_.has(method, 'init') && _.has(method, ['options', 'autoInit']) && method.options.autoInit) {
        return method;
      }
    });
  },

  // Get partial components for given hook
  getComponentsFor(hook) {
    return this.getComponentKeys()
      // Filter methods by hooks
      .filter(methodKey => _.has(this[methodKey], ['options', 'hook']) && this[methodKey].options.hook === hook)
      // Return a new array with the init functions
      .map(methodKey => this[methodKey]);
  },

  // Fetch methods that have been registered for the given hook
  getActionComponentsFor(hook) {
    return _.has(this.vars.actions, hook) ? this.vars.actions[hook] : [];
  },

  // Add init error for hook
  storeInitErrorFor(hook, componentName, error) {
    if (_.has(this.vars.initErrors, hook)) {
      this.vars.initErrors[hook].count++;
      this.vars.initErrors[hook].methods.push(componentName);
    } else {
      Object.assign(this.vars.initErrors, {
        [hook]: {
          count: 1,
          methods: [componentName]
        }
      });
    }

    this.log('ERROR in ' + componentName + '.init()');
    console.error('\t', error);
  },

  // Get status for hook
  getStatusFor(hook) {
    let errorCount = 0;

    if (_.has(this.vars.initErrors, hook)) {
      errorCount = this.vars.initErrors[hook].count;
    }

    const statusIcon = errorCount === 0 ? '\u2705' : '\u2757';
    let status = `${statusIcon}  ${errorCount} error(s)`;
    status += errorCount > 0 ? ` in [${this.vars.initErrors[hook].methods}].` : '.';

    return status;
  },

  // Assign and bind the log method for given component
  bindLogFor(component) {
    // Check if force debug mode option is enabled
    if (this.options.forceDebug && _.has(component, ['options', 'debug'])) {
      // If it is, change the debug option to true for this component
      component.options.debug = true;
    }

    return Object.assign(component, {
      log: this.log.bind(component)
    });
  },

  // Check if hook is valid (exists in the hooks array)
  isHookValid(hook) {
    return _.includes(this.vars.hooks, hook);
  },

  // Get components for given hook and initialize (catch errors if they occur)
  handleHook(hook) {
    const _this = this;

    // Get registered actions for current hook
    const actionComponents = _this.getActionComponentsFor(hook);
    const autoInitComponents = this.getComponentsFor(hook);
    const components = _.concat(actionComponents, autoInitComponents);

    // If there are no methods or registered actions for this hook exit
    if (components.length === 0) {
      return;
    }

    // Assign and bind the log method for every inner method
    autoInitComponents.map(component => this.bindLogFor(component));

    // Log out hook head
    _this.logHeader(`Initialize ${hook}`);

    components.map((component, index, componentsArray) => {
      try {
        // Initialize component
        this.initializeComponent(component, index, componentsArray.length);
      } catch (error) {
        // Store error for this hook
        this.storeInitErrorFor(hook, component.name, error);
      }

      // If it's the last component in the array log out the hook components init status
      if (index === componentsArray.length - 1) {
        _this.log(this.getStatusFor(hook));
      }
    });

    if (_this.options.debug) {
      console.log('\n\n');
    }
  },

  // Initialize component
  initializeComponent(component, index, componentsCount) {
    this.log(`Initializing ${index + 1} of ${componentsCount} ░ ${component.name}`);
    // Initialize component
    component.init();
  },

  // Method for registering callbacks for specific hooks
  doAction(hook, name, callback) {
    const _this = this,
      // Function that cheks if given hook is valid
      isHookValid = this.isHookValid(hook),
      // Function that checks if the given callback is a valid function
      hasValidCallback = _.isFunction(callback),
      // Factory function that returns an action object with name property and init method
      Action = () => {
        // Convert the name of the method to UpperCamelCase
        const objectName = _.upperFirst(_.camelCase(name));
        // Action object itself
        return {
          name,
          init: () => callback(objectName, name)
        };
      };

    // Validate given arguments
    if (isHookValid && hasValidCallback) {
      // Check if we have the hook already in the actions object
      // If we do, just push the new action to it
      // If not, create a new array with the new action
      if (_.has(_this.vars.actions, hook)) {
        return _this.vars.actions[hook].push(new Action());
      } else {
        return _this.vars.actions = Object.assign(_this.vars.actions, {
          [hook]: [new Action()]
        });
      }
    }
  },

  // Log out an n number of arguments if debug is set to true on both the God Object and the component itself
  log() {
    // If debug mode is not active we just quit the function
    if (!this.options.debug || !$graffino.options.debug) {
      return false;
    }

    // Here we get the arguments and build a string of their values
    const newMsg = Array.prototype.slice.call(arguments).reduce((accum, item) => accum + ' ' + item, '');
    // Output the arguments string to the console
    console.log($graffino.project + '/' + this.name + ' ▶', newMsg);
  },

  // Generates the console header (text with borders for easy separation)
  logHeader(text) {
    const _this = this,
      // Generates a sring of x empty spaces
      padding = _.repeat(' ', 10),
      // Create the header string with padding and text
      header = `${padding}${text}${padding}`,
      // Generates a string of borders with the length of the header
      border = _.repeat('═', header.length);

    // Log out the header
    _this.log(`╔${border}╗`);
    _this.log(`║${header}║`);
    _this.log(`╚${border}╝`);
  }
};

// Wait for DOM ready event and try to initialize the God Object
$(document).ready(() => {
  try {
    // Apply a trimeout of 0 to shift the functiont o the next stack of execution
    setTimeout(() => $graffino.init(), 0);
  } catch (error) {
    // Catch the error and console log it
    $graffino.log('ERROR in god-object init().');
    console.error('\t', error);
  }
});
