function startMove(obj, attr, iTarget, speed, func){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		if(attr == "opacity"){
			iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
		}else{
			iCur = parseInt(getStyle(obj, attr))
		}
		speed = iTarget > iCur ? Math.abs(speed) : -Math.abs(speed);
		if(Math.abs(iCur - iTarget) < Math.abs(speed)){
			clearInterval(obj.timer);
			if(attr == "opacity"){
				obj.style.filter = `alpha(opacity=${iTarget});`;
				obj.style.opacity = iTarget / 100;
			}else{
				obj.style[attr] = iTarget + "px";
			}
			if(func){
				func.call(obj);
			}
		}else{
			iCur += speed;
			//这里是子弹和敌人都要走的地方。 knock
			if(obj.parentNode.id == "enemy" && knock(obj, $("#airplane"))){
				$("#airplane").firstElementChild.src = "image/本方飞机爆炸.gif";
				alert("Game Over");
				location.reload();
			}

			//子弹和敌人发生碰撞
			var aBullets = $("#clip").getElementsByTagName("div");
			for(var i = 0; i < aBullets.length; i++){
				if(obj.parentNode.id == "enemy" && knock(obj, aBullets[i])){
					//处理子弹
					aBullets[i].style.top = "-20px";
					aBullets[i].isrunning = false;

					if(obj.HP == 1){
						obj.firstElementChild.src = "image/" + obj.boom;
						setTimeout(function(){
							$("#enemy").removeChild(obj);
						}, 500);
					}else{
						obj.HP--;
						obj.firstElementChild.src = "image/" + obj.beat;
					}
				}
			}


			if(attr == "opacity"){
				obj.style.filter = `alpha(opacity=${iCur});`;
				obj.style.opacity = iCur / 100;
			}else{
				obj.style[attr] = iCur + "px";
			}
		}
	}, 30);
}




