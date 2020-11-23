"use strict";
// import пакетов
const gulp = require("gulp"); 
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

// const dist = "./dist/"; //путь куда компилируется проект
const dist = "C:/Program Files/VertrigoServ/www/site1.lc/projects/Windows";

// служит для того что бы отслеживать изменения в html файлах

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html") //берем по адресу html файл
                .pipe(gulp.dest(dist)) // перемещаем его в папку dist 
                .pipe(browsersync.stream()); // запускаем браузерсинк для того что бы страница перезапустилась
});

//черновая компиляция скриптов 
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")//берем главный файл и запускаем на нем webpack
                .pipe(webpack({
                    mode: 'development', //уст режим разработки
                    output: {
                        filename: 'script.js' //указываем куда все это складывать
                    },
                    watch: false,
                    devtool: "source-map", // карта проекта
                    module: { //подключаемые модули
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',//подключаем бабел
                              options: {
                                presets: [['@babel/preset-env', { //подключаем классический присет env
                                    debug: true, //если проблемы, консоль покажет где
                                    corejs: 3, // библиотека которая позв подключать полифилы
                                    useBuiltIns: "usage" //когда проект компилируется библиотека анализирует весь 
                                    // код смотрит на браузерлист и подключает те полифилы которые необходимы
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))  //после того как все выполнилось берем файл который получился и отправляем вdist
                .on("end", browsersync.reload); //если произошли какие то изменения перезагружаем страницу
});

// берет 
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*") // берем из папки src из папки assets **-любые файлы *.* любые файлы
                .pipe(gulp.dest(dist + "/assets")) //если вдруг там что то изменится перемещаем в папку дист /assets
                .on("end", browsersync.reload); //перезагружаем страницу
});

//внутри него запускается отдельный сервер который работает при помощи браузерсинк, и он серверит файлы в папке dist
gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    //запускаем galp watch что бы он следил за изменениями отдельных файлов
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

// чистовой вариант реж продакшен
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));
//задача по умолч, паралельно запускаем 2 задачи билд и вотч