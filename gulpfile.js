'use strict';

var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 3 versions'],
        }))
        .pipe(gulp.dest('./stylesheets'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
    return gulp.src('./stylesheets/**/*.css')
        .pipe(plugins.csso())
        .pipe(gulp.dest('./stylesheets/'));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// Tâche par défaut
gulp.task('default', ['build']);