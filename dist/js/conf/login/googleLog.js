!function(n){function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:o})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=23)}({23:function(n,e,t){"use strict";var o;void 0!==(o=function(n,e,o){t(!function(){var n=new Error('Cannot find module "$"');throw n.code="MODULE_NOT_FOUND",n}());var r=(t(!function(){var n=new Error('Cannot find module "mods/check/input.js"');throw n.code="MODULE_NOT_FOUND",n}()),t(!function(){var n=new Error('Cannot find module "mods/storage/storage"');throw n.code="MODULE_NOT_FOUND",n}())),c=t(!function(){var n=new Error('Cannot find module "UI/dialog/alert.js"');throw n.code="MODULE_NOT_FOUND",n}()),i=t(!function(){var n=new Error('Cannot find module "utils/async/ajax.js"');throw n.code="MODULE_NOT_FOUND",n}());gapi.load("auth2",function(){function n(n){t.isSignedIn.listen(function(){e()})}function e(){var n=t.currentUser.get().w3;console.log(n);var e={id:n.Eea,thirdPartyAccountType:"GOOGLE",thirdPartyAccessToken:t.currentUser.get().getAuthResponse().id_token,name:n.ig,facePicUrl:n.Paa},o="/api/user/thirdPartyAccountLogin?id="+e.id+"&thirdPartyAccessToken="+e.thirdPartyAccessToken+"&thirdPartyAccountType="+e.thirdPartyAccountType;i.query({url:o,success:function(n){if(200!==n.code)return c.alertSecond(n.message),!1;n.data.isBound?(r.setItem("ascToken",e),location.replace("/")):(r.setItem("ascToken",e),location.assign("/login/associated"))},error:function(n){return c.alertSecond(n.message),!1}})}var t=gapi.auth2.init({client_id:"114362993453-5duccv5c6m0q3agfnassl0gsmpd673ng.apps.googleusercontent.com",scope:"profile"});$("#signinButton").click(function(){ga("send","event","login/sign","login_google_btn_click"),t.isSignedIn.get()?e():t.grantOfflineAccess().then(n)})})}.call(e,t,e,n))&&(n.exports=o)}});
//# sourceMappingURL=googleLog.js.map