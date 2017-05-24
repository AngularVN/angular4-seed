'use strict';

const fs = require('fs'),
  del = require('del'),
  path = require('path'),
  gulp = require('gulp'),
  iF = require('gulp-if'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  tslint = require('gulp-tslint'),
  tsc = require('gulp-typescript'),
  replace = require('gulp-replace'),
  jsMinify = require('gulp-uglify'),
  ghPages = require('gulp-gh-pages'),
  tsconfig = require('gulp-ts-config'),
  coveralls = require('gulp-coveralls'),
  sourcemaps = require('gulp-sourcemaps'),
  cssPrefixer = require('gulp-autoprefixer'),
  merge = require('merge-stream');

const SystemJSBuilder = require('systemjs-builder');
const buildDir = 'dist';

var NG2ENV = process.env.NG2ENV || '';
console.log(NG2ENV);
var build = false;
process.argv.forEach(function(val, index, array) {
  if ('build' === val) {
    build = true;
    // NG2ENV = 'Prod';
  }
});

gulp.task('coveralls', () => {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

/**
 * Remove build directory.
 */
gulp.task('clean', () => {
  return del([buildDir, '.tmp']);
});

/**
 * Deploy to Github Page.
 */
gulp.task('ghpage', ['build'], () => {
  return gulp.src('./' + buildDir + '/**/*')
    .pipe(ghPages());
});

/**
 * Compile all Less files.
 */
gulp.task('less', () => {
  return gulp
    .src('src/less/*.less')
    .pipe(less())
    .pipe(cssPrefixer())
    .pipe(iF(build, cssmin()))
    .pipe(gulp.dest(path.join(buildDir, 'css')));
});


// gulp.task('images', () => {
//   return gulp.src('src/img/**/*.*')
//     .pipe(imagemin())
//     .pipe(gulp.dest(path.join(buildDir, "img")));
// });

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('resources', () => {
  return gulp.src(['!src/less', '!src/less/**/*', '!**/*.ts', 'src/**/*'])
    .pipe(gulp.dest(buildDir));
});

/**
 * Copy all required fonts into build directory.
 */
gulp.task('fonts', () => {
  return gulp.src([
      'bootstrap/fonts/**',
      'font-awesome/fonts/**',
      'simple-line-icons/fonts/**'
    ], { cwd: 'node_modules' })
    .pipe(gulp.dest(path.join((build) ? buildDir : 'src', 'fonts')));
});
/**
 * Copy flags into build directory.
 */
gulp.task('flags', () => {
  return gulp.src([
      'flag-icon-css/flags/**'
    ], { cwd: 'node_modules' })
    .pipe(gulp.dest(path.join(buildDir, 'flags')));
});


gulp.task('vendor', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      // 'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(iF(build, jsMinify()))
    .pipe(gulp.dest(path.join(buildDir, 'js')));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report({
      emitError: false
    }));
});


/**
 * Compile TypeScript sources in build directory.
 */

gulp.task('tsc', ['tslint'], () => {
  var tsProject = tsc.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(iF(build, sourcemaps.init()))
    .pipe(tsProject())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('compile', ['tsc'], () => {
  var builder = new SystemJSBuilder();
  return builder.loadConfig('systemjs.build.js')
    .then(() => builder.buildStatic('app', path.join('.tmp', 'js', 'bundle.js')));
});


/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', ['fonts'], () => {
  gulp.watch(['src/**/**.ts']).on('change', function(e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/**.html', 'src/**/*.css', 'src/img/*.*']).on('change', function(e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
  gulp.watch(['src/**/**.less']).on('change', function(e) {
    console.log('LESS file ' + e.path + ' has been changed. Updating.');
  });
});

gulp.task('appsettings', function(cb) {
  return fs.writeFile('appsettings.yml', 'Environment: ' + NG2ENV, cb);
});

gulp.task('api', ['appsettings'], () => {
  return gulp.src('appsettings.yml')
    .pipe(tsconfig('AppSettings', JSON.parse('{"parser": "yml"}')))
    .pipe(gulp.dest('./src/app'))
});

/**
 * Build the project.
 */
gulp.task('build', [
  'api',
  'compile',
  'less',
  'fonts',
  'flags',
  'resources',
  'vendor'
], () => {
  gulp.src(path.join('.tmp', 'js', 'bundle.js'))
    .pipe(iF(build, jsMinify()))
    .pipe(gulp.dest(path.join(buildDir, 'js')));
  return del(['.tmp']);
});
