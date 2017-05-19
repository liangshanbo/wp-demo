"use strict";

/**
 * 邀请好友 设置密码
 * @author wangming
 * @date 20170315
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/invite/setPassword.js">
 </script>
 */

define('conf/invite/setPassword.js', function (require, exports, module) {
    require("$");
    var ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        storage = require('mods/storage/storage.js'),
        check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert.js');

    new Vue({
        el: "body",
        data: {
            password: false
        },
        init: function init() {
            var phone = getParams(location.search).phone;
            if (phone) {
                $("#username").val(phone.substr(0, 3) + "****" + phone.substr(7));
            }
        },
        methods: {
            hideTS: function hideTS(dom) {
                var $this = $(dom.currentTarget);
                $this.attr("placeholder", "");
            },
            showTS: function showTS(dom) {
                var $this = $(dom.currentTarget);
                $this.attr("placeholder", "New  Password");
            },
            isNext: function isNext(dom) {
                var $this = $(dom.currentTarget),
                    val = $this.val();
                $this.val(val.replace(/[<> \&]/g, ""));
                if (val.length >= 6) {
                    this.password = true;
                } else {
                    this.password = false;
                }
                this._nextHigh();
            },
            nextStep: function nextStep(dom) {
                var pwd = $("#password").val(),
                    params = getParams(location.search),
                    phone = params.phone,
                    invitationCode = params.invitationCode,
                    $this = $(dom.currentTarget);
                var stoken = void 0,
                    obj = {},
                    source = params.source;
                //埋点
                ga('send', 'event', 'login/sign', 'invite_sign_finish_btn_click');
                if (new Date() * 1 - storage.getItem('invitetime') <= 600000) {
                    stoken = storage.getItem('invitesst');
                } else {
                    storage.removeItem("invitesst");
                    storage.removeItem("invitetime");
                }
                if ($this.hasClass("disabled")) {
                    return;
                }
                if (!check.password(pwd)) {
                    UI.alertSecond('Please enter a password with 6 to 20 digits, including letters, digitals or symbols.');
                    return;
                }
                if (source) {
                    if (source == "FB") {
                        source = "FACEBOOK";
                    } else {
                        source = "SMS";
                    }
                }
                obj = {
                    password: pwd,
                    accessToken: stoken,
                    type: source
                };
                if (invitationCode != "undefined") {
                    obj.refereeUserId = invitationCode;
                }
                ajax.post({
                    url: '/api/user/register',
                    data: obj,
                    success: function success(data) {
                        var code = data.code;
                        if (code === 200) {
                            UI.alertSecond("SIGN UP success", function () {
                                storage.removeItem("rst" + phone);
                                storage.removeItem("rsttime");
                                location.assign('/');
                            }, 500);
                        } else {
                            UI.alertSecond(data.message);
                        }
                    },
                    error: function error(data) {}
                });
            },
            goback: function goback() {
                var params = getParams(location.search),
                    phone = params.phone,
                    invitationCode = params.invitationCode,
                    source = params.source;
                location.href = "/invite/regist?phone=" + phone + "&invitationCode=" + invitationCode + "&source=" + source;
            },
            _nextHigh: function _nextHigh() {
                if (this.password) {
                    $('#register').removeClass("disabled");
                } else {
                    $('#register').addClass("disabled");
                }
            }
        }
    });

    function getParams(url) {
        var obj = {};
        url = url || location.search;
        url = decodeURI(url);
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        var arr = url.split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var res = arr[i].split("=");
            obj[res[0]] = res[1];
        }
        return obj;
    }
});
//# sourceMappingURL=../../../maps/conf/invite/setPassword.js.map
