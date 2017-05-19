'use strict';

/**
 * 发送验证码倒计时公共脚本
 * @author 黄奕海
 * @date 20170220
 * 页面引用
 */
define('mods/send_verification.js', function (require, exports, module) {
    var UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js'),
        storage = require('mods/storage/storage.js');
    require('$');
    var timer = void 0,
        stoken = void 0;
    //发送验证码
    function checkPhone(obj) {
        //type type = 1 是从邀请注册
        var dom = obj.dom,
            params = obj.params,
            _obj$time = obj.time,
            time = _obj$time === undefined ? 60 : _obj$time,
            callback = obj.callback,
            _obj$type = obj.type,
            type = _obj$type === undefined ? 0 : _obj$type;

        ajax.post({
            url: '/api/user/sms',
            data: params,
            success: function success(data) {
                var code = data.code;
                if (code === 200) {
                    UI.alertSecond("Sms Send succeed");
                    dom.removeClass('verification-active');
                    callback && callback(data.data.smsToken);
                    _countDown(dom, time);
                } else {
                    dom.addClass('verification-active');
                    UI.alertSecond(data.message, function () {
                        if (code === 409 && type === 0) {
                            if ($('#register_area')) {
                                storage.setItem('area', $('#register_area').html());
                            }
                            location.assign("/login?phone=" + $('#username').val());
                        }
                    }, type == 0 ? 1000 : 3000);
                }
            },
            error: function error(data) {}
        });
    }
    //倒计时
    function _countDown(dom, time) {
        var times = time;
        dom.html(times + "s");
        timer = setInterval(function () {
            times--;
            dom.html(times + "s");
            if (times <= 0) {
                clearTimer();
                dom.html("SEND");
                dom.addClass('verification-active');
                times = time;
            }
        }, 1000);
    }
    function clearTimer() {
        clearInterval(timer);
    }
    module.exports = { checkPhone: checkPhone, clearTimer: clearTimer };
});
//# sourceMappingURL=../../maps/mods/send_verification.js.map
