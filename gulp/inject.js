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

gulp.task('injectStyles',['styles'],function(){
  return gulp
    .src(conf.paths.allHTMLFiles)
    .pipe($.inject(gulp.src(conf.paths.css))) //this will use gulp-inject and inject files
    .pipe(gulp.dest(conf.paths.client));
});//end:inject

gulp.task('injectScripts',function(){
	var injectScripts = gulp.src( [
    path.join( conf.paths.src, 'main.js' ),
    path.join( conf.paths.src, '/app/*.js' ),
    path.join( conf.paths.src, '/app/**/*.js' ),
    path.join( conf.paths.src, '/app/**/**/*.js' ),
    path.join( '!' + conf.paths.src, '/app/**/*.spec.js' ),
    path.join( '!' + conf.paths.src, '/app/**/*.mock.js' )
  ] );

	return gulp
		.src(conf.paths.allHTMLFiles)
		.pipe($.inject(injectScripts)) //this will use gulp-inject and inject files
		.pipe(gulp.dest(conf.paths.client));
});//end:injectScripts

gulp.task('inject',['wiredep','injectStyles','injectScripts']);//end:inject
