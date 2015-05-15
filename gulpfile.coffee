gulp       = require "gulp"
gulpif     = require "gulp-if"
sourcemaps = require "gulp-sourcemaps"
notify     = require "gulp-notify"
uglify     = require "gulp-uglify"
derequire  = require "gulp-derequire"
browserify = require "browserify"
watchify   = require "watchify"
source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"

handleErrors = ->
  args = Array.prototype.slice.call arguments
  notify.onError
    title: "Compile Error"
    message: "<%= error.message %>"
  .apply @, args
  @emit "end"

buildScript = (watch, debug) ->
  option = {
    entries: ["./src/prelude.coffee"]
    extensions: [".coffee"]
    standalone: "Prelude"
    debug: debug
  }
  bundler =
    if watch
      option.cache        = {}
      option.packageCache = {}
      watchify(browserify(option))
    else
      browserify(option)

  bundler.transform "coffeeify"

  bundle = ->
    bundler
      .bundle()
      .on "error", handleErrors
      .pipe source "prelude.js"
      .pipe buffer()
      .pipe gulpif debug,  sourcemaps.init(loadMaps: true)
      .pipe gulpif !debug, derequire()
      .pipe gulpif !debug, uglify()
      .pipe gulpif debug,  sourcemaps.write(".")
      .pipe gulp.dest "./lib"

  bundler.on "update", -> bundle()
  bundle()

gulp.task "build", ->
  buildScript false, true

gulp.task "build-release", ->
  buildScript false, false

gulp.task "watchify", ->
  buildScript true, true

gulp.task "watch", ["watchify"]
