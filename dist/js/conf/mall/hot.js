!function(o){function n(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}var a={};n.m=o,n.c=a,n.i=function(o){return o},n.d=function(o,a,e){n.o(o,a)||Object.defineProperty(o,a,{configurable:!1,enumerable:!0,get:e})},n.n=function(o){var a=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(a,"a",a),a},n.o=function(o,n){return Object.prototype.hasOwnProperty.call(o,n)},n.p="",n(n.s=28)}({28:function(o,n,a){"use strict";var e;void 0!==(e=function(o,n,e){a(!function(){var o=new Error('Cannot find module "$"');throw o.code="MODULE_NOT_FOUND",o}());var t=a(!function(){var o=new Error('Cannot find module "utils/async/ajax"');throw o.code="MODULE_NOT_FOUND",o}()),r=a(!function(){var o=new Error('Cannot find module "vue"');throw o.code="MODULE_NOT_FOUND",o}()),d=a(!function(){var o=new Error('Cannot find module "UI/dialog/alert.js"');throw o.code="MODULE_NOT_FOUND",o}()),i=a(!function(){var o=new Error('Cannot find module "utils/async/lazyload.js"');throw o.code="MODULE_NOT_FOUND",o}()),s=a(!function(){var o=new Error('Cannot find module "mods/buried_point.js"');throw o.code="MODULE_NOT_FOUND",o}()),l=void 0;a(!function(){var o=new Error('Cannot find module "mods/filters/com"');throw o.code="MODULE_NOT_FOUND",o}()),a(!function(){var o=new Error('Cannot find module "vendors/dropload.js"');throw o.code="MODULE_NOT_FOUND",o}()),r.component("listmore",{props:{items:{type:Array,default:function(){return[]}}},template:"#template"});var c=new r({el:"body",data:{moreData:[],type:0,num:2,noMore:0,pType:"5",pdPos:"",dom:"#good-list"},created:function(){var o=this;s.init({dom:o.dom,pdPos:o.pdPos,pType:o.pType})},init:function(){var o=this;l=$("#good-list").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',domUpdate:'<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',domLoad:'<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'},domUp:{domClass:"dropload-up",domRefresh:'<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',domUpdate:'<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',domLoad:'<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'},loadUpFn:function(o){setTimeout(function(){o.resetload(),location.reload(!0)},500)},loadDownFn:function(n){var a=0===o.type?"hotSalesItems":"bargainItems";t.query({url:"/api/ext/item/"+a+"?pageNum="+o.num+++"&pageSize=10",success:function(a){if(setTimeout(function(){n.resetload()},300),200===a.code){if(!a.data.items.length)return void d.alertSecond("Data is loaded");a.data.items.length<10&&(o.noMore=1,l.lock()),o.moreData=o.moreData.concat(a.data.items),i.lazyload()}else d.alertSecond(a.message)}})}})}});e.exports=c}.call(n,a,n,o))&&(o.exports=e)}});
//# sourceMappingURL=hot.js.map