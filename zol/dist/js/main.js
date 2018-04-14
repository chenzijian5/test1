console.log("载入成功");

// 配置路径
require.config({
	paths: {
		jquery: "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		index : "index",
		enroll : "enroll",
		list:"list",
		details:"details",
		"parabola": "parabola"
	},
	shim: {
		//设置依赖关系
		"jquery-cookie": ["jquery"],
		/*
			js文件，声明不遵从AMD规范的js文件
		*/
		"parabola": {
			exports: "_"
		}
	}
})

require(["index"], function(index){
	index.index();
})
require(["enroll"], function(enroll){
	enroll.enroll();
})
require(["list"], function(list){
	list.list();
})
require(["details"], function(details){
	details.details();
})


















