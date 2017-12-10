const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const del = require('del');
const gulpsync = require('gulp-sync')(gulp)

gulp.task('babel', () => {
  return gulp
    .src('src/js/**/*.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(gulp.dest('dist/temp'));
});

gulp.task('browserify', () => {
  return gulp
    .src([
      'dist/temp/diction.js',
      'dist/temp/popup.js',
      'dist/temp/background.js',
      'dist/temp/learn.js',
      'dist/temp/languages.js'
    ],
      { read: false }
    )
    .pipe(browserify({}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('replace', () => {
  return gulp
    .src([
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
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function () {
  return del('dist/temp');
});

gulp.task('build', gulpsync.sync(['babel', 'browserify', 'replace', 'clean']))

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['build'])
});
