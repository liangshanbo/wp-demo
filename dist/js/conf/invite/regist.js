!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=19)}({19:function(e,t,o){"use strict";var n;void 0!==(n=function(e,t,n){function r(e){var t={};e=e||location.search,e=decodeURI(e),e=/^\?.*/i.test(e)?e.substr(1):e;for(var o=e.split("&"),n=0,r=o.length;n<r;n++){var i=o[n].split("=");t[i[0]]=i[1]}return t}var i=o(!function(){var e=new Error('Cannot find module "$"');throw e.code="MODULE_NOT_FOUND",e}()),a=o(!function(){var e=new Error('Cannot find module "vue"');throw e.code="MODULE_NOT_FOUND",e}()),s=o(!function(){var e=new Error('Cannot find module "utils/async/ajax.js"');throw e.code="MODULE_NOT_FOUND",e}()),c=(o(!function(){var e=new Error('Cannot find module "mods/check/input.js"');throw e.code="MODULE_NOT_FOUND",e}()),o(!function(){var e=new Error('Cannot find module "UI/dialog/alert"');throw e.code="MODULE_NOT_FOUND",e}())),d=o(!function(){var e=new Error('Cannot find module "mods/send_verification"');throw e.code="MODULE_NOT_FOUND",e}()),u=o(!function(){var e=new Error('Cannot find module "mods/storage/storage.js"');throw e.code="MODULE_NOT_FOUND",e}());o(!function(){var e=new Error('Cannot find module "mods/country_area.js"');throw e.code="MODULE_NOT_FOUND",e}()),new a({el:"body",data:{phone:!!r(location.search).phone,verification:!1,agree:!0,stoken:"",timer:"",isShow:!1},init:function(){var e=r(location.search).phone,t=this,o=u.getItem("code"+e);u.getItem("countryCode"+e);e&&e>=7&&(i("#username").val(e),i("#send").addClass("verification-active"),o&&("undefined"!=o?(this.code=u.getItem("code"+e),this.countryCode=u.getItem("countryCode"+e),i("#countryNum").html(this.code+" "+this.countryCode)):i("#countryNum").html("IN +91"))),i("#area_cancel").click(function(){t.isShow=!1,i("#area").hide(),i("#regist").show()}),i(".country").on("click","dd",function(){t.code=i(this).attr("code"),t.countryCode=i(this).attr("countrycode"),i("#countryNum").html(t.code+" "+t.countryCode),t.isShow=!1,i("#area").hide(),i("#regist").show(),i("#country").find("dt").removeClass("fixed")})},methods:{hideTS:function(e){i(e.currentTarget).attr("placeholder","")},showTS:function(e,t){var o=i(e.currentTarget);1===t?o.attr("placeholder","Mobile No"):o.attr("placeholder","SMS verification code")},countryList:function(){this.isShow?(i("#area").hide(),i("#regist").show()):(i("#area").show(),i("#regist").hide()),this.show=!this.show},isNext:function(e,t){var o=i(e.currentTarget),n=o.val(),r=i("#send");1===t?n.length>=7?(this.phone=!0,"SEND"==r.html()&&r.addClass("verification-active")):(this.phone=!1,r.removeClass("verification-active")):this.verification=n.length>=6,this._nextHigh()},isAgree:function(e){var t=i(e.currentTarget);t.hasClass("register-agreement-active")?(t.removeClass("register-agreement-active"),this.agree=!0):(t.addClass("register-agreement-active"),this.agree=!1),this._nextHigh()},getCode:function(e){var t=i("#username").val(),o={countryCode:this.countryCode?this.countryCode:"+91",mobile:t,type:"INVITE_REGISTER"},n=i(e.currentTarget),r=this;n.hasClass("verification-active")&&(n.removeClass("verification-active"),d.checkPhone({dom:i("#send"),params:o,type:1,callback:function(e){r.stoken=e,u.setItem("inv"+t,e),u.setItem("invtime",1*new Date)}}))},nextStep:function(e){ga("send","event","login/sign","invite_sign_next_btn_click");var t=i(e.currentTarget),o=i("#username").val(),n=i("#verification").val(),a=r(location.search),d=a.source,h=this,l=a.invitationCode;if(!t.hasClass("disabled")){1*new Date-u.getItem("invtime")<=6e5&&u.getItem("inv"+o)?this.stoken=u.getItem("inv"+o):(u.removeItem("inv"+o),u.removeItem("invtime"));var v={countryCode:this.countryCode?this.countryCode:"+91",mobile:o,smsCode:n,smsToken:this.stoken};s.put({url:"/api/user/sms",data:v,success:function(e){var t=e.code,n=e.data.smsToken;200===t?(u.setItem("invitetime",1*new Date),u.setItem("invitesst",n),h.code&&(u.setItem("code"+o,h.code),u.setItem("countryCode"+o,h.countryCode)),location.href="/invite/setPassword?invitationCode="+l+"&phone="+o+"&source="+d):c.alertSecond(e.message)},error:function(e){}})}},_nextHigh:function(){this.phone&&this.verification&&this.agree?i("#register").removeClass("disabled"):i("#register").addClass("disabled")}}})}.call(t,o,t,e))&&(e.exports=n)}});
//# sourceMappingURL=regist.js.map