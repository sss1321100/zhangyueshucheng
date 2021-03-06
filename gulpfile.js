//使用严格模式。保证js的严谨，养成一个好习惯。
'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat-dir'),
    plumber = require('gulp-plumber'),
    runSequence = require('gulp-run-sequence'),
    clean = require('gulp-clean'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();



gulp.task('fts', function () {
    return gulp.src('./src/fts/{css,fonts}/*')
        .pipe(gulp.dest('dist/fts'))
});

gulp.task('js', function () {
    return gulp.src('./src/script/*.js')
        .pipe(gulp.dest('dist/script'))
});
gulp.task('css', function () {
    return gulp.src('./src/script/*.css')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('less', function () {
    return gulp.src('./src/style/*.less')
        .pipe( plumber() )
        .pipe( less() )
        .pipe( concat({
            ext: '.css'
        }) )
        .pipe( minifyCss() )
        .pipe(gulp.dest('dist/style'))
});

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        .pipe( fileinclude({               
            prefix: '@@',                
            basepath: 'src/temp',           
            indent: true,                    
        }) )
        .pipe(plumber())
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/html'))
});

gulp.task('images', function () {
    return gulp.src('./src/images/**/*.{png,jpg,jpeg,ico,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function () {
    return gulp.src('dist/*', {
            read: false
        })
        .pipe(clean())
})
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        startPath: 'html/zhousong.html',
    })
})
gulp.task('watch', function () {
    gulp.watch('./src/script/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('./src/style/*.less', ['less']).on('change', browserSync.reload);
    gulp.watch('./src/html/*.html', ['html']).on('change', browserSync.reload);
})
gulp.task('redist', function () {
    runSequence('clean','html','less', 'js', 'images','css', 'serve')
})

gulp.task('default', ['redist','watch'],function(){
    //gulp.start('serve')
});
