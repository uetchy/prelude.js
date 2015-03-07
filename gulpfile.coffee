gulp       = require 'gulp'
gulpif     = require 'gulp-if'
uglify     = require 'gulp-uglify'
derequire  = require 'gulp-derequire'
sourcemaps = require 'gulp-sourcemaps'
browserify = require 'browserify'
source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'

{argv} = require 'yargs'
debug = !argv.production

gulp.task 'build', ->
  browserify
    entries: ['./src/prelude.coffee']
    extensions: ['.coffee']
    standalone: 'Prelude'
  .transform 'coffeeify'
  .bundle()
  .on 'error', (err) ->
    console.log err.message
    @emit 'end'
  .pipe source 'prelude.js'
  .pipe gulpif !debug, derequire()
  .pipe gulpif !debug, buffer()
  .pipe gulpif !debug, uglify()
  .pipe gulp.dest './lib'

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build']
