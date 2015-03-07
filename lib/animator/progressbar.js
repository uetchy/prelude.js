(function(definition) {
  if (typeof exports === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    define(definition);
  } else {
    Curtain.ProgressBar = definition();
  }
})(function() {
  'use strict';
  var Curtain;
  Curtain = Curtain || {};
  Curtain.ProgressBar = (function() {
    function ProgressBar() {
      this.easing = null;
    }

    return ProgressBar;

  })();
  return Curtain.ProgressBar;
});
