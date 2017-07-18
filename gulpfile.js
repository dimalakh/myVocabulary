const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

gulp.task('babel', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015', 'es2017']
        }))
        .pipe(gulp.dest('dist/temp'));
});

gulp.task('browserify', () => {
    return gulp.src([
        'dist/temp/diction.js',
        'dist/temp/popup.js',
        'dist/temp/background.js',
        'dist/temp/learn.js',
        'dist/temp/languages.js'
    ], { read: false })
        .pipe(browserify({}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('replace', () => {
    return gulp.src([
        'src/*.html',
        'src/**/*.css',
        'src/*.json',
        'src/**/*.png',
        'src/**/*.eot',
        'src/**/*.svg',
        'src/**/*.ttf',
        'src/**/*.otf',
        'src/**/*.woff',
        'src/**/*.woff2'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['babel', 'browserify', 'replace']);

// gulp.task('watch', function() {
//     gulp.watch('js/*.js', ['babel'])
// });