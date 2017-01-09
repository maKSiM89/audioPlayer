var config = require( './gulp.config' )();

var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    angularFileSort = require( 'gulp-angular-filesort' ),
    concat = require( 'gulp-concat' ),
    inject = require( 'gulp-inject' ),
    ngAnnotate = require( 'gulp-ng-annotate' ),
    del = require( 'del' ),
    eventStream = require( 'event-stream' ),
    ngHtml2js = require( 'gulp-ng-html2js' );

gulp.task('clean', clean);
gulp.task('compile', compile);
gulp.task('build', ['clean'], compile);

gulp.task('default', ['build']);

function clean() {
  return del( config.destination.index );
}

function compile() {
    return eventStream.merge(
        buildIndex(),
        buildImages(),
        buildFonts()
    );
}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildScripts(), { relative: true }))
        .pipe(inject(buildVendorScripts(), { relative: true, name: 'vendor' }))
        .pipe(inject(buildTemplates(), { relative: true, name: 'templates' }))
        .pipe(inject(buildStyles(), { relative: true }))
        .pipe(inject(buildVendorStyles(), { relative: true, name: 'vendor' }))
        .pipe(gulp.dest(config.destination.index));
}

function buildImages() {
    return gulp.src(config.sources.images)
        .pipe(gulp.dest(config.destination.images));
}

function buildFonts() {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(config.destination.fonts));
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.destination.scripts));
}

function buildVendorScripts() {
    return gulp.src(config.sources.vendorScripts)
        .pipe(gulp.dest(config.destination.vendors));
}

function buildTemplates() {
    return gulp.src(config.sources.templates)
        .pipe(ngHtml2js({moduleName: 'templates'}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.destination.templates));
}

function buildStyles() {
    return gulp.src(config.sources.stylesheets)
        .pipe(sass())
        .pipe(gulp.dest(config.destination.stylesheets));
}

function buildVendorStyles() {
    return gulp.src(config.sources.vendorStylesheets)
        .pipe(gulp.dest(config.destination.vendors));
}