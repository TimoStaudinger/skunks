/*jshint esversion: 6, node: true */
'use strict';

const gutil = require('gulp-util');
const clean = require('gulp-clean');
const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const path = require('path');
const PluginError = require('gulp-util').PluginError;
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
const webpack = require('webpack-stream');

gulp.task('lint', function(done) {
  gutil.log('linting ...');
  return gulp.src('src/**/*.ts')
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report({
      summarizeFailureOutput: true,
      emitError: true
    }));
});

gulp.task('clean', function () {
  return gulp.src(['dist/'], { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('compile', gulp.series(gulp.parallel('lint', 'clean'), function bundle() {
  const webpackConfig = require('./webpack.config.js');
  return gulp.src('src/skunk.ts')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
}));

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', gulp.series('build'))
    .on('all', function(event, path, stats) {
      console.log('');
      gutil.log(gutil.colors.green('File ' + path + ' was ' + event + 'ed, running tasks...'));
    })
    .on('error', function () {
      gutil.log(gutil.colors.green('Error during build tasks: aborting'));
    });
});

gulp.task('build', gulp.series('compile', function buildDone(done) {
  gutil.log(gutil.colors.green('Build done'));
  return done();
}));
gulp.task('test', gulp.series('lint'));
gulp.task('default', gulp.series('watch'));
