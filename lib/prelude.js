
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
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
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
      this._resourceLoaded = bind(this._resourceLoaded, this);
      this.options = {
        blah: 'blah'
      };
      for (i = 0, len = options.length; i < len; i++) {
        attrname = options[i];
        this.options[attrname] = options[attrname];
      }
      this.entries = {};
      this.remaining = 0;
    }

    Prelude.prototype.add = function(query) {
      var entry, i, len;
      if (query.constructor === Array) {
        for (i = 0, len = query.length; i < len; i++) {
          entry = query[i];
          this.entries[this._guessName(entry)] = entry;
        }
        this.remaining += query.length;
      } else {
        this.entries[this._guessName(query)] = query;
        this.remaining++;
      }
      return this._preload();
    };

    Prelude.prototype.get = function(name) {
      return this.entries[name].result;
    };

    Prelude.prototype._guessName = function(entry) {
      if (entry.hasOwnProperty('name')) {
        return entry.name;
      } else {
        return path.basename(entry.from, path.extname(entry.from));
      }
    };

    Prelude.prototype._preload = function() {
      var entry, name, ref, results;
      ref = this.entries;
      results = [];
      for (name in ref) {
        entry = ref[name];
        switch (path.extname(entry.from)) {
          case '.mp3':
          case '.wav':
          case '.ogg':
          case '.m4a':
            results.push(this._loadAudio(entry, this._resourceLoaded));
            break;
          case '.jpg':
          case '.png':
          case '.gif':
          case '.jpeg':
            results.push(this._loadImage(entry, this._resourceLoaded));
            break;
          case '.otf':
          case '.ttf':
          case '.eot':
          case '.woff':
            results.push(this._loadFont(entry, this._resourceLoaded));
            break;
          default:
            this.emit('error', 'Unknown file format for #{entry.from}');
            results.push(this.remaining--);
        }
      }
      return results;
    };

    Prelude.prototype._resourceLoaded = function() {
      this.remaining--;
      if (this.remaining <= 0) {
        return this.emit('end', this);
      }
    };

    Prelude.prototype._loadImage = function(entry, callback) {
      var tag;
      tag = new Image();
      tag.addEventListener('load', function() {
        entry.result = this;
        return callback();
      }, false);
      return tag.src = entry.from;
    };

    Prelude.prototype._loadAudio = function(entry, callback) {
      var tag;
      tag = new Audio();
      tag.autoplay = false;
      tag.preload = 'none';
      tag.addEventListener('canplaythrough', function() {
        entry.result = this;
        return callback();
      }, false);
      tag.src = entry.from;
      return tag.load();
    };

    Prelude.prototype._loadFont = function(entry, callback) {
      return callback(null);
    };

    return Prelude;

  })(EventEmitter);
});
