const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const liquid = require('@tuanpham-dev/gulp-liquidjs')
const reload = browserSync.reload

  gulp.task('browser-sync', () => {
    browserSync.init({
      notify: false,
      server: {
        baseDir: './'
      } 
    })

  gulp.watch('./*.html').on('change', reload)
  gulp.watch('./scss/*.scss').on('change', reload);
  gulp.watch('./views/**/*.liquid', gulp.series('html'))
  gulp.watch('./scss/**/*.scss', gulp.series('css'))
  gulp.watch('./js/**/*.js', reload)
})

gulp.task('css', () => {
  return gulp.src('./scss/main.scss')
    .pipe(plumber([{
      errorHandler: false
    }]))
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())
})

gulp.task('html', () => {
  return gulp.src('./views/pages/*.liquid')
    .pipe(liquid({
      engine: {
        root: ['./views', './views/components']
      }
    }))
    .pipe(gulp.dest('./'))
    .on('end', reload)
})

gulp.task('default', gulp.series('html', 'css', 'browser-sync'))

gulp.task('dist-css', () => {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({level: {1: {specialComments: false}}}))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('dist-html', () => {
  return gulp.src('./*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
})

gulp.task('dist-js', () => {
  return gulp.src('./js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
})

gulp.task('dist-img', () => {
  return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
})

gulp.task('dist-data', () => {
    return gulp.src('./data/*')
      .pipe(gulp.dest('dist/data'));
  })

gulp.task('dist', gulp.series('css', 'html', 'dist-css', 'dist-html', 'dist-js', 'dist-img', 'dist-data'));
