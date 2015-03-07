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
    prelude = new Loader()
    prelude.add
      from: __dirname + '/fixtures/music.mp3'

    prelude.on 'end', (result) ->
      expect(result.get('music').tagName).to.be.eq('AUDIO')
      done()

  it 'can preload font', (done) ->
    prelude = new Loader()
    prelude.add
      from: __dirname + '/fixtures/opentype.otf'

    prelude.on 'end', (result) ->
      expect(result.get('opentype').constructor).to.be.eq(Uint8Array)
      done()

  it 'can receive error segment', (done) ->
    prelude = new Loader()
    prelude.add [
      { from: 'invalid_image.png' }
      { from: 'invalid_audio.mp3' }
      { from: 'invalid_font.woff' }
    ]

    prelude.on 'end', (result) ->
      expect(result.getEntry('invalid_image').error).to.be.eq 'Resource not found'
      expect(result.getEntry('invalid_audio').error).to.be.eq 'Resource not found'
      expect(result.getEntry('invalid_font').error).to.be.eq 'Resource not found'
      done()
