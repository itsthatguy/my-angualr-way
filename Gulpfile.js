var gulp = require('gulp');
var path = require('path');

// Grab all the gulp plugins automagically for us to use below
var $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'del',
    'main-bower-files',
    'browser-sync',
    'node-webkit-builder']
});

// Swab the deck!
gulp.task('clean', function() {
  return $.del.sync('dist/**/*');
});

// We use this for packaging our JS right now
gulp.task('webpack', function() {
  var webpackOptions = require('./webpack.config.js');

  return gulp.src('src/index.js')
  .pipe($.plumber())
  .pipe($.webpack(webpackOptions))
  .pipe(gulp.dest('dist/'))
  .pipe($.browserSync.reload({stream:true}));
});

// Moves static files to dist folder
gulp.task('assets', function() {
  return gulp.src(['src/**/*.{png,jpg,ttf,html,json}','package.json'])
  .pipe($.plumber())
  .pipe(gulp.dest('dist/'))
  .pipe($.browserSync.reload({stream:true}));
});

// Compile jade, and inject <script> tags for
// all of the bower dependencies
gulp.task('jade', function() {
  var bowerSrc = gulp.src($.mainBowerFiles(), {read: false});
  var vendorSrc = gulp.src([
    'bower_components/owl.carousel/dist/assets/owl.carousel.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.css'
    ], {read: false});

  return gulp.src('src/**/*.jade')
  .pipe($.plumber())
  .pipe($.inject(vendorSrc, {
    name: 'head',
    addPrefix: '.',
    addRootSlash: false
  }))
  .pipe($.inject(bowerSrc, {
    name: 'bower',
    addPrefix: '.',
    addRootSlash: false
  }))
  .pipe($.jade({pretty: true}))
  .pipe(gulp.dest('dist/'))
  .pipe($.browserSync.reload({stream:true}));
});

// Nothing special
gulp.task('sass', function() {
  var sassOptions = {
    style: 'expanded',
    errLogToConsole: true,
    includePaths: [
      path.join(__dirname, 'bower_components/foundation/scss'),
      require('node-bourbon').includePaths
    ]
  };

  return gulp.src('src/**/*.scss')
  .pipe($.plumber())
  .pipe($.sassBulkImport())
  .pipe($.sass(sassOptions))
  .pipe(gulp.dest('dist/'))
  .pipe($.filter('**/*.css'))
  .pipe($.browserSync.reload({stream:true}));
});

gulp.task('vendor', function() {
  var vendorSrc = [
    'bower_components/owl.carousel/dist/assets/owl.carousel.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.css'];

  gulp.src(vendorSrc, {base: '.'})
  .pipe(gulp.dest('dist/'));

  return gulp.src($.mainBowerFiles(), {base: '.'})
  .pipe(gulp.dest('dist/'));
});


// run a server for development with browsersync
gulp.task('serve', ['watch'], function() {
  $.browserSync.init({
    server: {
      baseDir: './dist/',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});

gulp.task('build', ['default'], function() {

  var nw = new $.nodeWebkitBuilder({
      files: './dist/**/*', // use the glob format
      version: '0.11.6',
      platforms: ['win32', 'win64']
  });

  nw.build().then(function() {
    console.log('DONE');
  }).catch(function (error) {
    console.error(error);
  });
});

// Watching the things:
// gulp.watch is limited and doesn't observe files that
// are added after the task is run
gulp.task('watch', ['default'], function() {

  function watch(src, task) {
    return $.watch(src, function() {
      gulp.start(task);
    });
  }

  watch(['src/**/*.{png,jpg,html,json}', 'package.json'], 'assets');

  watch('src/**/*.scss', 'sass');

  watch('src/**/*.jade', 'jade');

  watch('src/**/*.js', 'webpack');
});

gulp.task('default', ['clean', 'webpack', 'assets', 'sass', 'jade', 'vendor']);
