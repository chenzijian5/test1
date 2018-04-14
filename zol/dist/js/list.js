define(["jquery", "jquery-cookie"], function($){
	var list = function(){
		console.log("注册页");
		//加载数据解析数据

		$(function(){

			$.ajax({
				url: "../data/list.json",
				type: "GET",
				success: function(res){
					$(".main").append("<ul></ul>");
					for(var i = 0; i < res.length; i++){
						$(".main ul").append("<li><a href='details.html'><img src = '" + res[i].img + " '></a><div class='titleList'><a href='details.html'>" + res[i].name + "</a></div><div class='priceList'>￥" + res[i].price + "</div><div class='argument'><p style='float:left'>销量数"+ res[i].market +"</p><p style='float:right'>评价数" + res[i].appraise +"</p></div><div class='joinList' id = '" + res[i].id + "'>加入购物车</div></li>")
					}
				},error:function(e){
				}
			})

			//点击事件
			$(".main").on("click", ".joinList", function(){
				var id = this.id;
				alert("添加成功"+$.cookie("goods"));
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					$.cookie("goods", '[{id:' +  id + ',num:1}]',{path:"/"});

				}else{
					var str = $.cookie("goods");
					var arr = eval(str);

					var same = false;

					for(var i in arr){
						if(arr[i].id == id){
							arr[i].num = arr[i].num + 1;
							var cookieStr = JSON.stringify(arr);
							$.cookie("goods", cookieStr, {
								exprires: 7,
								path:"/"
							});
							same = true;
							break;
						}
					}
					if(!same){
						var obj = {id: id, num: 1};

						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods", cookieStr, {
							expires: 7,
							path:"/"
						});
					}
				}
				sc_car();
				//alert("添加成功" + $.cookie("goods"));

				return false;


			})

			//购物车移入移出
			$(".sc_right").mouseenter(function(){
				$(this).stop().animate({
					right: 0
				})
				sc_msg();
			});
			$(".sc_right").mouseleave(function(){
				$(this).stop().animate({
					right: -270
				})
			});

			//购物车数字
			function sc_car(){
				var sc_str = $.cookie("goods");
				if(sc_str){
					var sc_arr = eval(sc_str);
					var sc_num = 0;
					for(var i in sc_arr){
						sc_num = Number(sc_arr[i].num) + sc_num;
					}
					$(".sc_num").html(sc_num);
				}
			}

			function sc_msg(){
			$.ajax({
				url: "../data/list.json",
				type: "get",
				success: function(res){
					var sc_arr = eval($.cookie("goods"));
					var html = '';
					for(var i in sc_arr){
						html += '<li><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><p>布瑞玛</p></div><div class="sc_goodsBtn" id="'+sc_arr[i].id+'">购买</div><div class="sc_goodsNum">商品数量:'+sc_arr[i].num+'</div></li>';
					}
					$(".sc_right ul").html(html);
				},
				error(err){

				}
			})
		}


		})


	}
	return {
		list: list
	}
})