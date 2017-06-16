#!/usr/bin/env node

const gulp = require("gulp");
const srcmaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");

gulp.task("default", () =>
    gulp.src("js/*.es6.js")
        .pipe(srcmaps.init())
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(concat("main.js"))
        .pipe(srcmaps.write("."))
        .pipe(gulp.dest("js"))
);
