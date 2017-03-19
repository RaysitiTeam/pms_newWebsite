'use strict';

var path = require( 'path' );
var gulp = require( 'gulp' );
var conf = require('./config');

var $ = require( 'gulp-load-plugins' )();

var wiredep = require( 'wiredep' )
	.stream;
var _ = require( 'lodash' );

var browserSync = require( 'browser-sync' );

gulp.task( 'inject-reload', [ 'inject' ], function () {
	browserSync.reload();
});

gulp.task('inject',['styles'],function(){
  return gulp
    .src(conf.paths.htmlFiles)
    .pipe($.inject(gulp.src(conf.paths.css))) //this will use gulp-inject and inject files
    .pipe(gulp.dest(conf.paths.client));
});//end:inject
