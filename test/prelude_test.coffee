{expect} = require 'chai'
path     = require 'path'

Prelude  = require '../prelude'

describe 'prelude', ->
  it 'can preload image', (done) ->
    prelude = new Prelude()
    prelude.add [
      __dirname + '/fixtures/test.jpg'
      __dirname + '/fixtures/test2.jpg'
    ]
    prelude.animator = Curtain.ProgressBar
    prelude.on 'end', ->
      done()

  it 'can preload audio'
  it 'can preload font'
