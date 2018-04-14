define(["jquery", "jquery-cookie"], function($){
	var index = function(){
		console.log("首页");
		//加载数据解析数据

		$(function(){
			var aLis = $(".slideshow").find("li");
			var oUl = $(".slideshow");	
			var aBtns = $(".dot").find("li");
			
			$.ajax({
				url: "../data/data.json",
				type: "GET",
				success: function(res){
					
					//将数据进行解析，添加到页面上
					for(var i = 0; i < res[0].sideBox.length; i++){
						$("#sidebar").append("<li><i class='ico-"+(i+1)+"'></i><a href ='html/list.html'>" + res[0].sideBox[i].title + "</a>"+"<div class='sideBox2-"+ i +"'></div><li>");
						for(var j = 0; j < res[0].sideBox[i].child.length; j++){
							$(".sideBox2-" + i).append("<a href='html/list.html'>" + res[0].sideBox[i].child[j].title + "</a>")
						}
						
					}
					
					//轮播图开始
					for(var i = 0; i < res[1].slideshow.length; i++){
						$(".slideshow").append("<li><img src=" + res[1].slideshow[i].img + "></li>")
					}
					$(".slideshow").append("<li><img src=" + res[1].slideshow[0].img + "></li>")
					//轮播图结束
					
					//团购开始
					$(".groupLeft").append("<img src = '" + res[2].group[0].groupLeft + "'>");
					for(var i = 0;i < res[2].group[1].groupMiddle.length; i++){
						$(".groupMiddle").append("<li class='groupLi'><a href='html/details.html'><div class='groupMImg'><img src = '" + res[2].group[1].groupMiddle[i].img + "'></div></a>" + "<p class='groupName'><a href='html/details.html'>" + res[2].group[1].groupMiddle[i].name + "</a></p><h4>￥" + res[2].group[1].groupMiddle[i].price + "</h4><p>截止日期:" + res[2].group[1].groupMiddle[i].time + "</p><div class='groupArise'><p>电商参考价:￥"+  res[2].group[1].groupMiddle[i].eComm +"</p></div></li>");
						
					}
					for(var i = 0; i < 3; i++){
						$(".groupRight").append("<li class='groupRLi'><div class='groupRImg'><img src='"+ res[2].group[2].groupRight[i].img +"'></div><div class='groupRR'><a href='html/details.html'>"+ res[2].group[2].groupRight[i].describe +"</a><p>￥--</p><div class='groupRRDiv'>"+ res[2].group[2].groupRight[i].tiait +"</div><span class='arrival-btn'>到店团</span></div></li>")
					}
					//团购结束
					//ZOL体验店开始
					for(var i = 0; i < res[3].stamp[1].ticket.length; i++){
						$(".exper").append(`<dd class='experDd'><div class='experDL'><div class='experDLT'><div class='experEm'><em>${res[3].stamp[1].ticket[i].price}</em></div><div class='experEmR'><h4 class='price'>${res[3].stamp[1].ticket[i].name}</h4><p>${res[3].stamp[1].ticket[i].cond}</p></div></div><div class='experDLB'><a href='#'>立即领取<span>>></span></a></div></div></dd><div class='experDRImg'></div>`)
					};
					//ZOL体验店结束
					//痛成狗开始
					$(".cityH3").eq(0).append(res[4].title);
					$(".citySpan").append(res[4].tiait);
					for(var i = 0; i < 3; i++){
						$(".city").append("<dd><img src = '" + res[4].li[i].img + "'></dd>")
					}
					for(var i = 0; i < res[4].cityList.length; i++){
						$(".cityList").append("<li><a href='html/details.html'><img src = '" + res[4].cityList[i].img + "'></a><div><p class='ware-name'><a href='html/details.html'>" + res[4].cityList[i].name + "</a></p><p class='ware-msg'>" + res[4].cityList[i].msg + "</p></div><div class='cityPrice'><p class='price'>" + res[4].cityList[i].price + "</p><p class='cityReferPrice'><span class='t1'>电商参考价:</span>" + res[4].cityList[i].t1 + "</p></div></li>")
					}
					//痛成狗结束
					//品牌精选开始
					$(".sutraDt").eq(0).append("<h3>"+res[5].title+"</h3><span>" + res[5].tiait + "</span>");
					$(".sutra").append("<dd class='sutraFD'><a href='#'><img src='" + res[5].dt + "'></a></dd>")
					for(var i = 0; i < res[5].dd.length; i++){
						$(".sutra").append("<dd><a href='html/details.html'><img src='" + res[5].dd[i].img + "'></a><p class='ware-name'><a href='html/details.html'>" + res[5].dd[i].name + "</a></p><p class='sutraPrice'>RMB<span class='sutraPS'>" + res[5].dd[i].rmb + "</span></p></dd>")
					}
					//品牌精选结束
				},error:function(e){
					alert(e.status);
				}
			})
			
			//轮播图
			
			
			var iNow = 0;
			var timer = null;
			aBtns.click(function(){
				iNow = $(this).index();
				tab();
			})
			function tab(){
				aBtns.removeClass("active").eq(iNow).addClass("active");
				
				$(".slideshow").find("li").animate({opacity:0},200);
				$(".slideshow").find("li").eq(iNow).animate({opacity:1},200);
				if(iNow == 3){
					$(".slideshow").find("li").eq(0).css("opacity", 1);
					aBtns.eq(0).addClass("active");
				}
				
			}
			
			function timerInner(){
				
				if(iNow == 3){
					iNow = 0;
					$(".slideshow").find("li").eq(0).css("opacity", 1);
				}
				iNow++;
				tab();
//				document.title = iNow;
			}
			
			timer = setInterval(timerInner, 4000);
			$(".slide").hover(function(){
				clearInterval(timer);
			}, function(){
				timer = setInterval(timerInner, 4000);
			})
		})
//		for(var i = 0; i < 5; i++){
//			$(".groupMiddle").find("li").eq(i).mouseover(function(){
//				$(this).find($(".groupArise")).animate({height:52},500);
//			})
//			$(".groupMiddle").find("li").eq(i).mouseout(function(){
//				$(this).find($(".groupArise")).animate({height:0},500);
//			})
//		}
		
	}
	return {
		index: index
	}
})

