{expect} = require 'chai'
path     = require 'path'

Prelude  = require '../lib/prelude'

describe 'prelude', ->
  it 'can preload image', (done) ->
    prelude = new Prelude()
    prelude.add [
      __dirname + '/fixtures/picture.jpg'
      __dirname + '/fixtures/music.mp3'
      __dirname + '/fixtures/opentype.otf'
    ]
    prelude.on 'end', ->
      console.log 'ended'
      done()

    console.log prelude

  it 'can preload audio'
  it 'can preload font'
