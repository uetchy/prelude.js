gulp = require 'gulp'
# uglify = require 'gulp-uglify'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'build', ->
  browserify
    entries: ['./src/prelude.coffee']
    extensions: ['.coffee', '.js']
    debug: true
  .transform 'coffeeify'  # coffee
  .bundle()
  .on 'error', (err) ->
    console.log err.message
    this.emit 'end'
  .pipe source 'index.js'
  .pipe gulp.dest './lib'

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build']
