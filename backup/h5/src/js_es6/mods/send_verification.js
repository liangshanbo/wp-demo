/**
 * 发送验证码倒计时公共脚本
 * @author 黄奕海
 * @date 20170220
 * 页面引用
 */
define('mods/send_verification.js', function (require, exports, module) {
    const UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js'),
        storage = require('mods/storage/storage.js');
    require('$');
    let timer,stoken;
    //发送验证码
    function checkPhone(obj) {
        //type type = 1 是从邀请注册
        let {dom,params,time=60,callback,type = 0} = obj;
        ajax.post({
            url: '/api/user/sms',
            data: params,
            success: function (data) {
                let code = data.code;
                if (code === 200) {
                    UI.alertSecond("Sms Send succeed");
                    dom.removeClass('verification-active');
                    callback && callback(data.data.smsToken);
                    _countDown(dom, time);
                } else {
                    dom.addClass('verification-active');
                    UI.alertSecond(data.message, function () {
                        if (code === 409 && type === 0) {
                            if($('#register_area')){
                                storage.setItem('area',$('#register_area').html());
                            }
                            location.assign("/login?phone=" + $('#username').val());
                        }
                    }, type == 0 ? 1000 : 3000)
                }
            },
            error: function (data) {

            }
        })
    }
    //倒计时
    function _countDown(dom, time) {
        let times = time;
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
        }, 1000)
    }
    function clearTimer(){
        clearInterval(timer);
    }
    module.exports = {checkPhone,clearTimer}
});

