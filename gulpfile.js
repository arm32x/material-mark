const gulp = require("gulp");
const srcmaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");

gulp.task("default", () => {
    // Compile JS files
    gulp.src("js/*.es6.js")
        .pipe(srcmaps.init())
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(concat("main.js"))
        .pipe(srcmaps.write("."))
        .pipe(gulp.dest("js"));
    
    // Copy everything to /var/www/html
    gulp.src("**/*", { base: "." })
        .pipe(gulp.dest("/var/www/html"));
});
