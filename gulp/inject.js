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

//Finally Template Caching

gulp.task('partials', function () {
	console.log('Starting Partials');
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'pms-app',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
		console.log('Ending Partials');
});

gulp.task('injectAll', ['inject', 'partials'], function () {
	console.log('Starting Inject-All');
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true, dot:true});
  var jsFilter = $.filter('**/*.js', { restore: true, dot:true});
  var cssFilter = $.filter('**/*.css', { restore: true, dot:true});
  var assets;

  return gulp.src(conf.paths.allHTMLFiles)
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(gulp.dest(conf.paths.client));
  });
