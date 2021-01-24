'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin')
    ;


gulp.task('sass',gulp.series( function(){
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
}));

gulp.task('sass:watch',gulp.series( function(){
    gulp.watch('./css/*.scss', ['sass']);
}));

gulp.task('browser-sync', gulp.series( function(){
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];
    browserSync.init(files,{
        server: {
            baseDir: './'
        }
    });
}));

gulp.task('default', gulp.series( 'browser-sync','sass:watch'));

gulp.task('clean', gulp.series( function(){
    return del(['dist']);
}));

gulp.task('copyfonts', gulp.series( function(){
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
}));

gulp.task('imagemin', gulp.series( function(){
    return gulp.src('./img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
}));

gulp.task('build', gulp.series( 'clean',gulp.parallel( 'copyfonts','imagemin')));