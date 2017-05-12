/**
 * @title: cmd模板
 * @time:  2017-05-2
 * @author: ZYZ
 */

define("conf/hy/op/cms.js", function(require, exports, module) {
    require('$');
    var Lazyload = require('utils/async/lazyload.js');
    var Swiper = require('mods/swiper'),
        UI = require('UI/dialog/alert.js'),
        login = require('mods/login'),
        Share = require('mods/share/shareDialog');
    let userId = "",
        hasLogin = false;
    if (window.userinfo) {
        userId = userinfo.user.id;
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;

    //头部轮播
    var carousel = new Swiper('.carousel', {
        pagination: '.swiper-pagination',
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    let shareFB = new Share({
         title: "That's a good news",
        desc: "Exclusive for you",
        picture: wapcsspath + "/images/op/op.jpg",
        shareType: "opShare",
        type: "gif",
        success: function() {
            UI.alertSecond("share success");
        },
        failed: function() {
            UI.alertSecond("share failed");
        }
    });
    //判断是否登录
    $('#share').on('click', function() {
        if (userinfo) {
            console.log('已登录');
            shareFB.layer_show();
        } else {
            console.log('没有登录');
            login.login();
        }
    });
    //data
    var md4 = data.data.module_4;
    //console.log(md4);
    var str = '';
    //先渲染一个内容
    $('.tab-in li').eq(0).addClass('active');
    var first = $('.tab-in li').eq(0).attr('data-name');
    for (var i = 0; i < md4[first].peas.length; i++) {
        var cont = md4[first].peas[i];
        if(cont.id){
        str += '<li class="mod-hot-it"><a href="/pro/detail?id=' + cont.id + '&pdtype=2" class="hot-pic"><img gome-src="' + cont.customImage + '" src="'+ wapcsspath +'/images/common/default-home.png" alt=""></a><h4 class="hot-title">' + cont.name + '</h4><p class="hot-para"><strong>'+cont.sellingPrice.alternative +'.'+cont.sellingPrice.amount/100 + '</strong><del>' + cont.originPrice.alternative + '.' + cont.originPrice.amount/100 + '</del></p><a href="/pro/detail?id=' + cont.id + '&pdtype=2" class="hot-btn">BUY</a></li>';
        }
    }
    $('.foryou-cont #mod-hot-list').html(str);
    Lazyload.lazyload();
    //tab
    var for_h = parseInt($('.foryou-cont').height());
    $('.tab-in li').on('click', function() {
        for_h = parseInt($('.foryou-cont').height());
        $(this).addClass('active').siblings().removeClass('active');
        var name = $(this).attr('data-name');
        //console.log(md4[name]);
        str = '';
        for (var i = 0; i < md4[name].peas.length; i++) {
            var item = md4[name].peas[i];
            if(item.id){
                str += '<li class="mod-hot-it"><a href="/pro/detail?id=' + item.id + '&pdtype=2" class="hot-pic"><img gome-src="' + item.customImage + '" src="'+ wapcsspath +'/images/common/default-home.png" alt=""></a><h4 class="hot-title">' + item.name + '</h4><p class="hot-para"><strong>' + item.sellingPrice.alternative + '.' + item.sellingPrice.amount/100+ '</strong><del>' + item.originPrice.alternative + '.' + item.originPrice.amount/100+ '</del></p><a href="/pro/detail?id=' + item.id + '&pdtype=2" class="hot-btn">BUY</a></li>';
            }
        }
        //console.log(str);
        $('#mod-hot-list').empty().html(str);
        Lazyload.lazyload();
    })

    //console.log(for_h);
    //scroll
    function throttle(fn, wait) {
        var time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }
    //var tops = parseInt($('.tab-box').offset().top);
    function move() {
        var tops = parseInt($('.tab-box').offset().top);
        var scr_top = parseInt($(window).scrollTop());
        for_h = parseInt($('.foryou-cont').height());
        //console.log(tops);
        if (scr_top >= tops && scr_top <= (tops + for_h)) {
            $('.tab').addClass('fixed');
            //console.log('haha')
        } else {
            $('.tab').removeClass('fixed');
        }
        //console.log(scr_top+top);
    }
    window.addEventListener('scroll', throttle(move, 60));
})
