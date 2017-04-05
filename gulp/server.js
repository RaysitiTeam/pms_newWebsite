'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.main || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.main) !== -1)) {
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    ghostMode: false
  });
}

// browserSync.use(browserSyncSpa({
//   selector: '[ng-app]'// Only needed for angular apps
// }));

gulp.task('serve', ['watch'], function () {
  browserSyncInit(conf.paths.main);
});

gulp.task('serve:release', ['watch', 'release'], function() {
    browserSync.init({
        server: '.',
        startPath: '/release/',
    });
});

gulp.task('watch',['inject'], function(){
  gulp.watch([conf.paths.watchLess],['styles']); // 2 param arrays - source array and task array
  gulp.watch([conf.paths.src],['inject']); // 2 param arrays - source array and task array
  gulp.watch(path.join(conf.paths.css), function(event) {
    browserSync.reload(event.path);
  });
  gulp.watch(path.join(conf.paths.htmlFiles), function(event) {
    browserSync.reload(event.path);
  });
  gulp.watch(path.join(conf.paths.src,'app/**/*'), function(event) {
    browserSync.reload(event.path);
  });
});//end:less-watcher

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
