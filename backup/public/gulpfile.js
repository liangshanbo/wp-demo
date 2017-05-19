var gulp = require('gulp');
var path = require('path');
var gulpUtil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
/**
 * 压缩所有目标目录下的脚本文件 依赖于movefile任务
 */
gulp.task('uglifyVendors', function() {
    return gulp.src(['./overseasJS/src/vendors/**/*.js'])
        //.pipe(jsUglifyPre())//丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('./overseasJS/dist/vendors/'));
});
console.log('ds');
gulp.task('uglifyPlugs', function() {
    return gulp.src(['./overseasJS/src/plugs/**/*.js'])
        //.pipe(jsUglifyPre())//丑化预处理，先判断合并后的文件与旧文件MD5是否有变化，若有，则丑化替换，若无，则不丑化，提高效率
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('./overseasJS/dist/plugs/'));
});

/*gulp.task('uglifyBP', function() {
    return gulp.src(['./src/bp/buriedPoint.js']).pipe(uglify()).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('./dist/bp/'));
});*/

gulp.on('error',gulpUtil.log);

gulp.task('default',[
    'uglifyVendors',
    'uglifyPlugs'
    // ,'uglifyBP'
]);
