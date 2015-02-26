gulp = require 'gulp'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'

gulp.task 'build', ->
  gulp.src 'src/js/*.coffee'
    .pipe plumber()
    .pipe coffee bare: true
    .pipe gulp.dest './'

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build']
