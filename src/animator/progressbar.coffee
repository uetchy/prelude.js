do (definition = ->
  'use strict'

  Curtain = Curtain || {}

  class Curtain.ProgressBar
    constructor: ->
      @easing = null

  return Curtain.ProgressBar
) ->
  if typeof exports == 'object'
    # CommonJS
    module.exports = definition()
  else if typeof define == 'function' and define.amd
    # RequireJS
    define definition
  else
    # <script>
    Curtain.ProgressBar = definition()
  return
