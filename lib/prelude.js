
/*
 * Prelude.js
 * Simple JavaScript preloader
#
 * Examples and document at http://uetchy.github.com/prelude
#
 * Yasuaki Uechi
 * License: MIT License
 */
var EventEmitter, path,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

path = require('path');

(function(definition) {
  var Prelude;
  if (typeof exports === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    define(definition);
  } else {
    Prelude = definition;
  }
})(function() {
  'use strict';
  var Prelude;
  return Prelude = (function(superClass) {
    extend(Prelude, superClass);

    function Prelude(element, options) {
      var attrname, i, len;
      this.element = element;
      if (options == null) {
        options = {};
      }
      this.options = {
        blah: 'blah'
      };
      for (i = 0, len = options.length; i < len; i++) {
        attrname = options[i];
        this.options[attrname] = options[attrname];
      }
      this.objects = [];
    }

    Prelude.prototype.add = function(entries) {
      var el, i, len;
      if (entries.constructor === Array) {
        for (i = 0, len = entries.length; i < len; i++) {
          el = entries[i];
          this.objects.push(el);
        }
      } else {
        this.objects.push(entries);
      }
      console.log(this.ev);
      return this._preload();
    };

    Prelude.prototype._preload = function() {
      var i, len, ref, results, total, url;
      setTimeout((function(_this) {
        return function() {
          return _this.emit('end');
        };
      })(this), 200);
      total = this.objects.length;
      ref = this.objects;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        url = ref[i];
        console.log(url);
        switch (path.extname(url)) {
          case '.mp3':
            results.push(this._loadAudio(url, this._resourceLoaded));
            break;
          case '.jpg':
            results.push(this._loadImage(url, this._resourceLoaded));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    Prelude.prototype._resourceLoaded = function() {};

    Prelude.prototype._loadImage = function(uri, callback) {
      var image;
      image = new Image();
      img.onload = callback;
      return img.src = uri;
    };

    Prelude.prototype._loadAudio = function(uri, callback) {
      var audio;
      audio = new Audio();
      audio.addEventListener('canplaythrough', callback(), false);
      return audio.src = uri;
    };

    return Prelude;

  })(EventEmitter);
});
