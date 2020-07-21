var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//default gulp
gulp.task('default', ['sass', 'scripts', 'watch', 'browser-sync']);

//Sass
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('projeto.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
  });

// JS
gulp.task('scripts', function() {
  return gulp.src("src/js/**/*.js")
      .pipe(concat("projeto.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"))
      .pipe(browserSync.reload({stream:true}));
});

//browserSync
gulp.task('browser-sync', ['sass'], function() {

  browserSync.init({
    server: "."
  });

  gulp.watch("src/sass/**/*.scss", ['sass']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

//Watch
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss',['sass']);
  gulp.watch('src/js/**/*.js',['scripts']);
});