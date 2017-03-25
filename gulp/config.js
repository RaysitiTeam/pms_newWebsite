/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

var client = './';
var clientApp = './src/app';
var temp = './.tmp';
var lessFolder = './less';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  temp:temp,
  css:temp+'/*.css',
  watchLess:[
    lessFolder + '/main.less', //creating less files for each page
    lessFolder + '/pages/*.less' //creating less files for each page
  ],
  less:[
    // lessFolder + '/main/*.less', // main Bootswatch less files
    lessFolder + '/main.less' //creating less files for each page
  ],
  src: 'src',
  main:'',
  dist: 'release',
  devDist: 'dev-release',
  tmp: '.tmp',
  fontsFolder:'fonts',
  jsonFolder:'data/json',
  data:'data',
  imagesFolder:'images',
  htmlFiles:'index.html',
  allHTMLFiles:'*.html',
  e2e: 'e2e',
  js:[
    clientApp + '**/*.module.js',
    clientApp + '*.js', //routes.js
    clientApp + '**/*.js',
    '!' + clientApp + '**/*.spec.js',
  ],
  client:client
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  json:require('../bower.json'),
  directory:'./bower_components/',
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/require\.js/],
  // json:require('../bower.json'),
  // directory: 'bower_components'
};

exports.getWiredepDefaultOptions = function(){
  var options = {
    bowerJson:exports.wiredep.json,
    directory:exports.wiredep.directory,
    ignorePath:exports.wiredep.exclude
  };
  return options;
};//end:getWiredepDefaultOptions

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
