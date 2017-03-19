var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')({lazy:true});
var config = require('./gulp/config'); // without the ./ it will look for a PACKAGE named,() to run function

var jsSources = config.alljs;

gulp.task('vet', function(){
  /*jshint*/
  log('Analyzing source with JSHint and JSCS');
  return gulp
  .src(jsSources)
  .pipe($.if(args.verbose, $.print())) // using gulp-print to show the list of files that were touched.
  .pipe($.jscs())
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish',{verbose:true}))
  .pipe($.jshint.reporter('fail')); // Fail the CI build, if the jshint fails.
});//end:vet

//styles - to compile and autoprefix the LESS files
gulp.task('styles',['clean-styles','wiredep'],function(){
  log('Compiling LESS to CSS');
  return gulp
  .src(config.paths.less) // TODO: add the property to gulp.config.js
  .pipe($.less())
  .on('error',errorLogger) //On error - defer to errorLogger function
  .pipe($.autoprefixer({browsers:['last 2 version', '>5%']})) // autoprefixer - browsers in the market
  .pipe($.plumber()) // This is another type of error handling
  .pipe(gulp.dest(config.paths.temp)); //TODO :add the property to gulp.config.js
});//end:styles

gulp.task('clean-styles',function(){
  var files = config.paths.temp + '**/*.css';
  // del(files);
  clean(files);
});//end:clean-styles

gulp.task('less-watcher',['styles'], function(){
  gulp.watch([config.paths.watchLess],['styles']); // 2 param arrays - source array and task array
});//end:less-watcher

gulp.task('wiredep',function(){
  var options = config.getWiredepDefaultOptions(); //TODO: configure getWiredepDefaultOptions
  var wiredep = require('wiredep').stream; // that is going to get the stream
  return gulp
    .src(config.paths.htmlFiles)
    .pipe(wiredep(options)) // this will look into bower.json
    // .pipe($.inject(gulp.src(config.js))) //this will use gulp-inject and inject files
    .pipe(gulp.dest(config.paths.client));
});//end:wiredep

gulp.task('inject',['styles'],function(){
  return gulp
    .src(config.paths.htmlFiles)
    .pipe($.inject(gulp.src(config.paths.css))) //this will use gulp-inject and inject files
    .pipe(gulp.dest(config.paths.client));
});//end:inject


gulp.task('serve-dev',['inject'],function() {
  log('Serving the application on port: ' + config.port);
  return gulp
  .src('.')
    .pipe($.webserver({
      livereload: true,
      directoryListing: true,
      port:config.port,
      open: config.urlPath // OR just set open to true
    }));
});//end:serve-dev

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


// Reusable Functions
//log function
function log(msg){
  if(typeof(msg) === 'object'){
    // To hide jshint we can use the comment feature below and comment the work code.
    /*jshint -W117*/
    for(var item in msg){
        if(msg.hasOwnProperty(item)){
          $.util.log($.util.colors.blue(msg[item]));
        }
    }//end:foreach
  }else{
    $.util.log($.util.colors.blue(msg));
  }
}//end:log

//clean function
function clean(path){
  log('Cleaning: '+$.util.colors.blue(path));
  del(path);
}//end:clean

//errorLogger function
function errorLogger(error){
  log('***Start of Error***');
  log(error);
  log('***End of Error***');
  this.emit('end'); // This will end the pipe and give some info
}//end:errorLogger
