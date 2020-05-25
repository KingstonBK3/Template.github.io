var gulp = require('gulp');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('move', function() {
	//console.log('Hello, World!');
	return gulp.src('src/css/*.css')
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('style', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(concatCss("main.css"))
      .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("app/less/*.less", ['less']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("app/less/*.less")
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);