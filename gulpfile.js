const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
 
gulp.task('babel', () => {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function() {
    return gulp.src('dist/app.js', { read: false })
        .pipe(browserify({
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('build', ['babel', 'browserify']);

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['babel'])
    gulp.watch('dist/app.js', ['browserify'])
});