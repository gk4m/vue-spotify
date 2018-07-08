var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'icon-font';

gulp.task('iconfont', function () {
  gulp.src(['src/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'src/styles/util/icon-font/_icon-font-template.scss',
      targetPath: '../../../styles/util/icon-font/_icon-font-util.scss',
      fontPath: 'assets/fonts/icon-font/',
      prependUnicode: true,
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(gulp.dest('src/assets/fonts/icon-font/'));
});
