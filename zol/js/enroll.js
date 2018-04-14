		define(["jquery", "jquery-cookie"], function($){
	var enroll = function(){
		console.log("注册页");
		//加载数据解析数据
		
		$(function(){
			
			$.ajax({
				url: "../data/enroll.json",
				type: "GET",
				success: function(res){
					$(".logo2").append("<a title='Z商城' href='../index.html'><img title='Z商城' alt='Z商城' src='" + res[0].logo + "'><p>" + res[0].a + "</p></a>");
				},error:function(e){
				}
			})
			//访问PHP
			/*
			+--------+-------------+----------+
			| name   | phonenum    | password |
			+--------+-------------+----------+
			| 血小贱   | 12345678991 | 123456   |
			+--------+-------------+----------+ 
						 
			*/
			
			$("#J_register_phone_submit").mousedown(function(){
				var div1 = $("#J_register_phone_number");
				var div2 = $("#J_register_pasword_phone");
				$_ajax({
					method:"POST",
					url:"../php/enroll.php",
					data: `name=${div1.value}&phonenum=${div1.value}&passworld=${div2.value}`,
					success:function(data){
						document.write(data);
						
					},
					error:function(){
						alert("访问失败");
					}
				})
			})
			
			
			//表单验证
					$("#J_register_phone_number").blur(function(){
						var arrA = this.value.replace(/\s/g,"");
						this.value = arrA;
						if(!arrA || arrA.length != 11){
							$("#J_register_phone_tips").html("手机号错误")
						}else{
							
							$("#J_register_phone_tips").html("")
						}
					})
//					$("#J_register_checkcode_phone").blur(function(){
//						var arrA = this.value.replace(/\s/g,""); 
//						this.value = arrA;
//						if(!arrA){
//							alert("必须填写验证码!!!")
//						}else if(arrA != 57f19 || arrA! = 57F19){
//							alert("睁大你那狗眼好好看看到底是啥")
//						}
//					})
					$("#J_register_pasword_phone").blur(function(){
						var arrA = this.value.replace(/\s/g,""); 
						this.value = arrA;
						if(!arrA){
							$("#J_register_pasword_phone_tips").html("密码填写错误")
						}else{
							
							$("#J_register_pasword_phone_tips").html("")
						}
					})
					
					$("#J_register_regPasword_phone").blur(function(){
						var arrA = this.value.replace(/\s/g,"");
						
						var arrB = $("#J_register_pasword_phone").val().replace(/\s/g,"");
						this.value = arrA;
						if(!arrA || arrA != arrB){
							$("#J_register_regPasword_phone_tips").html("密码填写错误")
						}else{
							
							$("#J_register_regPasword_phone_tips").html("")
						}
					})
		})

		
	}
	return {
		enroll: enroll
	}
})