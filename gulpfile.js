const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const plumber = require('gulp-plumber');

// Sass Task
function scssTask() {
  return src("app/scss/style.scss")
    .pipe(plumber()) // Add plumber to handle errors
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist"))
    .pipe(browsersync.stream());
}

function jsTask() {
  return src("app/js/script.js")
    .pipe(plumber()) // Add plumber to handle errors
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist"));
}
// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("app/scss/**/*.scss", series(scssTask));
  watch("app/js/*.js", series(jsTask, browserSyncReload));
  watch("*.html", browserSyncReload);
}

// Default Gulp Task
exports.default = series(
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);
