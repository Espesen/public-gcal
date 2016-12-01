var gulp = require('gulp')
  , jasmine = require('gulp-jasmine')
  , plumber = require('gulp-plumber');

gulp.task('test', function () {
  gulp.src('test/*.js')
    .pipe(plumber())
    .pipe(jasmine());
});

gulp.task('watch', function () {
  gulp.watch(['test/*.js', 'index.js'], ['test']);
});

// TODO: add jshint