var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
  scripts: 'src/js/*.js',
  style: 'src/sass/*.scss'
};


gulp.task('scripts',  function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('dist/js'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.style, ['style']);
});

gulp.task('style', function(){
  gulp.src(paths.style)
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('clean', function(cb){
 // del(['./dist'], cb);
  return;
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', function(){
  gulp.start(['style', 'scripts']);
});
