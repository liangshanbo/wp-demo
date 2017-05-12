var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack',function(){
	var config = webpackConfig;
	return gulp
	.src('./src/index.js')
	.pipe(gulpWebpack(config))
	.pipe(gulp.dest('./dist'));
})

gulp.task('default',['webpack']);