{expect} = require 'chai'
path     = require 'path'

Loader   = require '../lib/prelude'

describe 'prelude', ->
  it 'can preload images', (done) ->
    prelude = new Loader()
    prelude.add [
      { from: __dirname + '/fixtures/picture.jpg' }
      { from: __dirname + '/fixtures/picture2.jpg' }
    ]

    prelude.on 'end', (result) ->
      expect(result.get).to.be.a('function')
      expect(result.get('picture').tagName).to.be.eq('IMG')
      done()

  it 'can preload audio', (done) ->
    this.timeout 15000

    prelude = new Loader()
    prelude.add
      from: __dirname + '/fixtures/music.mp3'

    prelude.on 'end', (result) ->
      expect(result.get('music').tagName).to.be.eq('AUDIO')
      result.get('music').play()
      done()

  it 'can preload font'
