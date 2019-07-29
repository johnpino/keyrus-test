const {src, dest, watch, series, parallel} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const tilde = require('node-sass-tilde-importer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const del = require('del');

const files = {
    scssPath: 'src/scss/**/*.scss',
    jsPaths: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/jquery-validation/dist/jquery.validate.js',
        'src/js/**/*.js'
    ],
    htmlPath: '*.html'
}

const clean = () => del(['dist']);

function reloadTask(done) {
    browserSync.reload();
    done();
}

function browserSyncTask(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

function scss() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: tilde
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist'));
}

function js() {
    return src([
        ...files.jsPaths
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('dist')
        );
}

function watchSCSS() {
    watch(files.scssPath, series(scss, reloadTask));
}

function watchJS(){
    watch(files.jsPaths, series(js, reloadTask));
}

function watchHTML(){
    watch(files.htmlPath, series(reloadTask));
}

exports.default = series(
    clean,
    parallel(scss, js),
    browserSyncTask,
    parallel(watchSCSS, watchJS, watchHTML)
);