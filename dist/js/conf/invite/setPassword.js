!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=20)}({20:function(e,t,n){"use strict";var r;void 0!==(r=function(e,t,r){function o(e){var t={};e=e||location.search,e=decodeURI(e),e=/^\?.*/i.test(e)?e.substr(1):e;for(var n=e.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");t[i[0]]=i[1]}return t}n(!function(){var e=new Error('Cannot find module "$"');throw e.code="MODULE_NOT_FOUND",e}());var i=n(!function(){var e=new Error('Cannot find module "utils/async/ajax"');throw e.code="MODULE_NOT_FOUND",e}()),s=n(!function(){var e=new Error('Cannot find module "vue"');throw e.code="MODULE_NOT_FOUND",e}()),a=n(!function(){var e=new Error('Cannot find module "mods/storage/storage.js"');throw e.code="MODULE_NOT_FOUND",e}()),c=n(!function(){var e=new Error('Cannot find module "mods/check/input.js"');throw e.code="MODULE_NOT_FOUND",e}()),d=n(!function(){var e=new Error('Cannot find module "UI/dialog/alert.js"');throw e.code="MODULE_NOT_FOUND",e}());new s({el:"body",data:{password:!1},init:function(){var e=o(location.search).phone;e&&$("#username").val(e.substr(0,3)+"****"+e.substr(7))},methods:{hideTS:function(e){$(e.currentTarget).attr("placeholder","")},showTS:function(e){$(e.currentTarget).attr("placeholder","New  Password")},isNext:function(e){var t=$(e.currentTarget),n=t.val();t.val(n.replace(/[<> \&]/g,"")),n.length>=6?this.password=!0:this.password=!1,this._nextHigh()},nextStep:function(e){var t=$("#password").val(),n=o(location.search),r=n.phone,s=n.invitationCode,u=$(e.currentTarget),l=void 0,f={},v=n.source;if(ga("send","event","login/sign","invite_sign_finish_btn_click"),1*new Date-a.getItem("invitetime")<=6e5?l=a.getItem("invitesst"):(a.removeItem("invitesst"),a.removeItem("invitetime")),!u.hasClass("disabled")){if(!c.password(t))return void d.alertSecond("Please enter a password with 6 to 20 digits, including letters, digitals or symbols.");v&&(v="FB"==v?"FACEBOOK":"SMS"),f={password:t,accessToken:l,type:v},"undefined"!=s&&(f.refereeUserId=s),i.post({url:"/api/user/register",data:f,success:function(e){200===e.code?d.alertSecond("SIGN UP success",function(){a.removeItem("rst"+r),a.removeItem("rsttime"),location.assign("/")},500):d.alertSecond(e.message)},error:function(e){}})}},goback:function(){var e=o(location.search),t=e.phone,n=e.invitationCode,r=e.source;location.href="/invite/regist?phone="+t+"&invitationCode="+n+"&source="+r},_nextHigh:function(){this.password?$("#register").removeClass("disabled"):$("#register").addClass("disabled")}}})}.call(t,n,t,e))&&(e.exports=r)}});
//# sourceMappingURL=setPassword.js.map