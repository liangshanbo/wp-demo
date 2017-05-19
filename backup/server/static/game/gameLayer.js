var GameLayer = function () {

    this.initListener();

};
GameLayer.prototype = {
    initListener:function(){

        //第三页
        var buttonGO = document.getElementsByClassName('start_button')[0];
        // console.log(buttonGO);
        buttonGO.addEventListener('touchstart',function(e){
            game['playMusic']('music');
        });
        buttonGO.addEventListener('touchend',function(e){
            //audio.play();
            //prevTime=e.timeStamp;
            $('#page_4').fadeOut();
            $('#page_5').fadeIn();
            $('.button_music_on').css('display','block');
            game.showAni(3,0);

        });
        //音乐的监听
        var buttonMusic = document.getElementById('page_0');

        buttonMusic.addEventListener('touchend',function(e){

            if(game['isMusicOpened']){
                game['playMusic']('music');
                $('.button_music_on').css('display','block');
                $('.button_music_off').css('display','none');

            }else {
                game['pauseMusic']('music');
                $('.button_music_on').css('display','none');
                $('.button_music_off').css('display','block');
            }
            game['isMusicOpened'] = !game['isMusicOpened'];


        });
        //第四页
        var boxObj = document.getElementById('box');
        var clickName;
        boxObj.addEventListener('touchend',function(event){
            event.stopPropagation();
            clickName = event.target.className;
            //先截取字符串，
            var  r =clickName.split("_")[1];
            //console.log(r);
            $("img[class^='show']").css("display","none");
            $(".show_"+r+"").css("display",'block');

            if(clickName.indexOf("close")>0){
                $("img[class^='show']").css("display","none");
            }
        })
        //第十页
        var boxObj = document.getElementById('page_10');
        var imgPage = 1;
        boxObj.addEventListener("touchstart", function(event) {
            //console.log(1111111)
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });


        boxObj.addEventListener("touchmove", function(e) {
            //console.log(2222222)
            e.preventDefault();
        }, false);


        boxObj.addEventListener('touchend',function(event){
            //console.log(3333333)
            endX = event.changedTouches[0].clientX;
            endY = event.changedTouches[0].clientY;
            moveX = endX - startX;
            moveY = endY - startY;
            //console.log('moveX'+moveX)
            if((moveX<0 && (moveY/moveX)<Math.sqrt(3))|| (moveX<0 && (moveY/moveX)>-Math.sqrt(3))) {
                //往左滑1
                if(imgPage >= 3){
                    imgPage = 1;

                }else{
                    imgPage++;
                }
                // console.log("zuo",imgPage)


                $(".picture_"+(imgPage)).css('display','block');
                $(".picture_"+(imgPage-1 == 0 ? 3 : imgPage-1 )).css('display','none');


            } else if((moveX>0 && (moveY/moveX)<Math.sqrt(3))|| (moveX>0 && (moveY/moveX)>-Math.sqrt(3))) {

                //往右滑
                if(imgPage <= 1){
                    imgPage = 3
                }else{
                    imgPage--;
                }
                // console.log("you",imgPage)

                $(".picture_"+imgPage).css('display','block');
                $(".picture_"+(imgPage+1 == 4 ? 1 : imgPage+1)).css('display','none');
                // console.log("显示",imgPage,"隐藏",imgPage+1 == 4 ? 1 : imgPage+1)

                //console.log($(".picture_"+(imgPage)).eq(0))

            }
            if(imgPage == 1){
                $('.dot1_grey').css('display','none');
                $('.dot1_red').css('display','block');
                $('.dot3_grey').css('display','block');
                $('.dot2_grey').css('display','block');
                $('.dot3_red').css('display','none');
                $('.dot2_red').css('display','none');
            }else if(imgPage == 2){
                $('.dot1_grey').css('display','block');
                $('.dot3_grey').css('display','block');
                $('.dot2_grey').css('display','none');
                $('.dot1_red').css('display','none');
                $('.dot3_red').css('display','none');
                $('.dot2_red').css('display','block');

            }else if(imgPage == 3){
                $('.dot1_grey').css('display','block');
                $('.dot2_grey').css('display','block');
                $('.dot3_grey').css('display','none');
                $('.dot1_red').css('display','none');
                $('.dot2_red').css('display','none');
                $('.dot3_red').css('display','block');

            }
        })

    }
}