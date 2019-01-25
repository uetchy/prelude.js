"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var path = require('path');

var Prelude =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Prelude, _EventEmitter);

  function Prelude(element) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Prelude);

    _this.element = element;
    _this.options = options || {
      blah: 'blah'
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var attrname = _step.value;
        _this.options[attrname] = options[attrname];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _this.entries = {};
    _this.remaining = 0;
    return _possibleConstructorReturn(_this);
  }

  _createClass(Prelude, [{
    key: "add",
    value: function add(query) {
      if (query.constructor == Array) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = query[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var entry = _step2.value;
            this.entries[this._guessName(entry)] = entry;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.remaining += query.length;
      } else {
        this.entries[this._guessName(query)] = query;
        this.remaining += 1;
      }

      this._preload();
    }
  }, {
    key: "getEntry",
    value: function getEntry(name) {
      return this.entries[name];
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.getEntry(name).result;
    }
  }, {
    key: "_guessName",
    value: function _guessName(entry) {
      if (entry.hasOwnProperty('name')) {
        return entry.name;
      } else {
        return path.basename(entry.from, path.extname(entry.from));
      }
    }
  }, {
    key: "_preload",
    value: function _preload() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              name = _step3$value[0],
              entry = _step3$value[1];

          var extn = path.extname(entry.from);

          if (['.mp3', '.wav', '.ogg', '.m4a'].indexOf(extn) > -1) {
            this._loadAudio(entry, this._resourceLoaded);
          } else if (['.jpg', '.png', '.gif', '.jpeg'].indexOf(extn) > -1) {
            this._loadImage(entry, this._resourceLoaded);
          } else if (['.otf', '.ttf', '.eot', '.woff'].indexOf(extn) > -1) {
            this._loadFont(entry, this._resourceLoaded);
          } else {
            this.emit('error', 'Unknown file format for #{entry.from}');
            this.remaining -= 1;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "_resourceLoaded",
    value: function _resourceLoaded() {
      this.remaining -= 1;

      if (this.remaining <= 0) {
        // Promise.resolve(this)
        this.emit('end', this);
      }
    }
  }, {
    key: "_loadImage",
    value: function _loadImage(entry, callback) {
      var _this2 = this;

      tag = new Image();
      tag.addEventListener('load', function () {
        entry.result = _this2;
        callback();
      }, false);
      tag.addEventListener('error', function () {
        entry.error = 'Resource not found';
        callback();
      }, false);
      tag.src = entry.from;
    }
  }, {
    key: "_loadAudio",
    value: function _loadAudio(entry, callback) {
      var _this3 = this;

      tag = new Audio();
      tag.autoplay = false;
      tag.preload = 'none';
      tag.addEventListener('canplaythrough', function () {
        entry.result = _this3;
        callback();
      }, false);
      tag.addEventListener('error', function () {
        entry.error = 'Resource not found';
        callback();
      }, false);
      tag.src = entry.from;
      tag.load();
    }
  }, {
    key: "_loadFont",
    value: function _loadFont(entry, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', entry.from, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function () {
        arrayBuffer = xhr.response;
        bufferString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));

        if (bufferString.indexOf('Not found') < 0) {
          var data = new Uint8Array(arrayBuffer);
          entry.result = data;
          callback();
        } else {
          entry.error = 'Resource not found';
          callback();
        }
      };

      xhr.addEventListener('error', function (e) {
        entry.error = 'Resource not found';
        callback();
      }, false);
      xhr.send(null);
    }
  }]);

  return Prelude;
}(EventEmitter);

module.exports = Prelude;