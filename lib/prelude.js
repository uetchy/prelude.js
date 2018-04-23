const { EventEmitter } = require('events')
const path = require('path')

class Prelude extends EventEmitter {
  constructor(element, options = {}) {
    this.element = element
    this.options = options || { blah: 'blah' }
    for (const attrname of options) {
      this.options[attrname] = options[attrname]
    }
    this.entries = {}
    this.remaining = 0
  }

  add(query) {
    if (query.constructor == Array) {
      for (const entry of query) {
        this.entries[this._guessName(entry)] = entry
      }
      this.remaining += query.length
    } else {
      this.entries[this._guessName(query)] = query
      this.remaining += 1
    }
    this._preload()
  }

  getEntry(name) {
    return this.entries[name]
  }

  get(name) {
    return this.getEntry(name).result
  }

  _guessName(entry) {
    if (entry.hasOwnProperty('name')) {
      return entry.name
    } else {
      return path.basename(entry.from, path.extname(entry.from))
    }
  }

  _preload() {
    for (const [name, entry] of this.entries) {
      const extn = path.extname(entry.from)
      if (['.mp3', '.wav', '.ogg', '.m4a'].indexOf(extn) > -1) {
        this._loadAudio(entry, this._resourceLoaded)
      } else if (['.jpg', '.png', '.gif', '.jpeg'].indexOf(extn) > -1) {
        this._loadImage(entry, this._resourceLoaded)
      } else if (['.otf', '.ttf', '.eot', '.woff'].indexOf(extn) > -1) {
        this._loadFont(entry, this._resourceLoaded)
      } else {
        this.emit('error', 'Unknown file format for #{entry.from}')
        this.remaining -= 1
      }
    }
  }

  _resourceLoaded() {
    this.remaining -= 1
    if (this.remaining <= 0) {
      this.emit('end', this)
    }
  }

  _loadImage(entry, callback) {
    tag = new Image()
    tag.addEventListener(
      'load',
      () => {
        entry.result = this
        callback()
      },
      false
    )
    tag.addEventListener(
      'error',
      () => {
        entry.error = 'Resource not found'
        callback()
      },
      false
    )
    tag.src = entry.from
  }

  _loadAudio(entry, callback) {
    tag = new Audio()
    tag.autoplay = false
    tag.preload = 'none'
    tag.addEventListener(
      'canplaythrough',
      () => {
        entry.result = this
        callback()
      },
      false
    )
    tag.addEventListener(
      'error',
      () => {
        entry.error = 'Resource not found'
        callback()
      },
      false
    )
    tag.src = entry.from
    tag.load()
  }

  _loadFont(entry, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', entry.from, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      arrayBuffer = xhr.response
      bufferString = String.fromCharCode.apply(
        null,
        new Uint8Array(arrayBuffer)
      )

      if (bufferString.indexOf('Not found') < 0) {
        const data = new Uint8Array(arrayBuffer)
        entry.result = data
        callback()
      } else {
        entry.error = 'Resource not found'
        callback()
      }
    }

    xhr.addEventListener(
      'error',
      e => {
        entry.error = 'Resource not found'
        callback()
      },
      false
    )

    xhr.send(null)
  }
}

module.exports = Prelude
