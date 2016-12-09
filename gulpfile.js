var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    del = require('del'),
    //使用gulp-lad-plugins，自动加载pageage.json中devDependencies节点内容
    plugins = require('gulp-load-plugins')(),
    //定义刷新插件
    reload = require('browser-sync').reload;

var tsProject = plugins.typescript.createProject("tsconfig.json");

var paths = {
    src: "./src",
    dist: "./dist",
    srcJs: "./src/js",
    distJs: "./dist/js"
};


//注册browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: [paths.dist]
    });

    //修改js，刷新页面
    var watchScript = gulp.watch([paths.srcJs + '/**/*.ts'], ['myts', reload]);

});

gulp.task('myts',['clean'],function() {
    return gulp.src(["./src/js/**/*.ts"])
        .pipe(tsProject())
        //压缩代码，发布时需要放开注释
        //.pipe(plugins.uglify())
        .pipe(plugins.revEasy({ revType: 'hash', hashLength: 7 })) //添加版本号.
        .pipe(gulp.dest(paths.distJs));
});


//并发
gulp.task('runSequence', function() {
    return runSequence(['clean'], ['myts'], ['browserSync']);
});


//清空生成目录
gulp.task('clean', function() {
    return del(
        [paths.dist]
    );
});

gulp.task('ts', ['myts']);

gulp.task('default', ['runSequence']);
