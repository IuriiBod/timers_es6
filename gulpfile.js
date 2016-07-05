'use strict';

var gulp = require('gulp'),
    server = require( 'gulp-develop-server'),
    less = require('gulp-less'),
    lessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new lessAutoprefix({ browsers: ['last 3 versions']}),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
		fs = require('fs');
    
var paths = {
  server: './app.js',
  js6: './src/js/timer.main.js',
  js5: './public/js',
  less: './src/less/*.less',
  css: './public/css/style.css',
	dest: './public/js/'
};

//babel
gulp.task('build', function () {
	return browserify(paths.js6)
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		//.pipe(fs.createWriteStream('bundle.js'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.dest));
});

//less
gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less({
        plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./public/css'));
});

//server start
gulp.task('server:start', function() {
    server.listen( { path: paths.server } );
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch( [ paths.server ], server.restart );
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.js6, ['build']);
});

//default
gulp.task('default', ['server:start', 'server:restart', 'less', 'watch']);