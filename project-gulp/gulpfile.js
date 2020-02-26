const { PATH } = require('./fileroute.js');
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');
const cache = require('gulp-cached');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cleancss = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

function clean() {
  return new Promise(resolve => {
    cache.caches = {};
    del.sync(PATH.DIR.DEST);
    del.sync(PATH.DIR.BUILD);
    resolve();
  });
}

function cssTranspile() {
  return src(PATH.SRC.SCSS, { sourcemaps: true, allowEmpty: true })
    .pipe(cache('cssTranspile'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(cleancss({ compatibility: 'ie8' }))
    .pipe(dest(PATH.DEST.CSS))
    .pipe(reload({ stream: true }));
}

function jsTranspile() {
  return src(PATH.SRC.JS, { sourcemaps: true, allowEmpty: true })
    .pipe(cache('jsTranspile'))
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(dest(PATH.DEST.JS))
    .pipe(reload({ stream: true }));
}

function html() {
  return src(PATH.SRC.HTML, { sourcemaps: true, allowEmpty: true })
    .pipe(cache('html'))
    .pipe(dest(PATH.DEST.HTML))
    .pipe(reload({ stream: true }));
}

function server() {
  browserSync.init({
    server: {
      baseDir: PATH.DIR.DEST
    }
  });
  watch(PATH.SRC.HTML, html);
  watch(PATH.SRC.SCSS, cssTranspile);
  watch(PATH.SRC.JS, jsTranspile);
  watch(PATH.DIR.DEST).on('change', reload);
}

exports.default = series(clean, parallel(html, cssTranspile, jsTranspile), server);
exports.clean = clean;
