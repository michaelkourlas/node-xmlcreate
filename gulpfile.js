/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

let fs = require("fs");

let babel = require("gulp-babel");
let esdoc = require("gulp-esdoc");
let gulp = require("gulp");
let mocha = require("gulp-mocha");
let sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["prod", "test-prod", "docs"]);

let test = () => {
    return gulp.src("test/**/*.js", {read: false})
        .pipe(mocha({require: ["babel-register"]}));
};
gulp.task("test", ["prod"], test);
gulp.task("test-prod", ["prod"], test);
gulp.task("test-dev", ["dev"], test);

gulp.task("docs", () => {
    return gulp.src("src")
        .pipe(esdoc());
});

gulp.task("prod", () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("lib"));
});

gulp.task("dev", () => {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("lib"));
});
