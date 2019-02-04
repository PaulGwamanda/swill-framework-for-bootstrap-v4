'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');

var paths = {
    bootstrap: [
        './src/sass/bootstrap.scss'
    ],
    styles: [
        './src/sass/styles.scss'
    ],
    libraryJs: [
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/wowjs/dist/wow.min.js',
        './node_modules/tether/dist/js/tether.min.js'
    ],
    scriptJs: [
        './src/js/**/*.js'
    ],
    templates:[
        './src/html/'
    ],
    fonts:[
        './src/fonts/*'
    ],
    images: [
        './src/images/**/*'
    ]
};
/**
 * Compiles the project style.css file
 */

gulp.task('styles', function () {
    return gulp.src('./src/sass/styles.scss')
        .pipe(sass({outputStyle: 'expanded', sourceComments:false})
            .on('error', sass.logError))
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('output/css'));
});

gulp.task('bootstrap', function () {
    return gulp.src('./src/sass/bootstrap.scss')
        .pipe(sass({outputStyle: 'expanded', sourceComments:false})
            .on('error', sass.logError))
        .pipe(rename("bootstrap.css"))
        .pipe(gulp.dest('output/css'));
});

/**
 * browser-sync
 */
gulp.task('browser-sync', function(){
    browserSync.init({server: {baseDir: "./output"},files:['./output/**/*.html']});
});
/**
 * Compile the Javascript @TODO: optimize
 */
gulp.task('scripts', function(){
    gulp.src(paths.libraryJs)
        .pipe(gulp.dest('./output/js/'));
    gulp.src(paths.scriptJs)
        .pipe(gulp.dest('./output/js/'));
});

/**
 * Grab libraries from the modules directory and output them in their relevant paths
 **/
gulp.task('modules', function () {
    gulp.src(['./node_modules/wowjs/css/libs/animate.css'])
        .pipe(gulp.dest('./src/modules/animate.css/'));

    gulp.src(['./src/modules/animate.css'])
        .pipe(gulp.dest('./output/modules'));

});

/**
 * Copy the images
 */
gulp.task('images', function(){
    gulp.src(paths.images)
        .pipe(gulp.dest('./output/images/')
    );
});

/**
 * Copy the fonts
 **/
gulp.task('fonts', function(){
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./output/fonts/')
    );
});

/**
 * Get animate.css + wow.js
 */
gulp.task('animateCSS', function(){
    gulp.src(['./node_modules/wowjs/css/libs/*'])
        .pipe(gulp.dest('./src/modules/')
    );
    gulp.src(['./src/modules/animate.css/animate.css'])
        .pipe(gulp.dest('./output/modules/animate.css/animate.css'));
});

/** Copy the font awesome library
 * @@todo Optimise so less and sass folder is excluded in production
 * **/
gulp.task('fontAwesome', function () {
    // Grab only the css and fonts file
    gulp.src(['./node_modules/font-awesome/**/*', '!./node_modules/font-awesome/scss/'])
        .pipe(gulp.dest('./src/modules/font-awesome/')
    );
    gulp.src(['./src/modules/**/*.*', '!./src/font-awesome/less/**.*', '!./src/font-awesome/scss/**.*'])
        .pipe(gulp.dest('./output/modules/')
    );
    gulp.src('./src/modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./output/modules/font-awesome/css/')
    );
    gulp.src('./src/modules/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./output/modules/font-awesome/fonts/')
    );
});

/**
 * Clean existing html files
 */
gulp.task('clean', function(){
    del(['./output']);
});

/**
 * Build the HTML
 */
gulp.task('fileinclude', function(){
    return gulp.src(paths.templates+'**/*')
        .pipe(fileinclude('@@'))
        .pipe(gulp.dest('./output')
    );
});


/**
 * Copy the videos
 **/
gulp.task('videos', function(){
    gulp.src('./src/videos/**/*')
        .pipe(gulp.dest('./output/videos/')
    );
});


/** ..Then remove includes folder **/
gulp.task('del-includes', function(){
    del(['./output/includes']);
});

/**
 * Watch files and execute tasks
 */
gulp.task('default', function(callback){

    gulp.watch('./src/sass/*.scss', function(){
        gulp.start('bootstrap');
    });

    gulp.watch('./src/sass/**/*.scss', function(){
        gulp.start('styles');
    });
    gulp.watch('./src/js/**/*.js', function(){
        gulp.start('scripts');
    });
    gulp.watch('./src/images/**/*', function(){
        gulp.start('images');
    });
    gulp.watch('./src/videos/**/*', function(){
        gulp.start('videos');
    });
    gulp.watch('./src/html/**/*.html', function () {
        gulp.start('fileinclude')
    });

    runSequence(
        'clean',
        'modules',
        'bootstrap',
        'scripts',
        'fontAwesome',
        'fonts',
        'images',
        'videos',
        'styles',
        'del-includes',
        'browser-sync',
        'fileinclude',
    callback);
});
