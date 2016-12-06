var gulp = require('gulp')
  , jasmine = require('gulp-jasmine')
  , plumber = require('gulp-plumber')
  , jshint = require('gulp-jshint');

gulp.task('test', function () {
  gulp.src('test/*.js')
    .pipe(plumber())
    .pipe(jasmine());
});

gulp.task('jshint', function () {
  gulp.src(['test/*.js', 'index.js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['jshint', 'test'], function () {
  gulp.watch(['test/*.js', 'index.js'], ['jshint', 'test']);
});

// TODO: add jshint