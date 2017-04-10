'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var conf = require('./config');


//NOTE: the following will replace src/bower_components with just bower_components
//var transform = $.useref({ transformPath: function(filePath) { return filePath.replace('src/bower_components','bower_components') } });

var assets = $.useref.assets({searchPath:'./'});

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var _ = require('lodash');

gulp.task('dev-fonts', function () {
  return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(path.join(conf.paths.devDist, 'fonts')));
});//end:dev-fonts

gulp.task('copy-fonts-folder', function () {
  console.log('Copying fonts folder');
  return gulp
  .src(path.join(conf.paths.fontsFolder,'/**/*'))
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(path.join(conf.paths.dist, 'fonts')));
});//end:copy-fonts-folder

gulp.task('copy-images-folder',function(){
  console.log('Copying images folder');
  return gulp
  .src(path.join(conf.paths.imagesFolder,'/**/*'))
  .pipe(gulp.dest(path.join(conf.paths.dist,'images')));
});//end:copy-images-folder

gulp.task('copy-json-folder',function(){
  console.log('Copying JSON folder');
  return gulp
  .src(path.join(conf.paths.jsonFolder,'/**/*'))
  .pipe(gulp.dest(path.join(conf.paths.dist,'data/json')));
});//end:copy-images-folder

//New Optimized task to inject all build files
gulp.task('release',['injectAll','copy-images-folder','copy-fonts-folder','copy-json-folder'],function(){
  console.log('Optimize the js,css,html');
  return gulp
    .src(conf.paths.allHTMLFiles)
    .pipe($.plumber()) //Error handling
    //TODO: processing our files
    .pipe(assets) // This line is required with the top var assets to concatenate all css and js into scripts and styles.
    .pipe(assets.restore()) //This line is required to concatenate all css and js into styles and scripts
    .pipe($.useref()) // This line is required to change the links of index.html to lib and app.css/js
    .pipe(gulp.dest(conf.paths.dist));
});//end:optimize

//New Optimized task to inject all build files
gulp.task('release:jquery',['inject','copy-images-folder','copy-fonts-folder'],function(){
  console.log('Building a jQuery version');
  return gulp
    .src(conf.paths.allHTMLFiles)
    .pipe($.plumber()) //Error handling
    //TODO: processing our files
    .pipe(assets) // This line is required with the top var assets to concatenate all css and js into scripts and styles.
    .pipe(assets.restore()) //This line is required to concatenate all css and js into styles and scripts
    .pipe($.useref()) // This line is required to change the links of index.html to lib and app.css/js
    .pipe(gulp.dest(conf.paths.dist));
});//end:optimize

gulp.task('dev-copy-lib', function () {
  var assets = require('wiredep')(_.extend({}, conf.wiredep));
  var srcList = [];
  srcList.push.apply(srcList, assets.js);
  srcList.push.apply(srcList, assets.css);
  return gulp
      .src(srcList/*, { base: '.' }*/)
/*      .pipe($.rename(function (p) {
        p.dirname = p.dirname.replace(/\\/g, '/').replace('bower_components/', '');
        if (p.dirname.indexOf('/') !== -1) {
          p.dirname = p.dirname.substr(0, p.dirname.indexOf('/'));
        }
      }))*/
      .pipe(gulp.dest(path.join(conf.paths.devDist, 'lib')));
});

gulp.task('dev-css-replace', ['dev-copy-assets'], function() {
  return gulp.src(path.join(conf.paths.devDist, '*.html'))
      .pipe($.replace(/<link rel="stylesheet" href="\.\.\/bower_components\/.*\/(.*)"\s*?\/>/g, '<link rel="stylesheet" href="lib/$1" >'))
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-js-replace', ['dev-copy-assets'], function() {
  return gulp.src(path.join(conf.paths.devDist, '.html'))
      .pipe($.replace(/<script src="\.\.\/bower_components\/.*\/(.*)"\s*?>/g, '<script src="lib/$1">'))
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-copy-assets', ['inject', 'dev-copy-lib', 'dev-fonts'], function () {
  return gulp
      .src([
        conf.paths.src + '/**/*',
        path.join(conf.paths.tmp, '/serve/**/*')
      ])
      .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-release', ['dev-css-replace', 'dev-js-replace']);
