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

do (definition = ->
  'use strict'

  class Prelude extends EventEmitter
    constructor: (@element, options={}) ->
      # Merge options
      @options =
        blah: 'blah'
      for attrname in options
        @options[attrname] = options[attrname]

      @objects = []

    add: (entries) ->
      if entries.constructor == Array
        for el in entries
          @objects.push el
      else
        @objects.push entries

      console.log @ev

      @_preload()

    _preload: ->
      setTimeout =>
        @emit 'end'
      , 200
      total = @objects.length
      for url in @objects
        console.log url
        switch path.extname(url)
          when '.mp3'
            @_loadAudio(url, @_resourceLoaded)
          when '.jpg'
            @_loadImage(url, @_resourceLoaded)

    _resourceLoaded: () ->


    _loadImage: (uri, callback) ->
      image = new Image()
      img.onload = callback
      img.src = uri

    _loadAudio: (uri, callback) ->
      audio = new Audio()
      audio.addEventListener 'canplaythrough', callback(), false
      audio.src = uri

) ->
  if typeof exports == 'object'
    # CommonJS
    module.exports = definition()
  else if typeof define == 'function' and define.amd
    # RequireJS
    define definition
  else
    # <script>
    Prelude = definition
  return
