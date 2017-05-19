'use strict';

/**
 * 忘记密码设置密码脚本
 * @author 黄奕海
 * @date 20170220
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/forgot/setpwd.js">
 </script>
 */
define('conf/forgot/setpwd.js', function (require, exports, module) {
    var check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js'),
        storage = require('mods/storage/storage');
    require('$');
    var pwd = $('#password'),
        pwd1 = $('#password1'),
        confirm = $('#confirm'),
        isHigh = { pwd: false, pwd1: false };
    init();
    function init() {
        bindEvents();
    }

    function bindEvents() {
        document.getElementById('password').addEventListener('input', function (event) {
            var val = pwd.val();
            pwd.val(val.replace(/[<> \&]/g, ""));
            isHigh.pwd = val.length >= 6 ? true : false;
            if (val === "") {
                //苹果手机删除问题
                setTimeout(function () {
                    pwd.val("");
                }, 50);
            }
            confirmHigh();
        }, false);
        document.getElementById('password1').addEventListener('input', function (event) {
            var val = pwd1.val();
            pwd1.val(val.replace(/[<> \&]/g, ""));
            isHigh.pwd1 = val.length >= 6 ? true : false;
            if (val === "") {
                //苹果手机删除问题
                setTimeout(function () {
                    pwd1.val("");
                }, 50);
            }
            confirmHigh();
        }, false);
        pwd.on('blur', function () {
            var val = pwd.val();
            if (!check.password(val)) {
                UI.alertSecond('Please enter a password with 6 to 20 digits, including letters, digitals or symbols.');
            }
        });
        pwd1.on('blur', function () {
            var val = pwd1.val();
            if (!check.password(val)) {
                UI.alertSecond('Please enter a password with 6 to 20 digits, including letters, digitals or symbols.');
            }
        });
        confirm.on('click', function () {
            var pwdVal = pwd.val(),
                pwdVal1 = pwd1.val();
            if (confirm.children('a').hasClass('disabled')) {
                return;
            }
            if (pwdVal !== pwdVal1) {
                UI.alertSecond('Password two input is not consistent, please re-ente');
                return;
            }
            confirmSetpwd();
        });
    }

    //confirm按钮高亮
    function confirmHigh() {
        if (isHigh.pwd && isHigh.pwd1) {
            confirm.children('a').removeClass('disabled');
        } else {
            confirm.children('a').addClass('disabled');
        }
    }

    //重置密码提交
    function confirmSetpwd() {
        var stoken = void 0;
        if (new Date() * 1 - storage.getItem('ssttime') <= 600000) {
            stoken = storage.getItem('sst');
        } else {
            storage.removeItem("sst");
            storage.removeItem("ssttime");
        }
        var obj = {
            smsToken: stoken,
            password: pwd.val(),
            confirmedPassword: pwd1.val()
        };
        ajax.put({
            url: '/api/user/password',
            data: obj,
            success: function success(data) {
                if (data.code === 200) {
                    UI.alertSecond('Changed successfully', function () {
                        var phone = storage.getItem('fphone');
                        storage.removeItem('sst');
                        storage.removeItem('ssttime');
                        location.assign("/login?phone=" + phone);
                    }, 500);
                } else {
                    UI.alertSecond(data.message);
                }
            },
            error: function error() {}
        });
    }
});
//# sourceMappingURL=../../../maps/conf/forgot/setpwd.js.map
