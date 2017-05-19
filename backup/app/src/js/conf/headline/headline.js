'use strict';

/**
 * @title: 今日头条
 * @time:  2017-03-24
 * @author: ZYZ
 */

define("conf/headline/headline", function (require, exports, module) {
    require('$');
    require('utils/async/lazyload.js');
    var appInterface = require("utils/appInterface");

    /*$(window).on('scroll',function(){
    	var $scrolltop = $('body').scrollTop();
    	if($scrolltop>10){
    		$('.header').addClass('red');
    	} else{
    		$('.header').removeClass('red');
    	}
    })*/
    if (location.href.indexOf("rid") > 0) {
        var $buyBtn = $("#buyBtn");
        $buyBtn.show();
        $buyBtn.on("click", function () {
            var url = "/nativeCall";
            appInterface.call(url, {
                target: targetURI
            }, function (data) {
                if (data.code != 200) {
                    appInterface.toast(data.message);
                }
            });
        });
    }
});
//# sourceMappingURL=../../src/maps/conf/headline/headline.js.map
