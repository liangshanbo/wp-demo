'use strict';

/**
 * 登录脚本
 * @author guodanying
 * @date 20170216
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/login/index.js">
 </script>
 */
define('conf/login/index.js', function (require, exports, module) {
    var check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js'),
        storage = require('mods/storage/storage'),
        cookie = require('mods/storage/cookie');
    require('$');
    require('/conf/login/fbLog.js');
    require('/conf/login/googleLog.js');
    require('mods/country_area.js');
    var log = $("#log");
    var Mobile = $("#username");
    var password = $("#password");
    var mobileDel = $('#login-phone-del');
    var regist = $('.btn-border');
    var forgot = $(".login-input-forgot");
    var area = {
        areaPhone: $('#login_area'),
        area: $('#area'),
        content: $('#content'),
        cancel: $('#area_cancel')
    };
    var params = getParams();
    var light = { phone: false, psd: false };
    window.onload = function () {
        //浏览器缓存
        var val0 = Mobile.val();
        /* let val1=[];
             $("input[type=password]").each(function(){
                 val1.push($(this).val());
             });*/
        if (val0.length >= 7) {
            light.phone = true;
            light.psd = true;
            loginHigh();
        }
    };

    init();
    function init() {
        //注册和忘记密码token;
        storage.removeItem("fst");
        storage.removeItem("fsttime");
        storage.removeItem('sst');
        storage.removeItem('ssttime');
        if (Mobile.val() !== "") {
            light.phone = true;
        }
        if (!!storage.getItem('area')) {
            area.areaPhone.html(storage.getItem('area'));
            storage.removeItem("area");
        }
        document.getElementById('username').addEventListener('input', function (event) {
            var val = Mobile.val();
            if (val !== "") {
                mobileDel.show();
            } else {
                mobileDel.hide();
            }
            light.phone = val.length >= 7 ? true : false;
            if (val === "") {
                //苹果手机删除问题
                setTimeout(function () {
                    Mobile.val("");
                }, 50);
            }
            loginHigh();
        }, false);
        mobileDel.on('click', function () {
            Mobile.val("");
            mobileDel.hide();
            Mobile.focus();
        });
        document.getElementById('password').addEventListener('input', function (event) {
            var val = password.val();
            password.val(val.replace(/[<> \&]/g, ""));
            light.psd = val.length >= 6 ? true : false;
            if (val === "") {
                //苹果手机删除问题
                setTimeout(function () {
                    password.val("");
                }, 50);
            }
            loginHigh();
        }, false);
        /*区域手机号*/
        area.areaPhone.on('click', function () {
            area.area.show();
            area.content.hide();
        });
        area.area.on('click', 'dd', function () {
            var country = $(this).attr('countryCode'),
                countryCode = $(this).attr('code');
            area.areaPhone.html(countryCode + " " + country);
            area.area.hide();
            area.content.show();
            $('#country').find('dt').removeClass('fixed');
        });
        area.cancel.on('click', function () {
            area.area.hide();
            area.content.show();
        });
    }
    log.on("click", function () {
        //埋点
        ga('send', 'event', 'login/sign', 'login_btn_click');
        if ($("#log").attr("disabled") == "true") {
            return false;
            if (!isLogin()) {
                return;
            }
        }
        var obj = {
            mobile: Mobile.val(),
            password: password.val(),
            countryCode: "+" + area.areaPhone.html().split('+')[1]
        };
        ajax.post({
            url: '/api/user/login',
            data: obj,
            success: function success(data) {
                if (data.code === 200) {
                    //type 记录回跳下一个页面。
                    if (params && params.redirect) {
                        var redirect = decodeURIComponent(params.redirect);
                        if (params.type) {
                            if (params.type === "collect") {
                                cookie.setCookie("collect", 1, 1 / (24 * 10));
                            } else if (params.type === "buy") {
                                redirect += "&affExtParam1=" + data.data.user.id;
                            }
                        }
                        location.replace(redirect);
                    } else {
                        location.replace('/');
                    }
                } else {
                    UI.alertSecond(data.message);
                    return false;
                }
            },
            error: function error(data) {
                UI.alertSecond(data.message);
                return false;
            }
        });
    });
    regist.on("click", function () {
        //埋点

        ga('send', 'event', 'login/sign', 'sign_btn_click');
    });
    forgot.on("click", function () {
        //埋点

        ga('send', 'event', 'login/sign', 'forgotpassword_click');
    });
    function isLogin() {
        if ('onLine' in navigator && !navigator.onLine) {
            UI.alertSecond('Unable to access server. Please check network.');
            return false;
        }
        ;
        /*  if (!check.isMobile(Mobile.val().trim())) {
              UI.alertSecond("User name or password is incorrect, please re-enter");
              return false;
          }*/
        ;
        if (!check.password(password.val().trim())) {
            UI.alertSecond("User name or password is incorrect, please re-enter");
            return false;
        }
        ;
        return true;
    }

    function loginHigh() {
        if (light.phone && light.psd) {
            $("#log").attr("disabled", false).removeClass("disabled");
        } else {
            $("#log").attr("disabled", true).addClass("disabled");
        }
    }

    function getParams(url) {
        //获取url传递的参数*/
        var obj = {};
        url = url || location.search;
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        var arr = url.split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var res = arr[i].split("=");
            obj[res[0]] = res[1];
        }
        return obj;
    }
});
//# sourceMappingURL=../../../maps/conf/login/index.js.map
