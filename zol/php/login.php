<?php
	header("content-type:text/html;charset=utf-8");
	$name = $_POST["name"];
	$password = $_POST["password"];
	$con = mysql_connect("localhost", "root", "123456");
	// if($con){
	// 	echo "success";
	// }else{
	// 	echo "error";
	// }
	mysql_select_db("zolenroll");
	$sql = "SELECT * FROM enroll WHERE name='$name' and password='$password';";
	$res = mysql_query($sql);
	$row = mysql_fetch_array($res);
	if($row){
		echo '<a href="../index.html">登陆成功,点击此处返回首页</a>';
	}else{
		echo "用户名密码错误";
	}
	$is_ok = mysql_query($sql);
	// if($is_ok){
	// 	echo "OK!";
	// }else{
	// 	echo "NO!";
	// }
?>