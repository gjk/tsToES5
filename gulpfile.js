var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    del = require('del'),
    //使用gulp-lad-plugins，自动加载pageage.json中devDependencies节点内容
    plugins = require('gulp-load-plugins')(),
    //定义刷新插件
    reload = require('browser-sync').reload;

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
        .pipe(plugins.typescript({
            // outFile:'index.js', //输出文件名称
            //outDir:paths.distJs, //输出地址
            // noImplicitAny:false, //使用隐含的“any”类型警告表达式和声明。
            // suppressImplicitAnyIndexErrors:false,  //抑制--noImplicitAny错误，用于缺少索引签名的索引对象。
            // noLib:false, //不包含自带类型
            // target:'ES5', //生产类型，有ES3(默认)、ES5、ES6
            // //jsx:'preserve', //支持jsx语法生成：react/preserve(TS1.6+)
            // removeComments:true, //是否保留注释
            // //emitDecoratorMetadata:'', //Emit design-time metadate for decorated declarations in source.
            // experimentalAsyncFunctions:false, //是否支持在ES7中使用关键字async/await提出的异步函数
            // experimentalDecorators:false, //是否支持未来的ES7
            // moduleResolution:'classic', //生成风格，不论node.js还是io.js，都使用'node'或'classic'
            // noEmitOnError:true, //有错误是否提示
            // noEmitHelpers:true, //是否生成自定义函数，如_extend()
            // preserveConstEnums:false, //是否删除枚举常量
            // isolatedModules:false, //如果不检查类型，可以提高生成速度
            // allowJs:true //是否编译js文件
            // //rootDir:'' //输入目录，只使用这个目录
        }))
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
