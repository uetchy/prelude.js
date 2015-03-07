###
# Prelude.js
# Simple JavaScript preloader
#
# Examples and document at http://uetchy.github.com/prelude
#
# Yasuaki Uechi
# License: MIT License
###

{EventEmitter} = require 'events'
path = require 'path'

class Prelude extends EventEmitter
  'use strict'

  constructor: (@element, options={}) ->
    @options =
      blah: 'blah'
    for attrname in options
      @options[attrname] = options[attrname]

    @entries = {}
    @remaining = 0

  add: (query) ->
    if query.constructor == Array
      for entry in query
        @entries[@_guessName(entry)] = entry
      @remaining += query.length
    else
      @entries[@_guessName(query)] = query
      @remaining++

    @_preload()

  getEntry: (name) ->
    @entries[name]

  get: (name) ->
    @getEntry(name).result

  _guessName: (entry) ->
    if entry.hasOwnProperty 'name'
      entry.name
    else
      path.basename(entry.from, path.extname(entry.from))

  _preload: ->
    for name, entry of @entries
      switch path.extname(entry.from)
        when '.mp3', '.wav', '.ogg', '.m4a'
          @_loadAudio(entry, @_resourceLoaded)
        when '.jpg', '.png', '.gif', '.jpeg'
          @_loadImage(entry, @_resourceLoaded)
        when '.otf', '.ttf', '.eot', '.woff'
          @_loadFont(entry, @_resourceLoaded)
        else
          @emit 'error', 'Unknown file format for #{entry.from}'
          @remaining--

  _resourceLoaded: =>
    @remaining--
    if @remaining <= 0
      @emit 'end', this

  _loadImage: (entry, callback) ->
    tag = new Image()
    tag.addEventListener 'load', ->
      entry.result = this
      callback()
    , false
    tag.addEventListener 'error', ->
      entry.error = 'Resource not found'
      callback()
    , false
    tag.src = entry.from

  _loadAudio: (entry, callback) ->
    tag = new Audio()
    tag.autoplay = false
    tag.preload = 'none'
    tag.addEventListener 'canplaythrough', ->
      entry.result = this
      callback()
    , false
    tag.addEventListener 'error', ->
      entry.error = 'Resource not found'
      callback()
    , false
    tag.src = entry.from
    tag.load()

  _loadFont: (entry, callback) ->
    xhr = new XMLHttpRequest()
    xhr.open 'GET', entry.from, true
    xhr.responseType = 'arraybuffer'
    xhr.onload = ->
      arrayBuffer = xhr.response

      if String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)).indexOf("Not found") < 0
        data = new Uint8Array arrayBuffer
        entry.result = data
        callback()
      else
        entry.error = 'Resource not found'
        callback()

    xhr.addEventListener 'error', (e) ->
      entry.error = 'Resource not found'
      callback()
    , false

    xhr.send(null)

module.exports = Prelude
