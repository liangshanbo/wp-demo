!function(n){function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var r={};o.m=n,o.c=r,o.i=function(n){return n},o.d=function(n,r,t){o.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:t})},o.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(r,"a",r),r},o.o=function(n,o){return Object.prototype.hasOwnProperty.call(n,o)},o.p="",o(o.s=32)}({32:function(n,o,r){"use strict";var t;void 0!==(t=function(n,o,t){function e(){u.post({url:"/api/user/logout",success:function(n){if(200!==n.code)return c.alertSecond(n.message),!1;location.assign("/")},error:function(n){return c.alertSecond(n.message),!1}})}r(!function(){var n=new Error('Cannot find module "$"');throw n.code="MODULE_NOT_FOUND",n}());var c=r(!function(){var n=new Error('Cannot find module "UI/dialog/alert.js"');throw n.code="MODULE_NOT_FOUND",n}()),u=r(!function(){var n=new Error('Cannot find module "utils/async/ajax.js"');throw n.code="MODULE_NOT_FOUND",n}());$("#loginoff").on("click",function(){c.alertBox({text:"Are you sure to log out?",confirmBtn:"Log out",cancelBtn:"cancel",callback:function(){e()}})})}.call(o,r,o,n))&&(n.exports=t)}});
//# sourceMappingURL=user.js.map