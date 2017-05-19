var handle = function() {
	var startX, startY, endX, endY, nowX,moveX, moveY, prevX = 0,
		prevX1 = 0,
		changeId,pageIndex1,speed,
		pageMap=true;

	var pageIndex = 5;
	var pageNum=false;
	var slideUp = document.getElementById("box");
	var loadTouch = document.getElementById("loading");
	var musicTouch = document.getElementById("music");

	var mapLeft = parseFloat($("#map").css("left"));

	slideUp.addEventListener("touchstart", function(event) {

		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	});
	slideUp.addEventListener("touchmove", function(e) {
		e.preventDefault();

		nowX = event.touches[0].clientX;

        if (pageIndex1 == 8) {
			// console.log(mapLeft - (prevX1 - (nowX - startX-speed)/2));
			if (dataTime[pageIndex1 - 5].canTouch && Math.abs(nowX - startX)>0 ) {
				if(parseFloat(mapLeft - (prevX1 - (nowX - startX-speed) / 2 )) >= -156 && parseFloat(mapLeft - (prevX1 - (nowX - startX-speed) / 2 )) <= 45 && parseFloat((prevX - (nowX - startX)+speed))>=-13 &&parseFloat((prevX - (nowX - startX)+speed))<=391){
					cancelAnimationFrame(changeId);
					$("#map").css("left", mapLeft - (prevX1 - (nowX - startX-speed) / 2 ));
					document.getElementById("Gome6").viewBox.baseVal.x = (prevX - (nowX - startX)+speed);
					pageNum=true;
				}else if(parseFloat(mapLeft - (prevX1 - (nowX - startX-speed) / 2 ))< -156 || parseFloat((prevX - (nowX - startX)+speed))>391 ){
					$("#map").css("left","-156px");
					document.getElementById("Gome6").viewBox.baseVal.x =391;
					pageNum=false;
				}else if(parseFloat(mapLeft - (prevX1 - (nowX - startX-speed) / 2 )) > 45 ||parseFloat((prevX - (nowX - startX)+speed)) < -12.6){
					$("#map").css("left","45px");
					document.getElementById("Gome6").viewBox.baseVal.x =  -12.6;
					pageNum=false;
				}

			}
        }
		//console.log(prevX)
		//console.log(parseFloat($("#map").css("left"))+'map left');
		//console.log(document.getElementById("Gome6").viewBox.baseVal.x +'gome 6 left')
	}, false);
	loadTouch.addEventListener("touchmove", function(e) {
		e.preventDefault();
	}, false);

	slideUp.addEventListener("touchend", function(event) {
        if (pageIndex1 == 8&&pageNum==true) {
            prevX = prevX - (nowX - startX);
            prevX1 = prevX1 - (nowX - startX) / 2;
        }
		endX = event.changedTouches[0].clientX;
		endY = event.changedTouches[0].clientY;
		moveX = endX - startX;
		moveY = endY - startY;

		if (dataTime[pageIndex - 5].canTouch) {
			if (pageIndex <= 10 && pageIndex > 5) {
				//上滑
                if( (moveX<0 && (moveY/moveX)>Math.sqrt(3))|| (moveX>0 && (moveY/moveX)<-Math.sqrt(3))) {
					dataTime[pageIndex - 5].canTouch = false;
					pageIndex = pageIndex + 1;
					$("#page_" + (pageIndex - 1) + "").css("display", "none");
					$("#page_" + pageIndex + "").css("display", "block");
					game.showAni(pageIndex - 2, pageIndex - 5);
					pageMap=true;
				} else if ((moveX>0 && (moveY/moveX)>Math.sqrt(3))|| (moveX<0 && (moveY/moveX)<-Math.sqrt(3))) {
					dataTime[pageIndex - 5].canTouch = false;
					pageIndex = pageIndex - 1;
					$("#page_" + (pageIndex + 1) + "").css("display", "none");
					$("#page_" + pageIndex + "").css("display", "block");
					game.showAni(pageIndex - 2, pageIndex - 5);
					pageMap=true;
				}
				pageIndex1 = pageIndex;
				if(pageIndex1 == 8 && pageMap == true){
					pageMap=false;
					//自动移动
					var startTimes = new Date().getTime();
					setTimeout(function () {
                        change();
                    },2000);

					function change() {
						var endTimes = new Date().getTime()-2000;
						speed=(endTimes - startTimes) / 1000 * 60;
						$("#map").css("left", mapLeft - speed/2);
						/*prevX=speed;
						 prevX1=parseFloat($("#map").css("left"))- speed/2;*/
						document.getElementById("Gome6").viewBox.baseVal.x = speed;
						//console.log(document.getElementById("Gome6").viewBox.baseVal.x )
						if (endTimes - startTimes < 6300) {
							changeId = requestAnimationFrame(change)
						}
					}
				}
			} else if (pageIndex == 11) {
				if ((moveX>0 && (moveY/moveX)>Math.sqrt(3))|| (moveX<0 && (moveY/moveX)<-Math.sqrt(3))) {
					dataTime[pageIndex - 5].canTouch = false;
					pageIndex = pageIndex - 1;
					$("#page_" + (pageIndex + 1) + "").css("display", "none");
					$("#page_" + pageIndex + "").css("display", "block");
					game.showAni(pageIndex - 2, pageIndex - 5);
				}
			} else if (pageIndex == 5) {
				if ((moveX<0 && (moveY/moveX)>Math.sqrt(3))|| (moveX>0 && (moveY/moveX)<-Math.sqrt(3))) {
					dataTime[pageIndex - 5].canTouch = false;
					pageIndex = pageIndex + 1;
					$("#page_" + (pageIndex - 1) + "").css("display", "none");
					$("#page_" + pageIndex + "").css("display", "block");
					game.showAni(pageIndex - 2, pageIndex - 5);
				}
			}
		}
	});

};
