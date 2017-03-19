# PMS Medical Website New UI Design
## 18th March 2017

You need the following for building the website.
- Node JS
- Node Package Manager
- Bower
- Gulp

>NOTE: Production Ready Website is in `release` folder. All files will be minified as vendor.js & app.js

---

## 19th March 2017

Installed Bower dependencies. Created the following folder -
- `data`
  - `screenshots` : Contains all agreed screenshots design.
  - `json` : This will contain all JSON related files for treatments & members list.

## Gulp dependencies
```javascript
{
  "name": "pms_newWebsite",
  "version": "1.0.0",
  "description": "PMS New UI Website",
  "main": "gulpfile.js",
  "scripts": {
    "start": "http-server"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/RaysitiTeam/pms_newWebsite.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/RaysitiTeam/pms_newWebsite/issues"
  },
  "homepage": "https://github.com/RaysitiTeam/pms_newWebsite#readme",
  "devDependencies": {
    "bower": "~1.4.1",
    "browser-sync": "^2.18.5",
    "del": "^2.2.2",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.1",
    "gulp-if": "^2.0.2",
    "gulp-inject": "^4.2.0",
    "gulp-jscs": "^4.0.0",
    "gulp-jshint": "^2.0.4",
    "gulp-less": "^3.3.0",
    "gulp-load-plugins": "^1.4.0",
    "gulp-nodemon": "^2.2.1",
    "gulp-plumber": "^1.1.0",
    "gulp-print": "^2.0.1",
    "gulp-util": "^3.0.8",
    "gulp-webserver": "^0.9.1",
    "jshint": "^2.9.4",
    "wiredep": "^4.0.0",
    "yargs": "^6.6.0"
  }
}
```  

## Bower dependencies

```javascript
{
  "name": "pms_newWebsite",
  "version": "1.0.0",
  "homepage": "https://github.com/RaysitiTeam/pms_newWebsite",
  "url": "https://github.com/RaysitiTeam/pms_newWebsite/issues",
  "authors": [
    "Pramod Jingade"
  ],
  "description": "PMS Medical Website",
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components"
  ],
  "dependencies": {
    "jquery": "~3.1.1",
    "jquery-ui": "~1.12.1",
    "jquery.easing": "~1.3.1",
    "Ionicons": "ionicons#2.0.1",
    "angular": "~1.5.8",
    "angular-route": "~1.5.8",
    "angular-slimscroll": "~1.1.5",
    "angular-smart-table": "~2.1.3",
    "angular-toastr": "~2.1.1",
    "angular-touch": "~1.5.8",
    "angular-ui-sortable": "~0.15.0",
    "animate.css": "~3.5.2",
    "bootstrap": "~3.3.5",
    "bootstrap-select": "~1.12.1",
    "bootstrap-switch": "~3.3.2",
    "bootstrap-tagsinput": "~0.7.1",
    "font-awesome": "fontawesome#~4.4.0",
    "fullcalendar": "~3.0.1",
    "highlight": "~8.8.0",
    "leaflet": "~0.7.5",
    "moment": "~2.17.0",
    "slimScroll": "jquery-slimscroll#~1.3.6",
    "angular-progress-button-styles": "~0.1.0",
    "angular-ui-router": "~0.3.2",
    "angular-chart.js": "~1.0.3",
    "angular-chartist.js": "~3.3.12",
    "chartist": "0.9.5",
    "angular-morris-chart": "~1.1.0",
    "ionrangeslider": "2.1.4",
    "angular-bootstrap": "~1.3.3",
    "angular-animate": "~1.5.8",
    "textAngular": "~1.4.6",
    "angular-xeditable": "~0.5.0",
    "ng-js-tree": "~0.0.7",
    "angular-ui-select": "^0.19.6",
    "ngstorage": "^0.3.11"
  },
  "resolutions": {
    "angular": "~1.5.9",
    "jquery": "~3.1.1"
  },
  "overrides": {
    "bootstrap": {
      "main": [
        "dist/css/bootstrap.css",
        "js/dropdown.js",
        "./dist/fonts/**.*"
      ]
    },
    "slimScroll": {
      "main": "./jquery.slimscroll.js"
    },
    "font-awesome": {
      "main": [
        "css/font-awesome.css",
        "fonts/FontAwesome.otf",
        "fonts/fontawesome-webfont.eot",
        "fonts/fontawesome-webfont.svg",
        "fonts/fontawesome-webfont.ttf",
        "fonts/fontawesome-webfont.woff",
        "fonts/fontawesome-webfont.woff2"
      ]
    }
  }
}
```
