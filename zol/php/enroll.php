<?php
	header("content-type:text/html;charset=utf-8");
	
	$name = $_POST["phonenum"];
	$phonenum = $_POST["phonenum"];
	$password = $_POST["password"];
	
	$con = mysql_connect("sqld.duapp.com", "star灬夼舞", "1069961428czj");
	if($con){
		echo "success";
		
	}else{
		echo "error";
		exit;
	}
	
	mysql_select_db("iNCTkSuSAGQKouIaQyeT");
	$sql = "";
	$sq = "SELECT name FROM enroll WHERE name = '$name';";
	$res = mysql_query($sq);
	if(mysql_num_rows($res)){
		echo "This account has been registered.";
	}else{
		$sql = "INSERT INTO enroll VALUES('$name','$phonenum','$password');";
		echo '<a href="../index.html">登陆成功,点击此处返回首页</a>';
	}
	$is_ok = mysql_query($sql);
	
	if($is_ok){
		echo "OK!";
	}else{
		echo "NO!";
	}
?>