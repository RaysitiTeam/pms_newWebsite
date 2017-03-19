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

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'release',
  devDist: 'dev-release',
  tmp: '.tmp',
  htmlFiles:['index.html'],
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
