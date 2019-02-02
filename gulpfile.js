const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');

gulp.task('less', function () {
    return gulp.src('./src/less/style.less')
      .pipe(less())
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });
  gulp.task('watch',['browserSync','less'], function(){
    gulp.watch('./src/less/*.less', ['less']); 
    gulp.watch('./src/*.html', browserSync.reload); 
    gulp.watch('./src/js/*.js', browserSync.reload);
  })
  
  gulp.task('browserSync', function() {
    browserSync({
      server: {
        baseDir: 'src'
      },
    })
  })