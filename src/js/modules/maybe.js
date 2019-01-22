/**
 * Name: Maybe Implementation
 * Author: Graffino (http://www.graffino.com)
 */

$graffino.doAction('GLOBAL_FUNCTIONS', 'maybe', () => {
  const Maybe = function (value) {
    this.__value = value;
  };

  Maybe.of = value => new Maybe(value);

  Maybe.prototype.isNothing = function () {
    return this.__value === null || this.__value === undefined;
  };

  Maybe.prototype.map = function (fn) {
    if (this.isNothing()) {
      return Maybe.of(null);
    }

    return Maybe.of(fn(this.__value));
  };

  Maybe.prototype.join = function () {
    return this.__value;
  };

  Maybe.prototype.chain = function (fn) {
    return this.map(fn).join();
  };

  Maybe.prototype.orElse = function (defaultValue) {
    if (this.isNothing()) {
      return Maybe.of(defaultValue);
    }

    return this;
  };

  return Object.assign($graffino, {Maybe});
});
