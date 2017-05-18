/*安装gulp
npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-notify gulp-livereload del gulp-lithe path gulp-minify-css gulp-util gulp-uglify gulp-cssimport gulp-babel gulp-jshint map-stream gulp-sourcemaps cli --save-dev

*/
var gulp = require('gulp');
var gulpLithe = require('gulp-lithe');
var cssImageLink = gulpLithe.precss;
var jsUglifyPre = gulpLithe.prejs;
var localcache = gulpLithe.localcache;
var path = require('path');
var minifycss = require('gulp-minify-css');
var gulpUtil = require('gulp-util');
var uglify = require('gulp-uglify');
var litheConfig = require('./src/js/config.js'); // lithe config
var localcacheConfig = require('./src/js/lcconfig.js');
litheConfig.basepath = path.resolve(__dirname, './src/js/');
var importCss = require('gulp-cssimport');
var del = require('del');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var mapstream = require('map-stream');
var sourcemaps = require('gulp-sourcemaps');
var base64 = require('gulp-base64');
var sass = require('gulp-ruby-sass'),
   /*autoprefixer = require('gulp-autoprefixer'),*/
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');
var Server = require('karma').Server;

var myReporter = mapstream(function(file, cb) {
	if (!file.jshint.success) {
		// console.log(file.jshint.data[0].file + ':' + file.jshint.results.length);
		file.jshint.results.forEach(function(err) {
			if (err) {
				if (!err.error.reason.match('use strict') && !err.error.reason.match("'module'") && !err.error.reason.match("'exports'")  && !err.error.reason.match("'define'") && !err.error.reason.match("'require'")) {
					console.log(file.jshint.data[0].file + ": line " + err.error.line + ", \r\n reason " + err.error.reason + "\r\n\r\n");
				}
			}
		});
	}
	cb(null, file);
});

//小于20kb的图片进行base64

//sass编译 添加前缀 保存到指定目录，最后提示任务完成
gulp.task('scss', function() {
  return sass('src/scss/**/**/*.scss',{ sourcemap: false })
     /* .pipe(autoprefixer({
          browsers: ['last 10 versions', 'Android >= 4.0','ios 6', 'android 4'],
      }))*/
       .pipe(base64({
            baseDir: 'src/images/*/*',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: false
        }))
      .on('error', sass.logError)
	.pipe(gulp.dest('src/css/'))
    .pipe(notify({ message: 'Scss successfull' }));
});

//在任务执行前，最好先清除之前生成的文件
gulp.task('clean', function() {
    del(['src/css'])
});
//监听文件的是否修改以便执行相应的任务
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/scss/**/**/*.scss', ['scss']);
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['src/css/']).on('change', livereload.changed);

});

gulp.task('litheconcat', function() {
	return gulp
		.src(['./src/js/conf/**/*.js']) // entry file
		.pipe(gulpLithe({
			config: litheConfig // lithe config
		}))
		.pipe(gulp.dest('./temp/js/conf'))
});

gulp.task('concat', function() {
	return gulp.src(['./src/js/lithe.js', './src/js/config.js', './src/js/lithe-localcache.js'])
		.pipe(gulp.dest('./dist/js/'));
})

gulp.task('moveimages', function() {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('h5styles', ['moveimages'], function() {
	var timestamp = new Date().getTime();
	return gulp.src('./src/css/**/*.css')
		.pipe(importCss())
		// .pipe(cssImageLink())
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/css'));
});

/**
 * 压缩所有目标目录下的脚本文件 依赖于movefile任务
 */
gulp.task('uglify', ['litheconcat', 'concat'], function() {
	return gulp.src(['./temp/js/**/*.js'])
		.pipe(jsUglifyPre()) //丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
		.pipe(uglify({
			mangle: {
				except: ['require', '$']
			}
		}).on('error', gulpUtil.log))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('localcache', ['uglify'], function() {
	return gulp.src('./js/conf/**/*')
		.pipe(localcache(litheConfig, localcacheConfig))
		.pipe(gulp.dest('../temp/dist/'));
});

gulp.task('uglifylithe', ['litheconcat', 'concat'], function() {
	return gulp.src(['./dist/js/lithe.js', './dist/js/lithe-localcache.js']).pipe(uglify({
		mangle: {
			except: ['require']
		}
	})).pipe(gulp.dest('./dist/js/'));
});

gulp.task('uglifyconfig', ['litheconcat', 'concat', 'localcache'], function() {
	return gulp.src(['./temp/js/config.js']).pipe(uglify()).
	pipe(gulp.dest('./dist/js/'));
});

/**
 * 清空临时目录
 */
gulp.task('cleantemp', ['uglify', 'uglifyconfig'], function(cb) {
	return del(['./temp'], {
		force: true
	});
});

gulp.task('fonts', function() {
	return gulp
		.src(['./src/fonts/*']) // entry file
		.pipe(gulp.dest('./dist/fonts/'))
});

gulp.task('babel', function() {
	return gulp
		.src('./src/js_es6/**/*.js')
		// .pipe(jshint())
		// .pipe(myReporter)
		.pipe(sourcemaps.init()) // entry file
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('./src/js/'))
});

gulp.task('es5', ['babel'], function() {
	var watcher = gulp.watch('./src/js_es6/**/*.js', ['babel']);
	watcher.on('change', function(event) {
		console.log('File:' + event.path + ',type:' + event.type);
	});
})

gulp.on('error', gulpUtil.log);

gulp.task('runscss', ['clean','scss','watch']);

gulp.task('default', ["babel",'litheconcat', 'uglify', 'concat', 'moveimages', 'h5styles', 'uglifyconfig', 'localcache', 'uglifylithe', 'cleantemp', 'fonts']);

gulp.task('zhangenming', ['scss', 'watch', 'es5']);
