gulp = require 'gulp'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'
uglify = require 'gulp-uglify'
concat = require 'gulp-concat'

gulp.task 'build', ->
  gulp.src 'src/**/*.coffee'
    .pipe plumber()
    .pipe coffee bare: true
    .pipe uglify()
    .pipe concat('prelude.js')
    .pipe gulp.dest './'

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build']
