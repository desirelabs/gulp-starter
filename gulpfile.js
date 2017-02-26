'use strict';

var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var watch = require('gulp-watch')

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 3 versions'],
        }))
        .pipe(gulp.dest('./stylesheets'))
        .pipe(livereload());
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
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// Tâche par défaut
gulp.task('default', ['build']);


/**
 * JS
 */
var distDir = 'dist/'
var srcDir = 'js/**/*.js'

// Compresse les js
gulp.task('compress', function (cb) {
    pump([
            gulp.src('js/**/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

function runBabel() {
    return gulp.src(srcDir)
        .pipe(babel())
        .pipe(gulp.dest(distDir))
}

gulp.task('babel', () => runBabel());

gulp.task('babel-watch', ['babel'], cb => {
    watch(srcDir, () =>
        runBabel()
            .pipe(watch(srcDir))
            .on('end', cb)
    )
})
