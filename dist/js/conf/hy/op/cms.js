!function(o){function e(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return o[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var t={};e.m=o,e.c=t,e.i=function(o){return o},e.d=function(o,t,a){e.o(o,t)||Object.defineProperty(o,t,{configurable:!1,enumerable:!0,get:a})},e.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(t,"a",t),t},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=5)}({5:function(o,e,t){"use strict";var a;void 0!==(a=function(o,e,a){function n(){var o=parseInt($(".tab-box").offset().top),e=parseInt($(window).scrollTop());v=parseInt($(".foryou-cont").height()),e>=o&&e<=o+v?$(".tab").addClass("fixed"):$(".tab").removeClass("fixed")}t(!function(){var o=new Error('Cannot find module "$"');throw o.code="MODULE_NOT_FOUND",o}());var r=t(!function(){var o=new Error('Cannot find module "utils/async/lazyload.js"');throw o.code="MODULE_NOT_FOUND",o}()),i=t(!function(){var o=new Error('Cannot find module "mods/swiper"');throw o.code="MODULE_NOT_FOUND",o}()),s=t(!function(){var o=new Error('Cannot find module "UI/dialog/alert.js"');throw o.code="MODULE_NOT_FOUND",o}()),l=t(!function(){var o=new Error('Cannot find module "mods/login"');throw o.code="MODULE_NOT_FOUND",o}()),c=t(!function(){var o=new Error('Cannot find module "mods/share/shareDialog"');throw o.code="MODULE_NOT_FOUND",o}()),d="",u=!1;window.userinfo&&(d=userinfo.user.id,u=!0),window.userId=d,window.hasLogin=u;var p=(new i(".carousel",{pagination:".swiper-pagination",autoplay:2500,autoplayDisableOnInteraction:!1}),new c({title:"That's a good news",desc:"Exclusive for you",picture:wapcsspath+"/images/op/op.jpg",shareType:"opShare",type:"gif",success:function(){s.alertSecond("share success")},failed:function(){s.alertSecond("share failed")}}));$("#share").on("click",function(){userinfo?(console.log("已登录"),p.layer_show()):(console.log("没有登录"),l.login())});var f=data.data.module_4,h="";$(".tab-in li").eq(0).addClass("active");for(var m=$(".tab-in li").eq(0).attr("data-name"),g=0;g<f[m].peas.length;g++){var w=f[m].peas[g];w.id&&(h+='<li class="mod-hot-it"><a href="/pro/detail?id='+w.id+'&pdtype=2" class="hot-pic"><img gome-src="'+w.customImage+'" src="'+wapcsspath+'/images/common/default-home.png" alt=""></a><h4 class="hot-title">'+w.name+'</h4><p class="hot-para"><strong>'+w.sellingPrice.alternative+"."+w.sellingPrice.amount/100+"</strong><del>"+w.originPrice.alternative+"."+w.originPrice.amount/100+'</del></p><a href="/pro/detail?id='+w.id+'&pdtype=2" class="hot-btn">BUY</a></li>')}$(".foryou-cont #mod-hot-list").html(h),r.lazyload();var v=parseInt($(".foryou-cont").height());$(".tab-in li").on("click",function(){v=parseInt($(".foryou-cont").height()),$(this).addClass("active").siblings().removeClass("active");var o=$(this).attr("data-name");h="";for(var e=0;e<f[o].peas.length;e++){var t=f[o].peas[e];t.id&&(h+='<li class="mod-hot-it"><a href="/pro/detail?id='+t.id+'&pdtype=2" class="hot-pic"><img gome-src="'+t.customImage+'" src="'+wapcsspath+'/images/common/default-home.png" alt=""></a><h4 class="hot-title">'+t.name+'</h4><p class="hot-para"><strong>'+t.sellingPrice.alternative+"."+t.sellingPrice.amount/100+"</strong><del>"+t.originPrice.alternative+"."+t.originPrice.amount/100+'</del></p><a href="/pro/detail?id='+t.id+'&pdtype=2" class="hot-btn">BUY</a></li>')}$("#mod-hot-list").empty().html(h),r.lazyload()}),window.addEventListener("scroll",function(o,e){var t=Date.now();return function(){t+e-Date.now()<0&&(o(),t=Date.now())}}(n,60))}.call(e,t,e,o))&&(o.exports=a)}});
//# sourceMappingURL=cms.js.map