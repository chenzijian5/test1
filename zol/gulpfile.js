var gulp = require("gulp");
gulp.task("copy-html",function(){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
/*
 拷贝数据
 */
gulp.task("data", function(){
	return gulp.src("*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload())
})
/*
	拷贝图片 
*/
var imagemin = require("gulp-imagemin");
gulp.task("images",function(){
	return gulp.src("images/**/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload())
})
gulp.task("listImg",function(){
	return gulp.src("listImg/**/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/listImg"))
	.pipe(connect.reload())
	
})
/*
	拷贝scss文件,编译scss
	压缩css文件的  gulp-minify-css
	重命名 gulp-rename
 */


var scss = require("gulp-sass-china");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
gulp.task("scss",function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})

gulp.task("scss2",function(){
	return gulp.src("stylesheet/enroll.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("enroll.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})
gulp.task("scss3",function(){
	return gulp.src("stylesheet/list.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("list.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})
gulp.task("scss4",function(){
	return gulp.src("stylesheet/details.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("details.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})

/*
 拷贝JS文件
 */
//var uglify = require("gulp-uglify");
gulp.task("scripts", function(){
	return gulp.src(["jquery/**", "js/*.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload())
})
//拷贝html下的所有html文件
gulp.task("html",function(){
	return gulp.src(["html/**"])
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload())
})
//拷贝php下的所有PHP文件
gulp.task("php",function(){
	return gulp.src(["php/**"])
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload())
})
//监听
gulp.task("watch", function(){
	gulp.watch("index.html", ["copy-html"]);
	gulp.watch("*.json", ["data"]);
	gulp.watch("images/**/*", ["images"]);
	gulp.watch("listImg/**/*", ["listImg"]);
	gulp.watch("stylesheet/index.scss", ["scss"]);
	gulp.watch("stylesheet/enroll.scss",["scss2"]);
	gulp.watch("stylesheet/list.scss",["scss3"]);
	gulp.watch("stylesheet/details.scss",["scss4"]);
	gulp.watch(["jquery/*.js","js/*.js"], ["scripts"]);
	gulp.watch("html/**",["html"]);
	gulp.watch("php/**",["php"])
})

gulp.task("build",["copy-html","data","images","listImg","scss","scss2","scss3","scss4","scripts","html","php"],function(){
	console.log("编译成功");
})
/*
	 启动服务
 */

var connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root:"dist",
		port:8888,
		livereload:true
	})
})

 gulp.task("default", ["watch","server"]);  















