!function(e){function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=5)}({5:function(e,n,t){"use strict";var o;void 0!==(o=function(e,n,o){function a(){document.getElementById("username").addEventListener("input",function(e){var n=u.val();n.length>=7?("SEND"==f.html()&&f.addClass("verification-active"),h.phone=!0):(h.phone=!1,f.removeClass("verification-active")),""===n&&setTimeout(function(){u.val("")},50),r()},!1),document.getElementById("verification").addEventListener("input",function(e){var n=m.val();n.length>=6?h.verification=!0:h.verification=!1,""===n&&setTimeout(function(){m.val("")},50),r()},!1),f.on("click",function(){var e={mobile:u.val(),type:"FINDPWD",countryCode:"+"+O.areaPhone.html().split("+")[1]};f.hasClass("verification-active")&&(f.removeClass("verification-active"),d.checkPhone({dom:f,params:e,callback:function(e){p=e,l.setItem("fst"+u.val(),e),l.setItem("fsttime",1*new Date)}}))}),v.on("click",function(){1*new Date-l.getItem("fsttime")<=6e5&&l.getItem("fst"+u.val())?p=l.getItem("fst"+u.val()):(l.removeItem("fst"+u.val()),l.removeItem("fsttime"));var e=u.val(),n={smsCode:m.val(),smsToken:p,mobile:e,countryCode:"+"+O.areaPhone.html().split("+")[1]};v.children("a").hasClass("disabled")||i(n)}),O.areaPhone.on("click",function(){O.area.show(),O.content.hide()}),O.area.on("click","dd",function(){var e=$(this).attr("countryCode"),n=$(this).attr("code");O.areaPhone.html(n+" "+e),O.area.hide(),O.content.show(),$("#country").find("dt").removeClass("fixed")}),O.cancel.on("click",function(){O.area.hide(),O.content.show()})}function r(){h.phone&&h.verification?v.children("a").removeClass("disabled"):v.children("a").addClass("disabled")}function i(e){s.put({url:"/api/user/sms",data:e,success:function(e){200===e.code?(l.setItem("fphone",u.val()),l.setItem("sst",e.data.smsToken),l.setItem("ssttime",1*new Date),l.setItem("area",O.areaPhone.html()),location.assign("/forgot/setpwd")):c.alertSecond(e.message)},error:function(){}})}var c=(t(!function(){var e=new Error('Cannot find module "mods/check/input.js"');throw e.code="MODULE_NOT_FOUND",e}()),t(!function(){var e=new Error('Cannot find module "UI/dialog/alert.js"');throw e.code="MODULE_NOT_FOUND",e}())),s=t(!function(){var e=new Error('Cannot find module "utils/async/ajax.js"');throw e.code="MODULE_NOT_FOUND",e}()),d=t(!function(){var e=new Error('Cannot find module "mods/send_verification"');throw e.code="MODULE_NOT_FOUND",e}()),l=t(!function(){var e=new Error('Cannot find module "mods/storage/storage"');throw e.code="MODULE_NOT_FOUND",e}());t(!function(){var e=new Error('Cannot find module "$"');throw e.code="MODULE_NOT_FOUND",e}()),t(!function(){var e=new Error('Cannot find module "mods/country_area.js"');throw e.code="MODULE_NOT_FOUND",e}());var u=$("#username"),f=$("#send"),m=$("#verification"),v=$("#next"),h={phone:!1,verification:!1},p=void 0,O={areaPhone:$("#forgot_area"),area:$("#area"),content:$("#content"),cancel:$("#area_cancel")};!function(){a()}()}.call(n,t,n,e))&&(e.exports=o)}});
//# sourceMappingURL=index.js.map