/**
 * 注册脚本
 * @author 黄奕海
 * @date 20170215
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/register/index.js">
 </script>
 */
define('conf/register/index.js', function(require, exports, module) {
    const $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert'),
        sendVerification = require('mods/send_verification'),
        storage = require('mods/storage/storage.js');
    require('mods/country_area.js');
    const regist = { phone: false, verification: false, agree: true, pwd: false };
    let area = {
        areaPhone: $('#register_area'),
        area: $('#area'),
        content: $('#content'),
        cancel: $('#area_cancel')
    };
    let send = $('#send'),
        phone = $('#username'),
        verification = $('#verification'),
        pwd = $('#password'),
        agree = $('#agree'),
        register = $('#register'),
        agreement=$('.register-agreement-href'),
        stoken;
    init();
    agreement.on("click",function(){
    //埋点
    ga('send', 'event', 'login/sign', 'sign_protocol_click');
    })
    function init() {
        bindEvents();
    }

    function bindEvents() {
        document.getElementById('username').addEventListener('input', function(event) {
            let val = phone.val();
            if (val.length >= 7) {
                regist.phone = true;
                if (send.html() == "SEND") {
                    send.addClass('verification-active');
                }
            } else {
                regist.phone = false;
                send.removeClass('verification-active');
            }
            if (val === "") { //苹果手机删除问题
                setTimeout(function() {
                    phone.val("")
                }, 50)
            }
            registerHigh();
        }, false);
        document.getElementById('verification').addEventListener('input', function(event) {
            let val = verification.val();
            regist.verification = val.length >= 6 ? true : false;
            if (val === "") { //苹果手机删除问题
                setTimeout(function() {
                    verification.val("")
                }, 50)
            }
            registerHigh();
        }, false);
        document.getElementById('password').addEventListener('input', function(event) {
            let val = pwd.val();
            pwd.val(val.replace(/[<> \&]/g, ""));
            regist.pwd = val.length >= 6 ? true : false;
            if (val === "") { //苹果手机删除问题
                setTimeout(function() {
                    pwd.val("")
                }, 50)
            }
            registerHigh();
        }, false);
        agree.on('click', function() {
            if (agree.hasClass('no-select')) {
                agree.removeClass('no-select');
                regist.agree = true;
            } else {
                agree.addClass('no-select');
                regist.agree = false;
            }
            registerHigh();
        });
        send.on('click', function () {
       //埋点
        ga('send', 'event', 'login/sign', 'sendSMScode_btn_click');
            const obj = {
                "mobile": phone.val(),
                "type": "REGIST",
                countryCode: "+" + area.areaPhone.html().split('+')[1]
            };
            if (!send.hasClass('verification-active')) {
                return;
            }
            /*  if(!check.isMobile(phone.val())){
                  UI.alertSecond('Phone number format error');
                  return;
              }*/
            send.removeClass('verification-active');
            sendVerification.checkPhone({
                dom: send,
                params: obj,
                callback: function(token) {
                    stoken = token; //获取手机验证码token;
                    storage.setItem("rst" + phone.val(), token); //register stoken
                    storage.setItem("rsttime", new Date() * 1); //register time
                }
            });
        });
        register.on('click',function(){
        //埋点
        ga('send', 'event', 'login/sign', 'sign_comfirm_btn_click');
            if(register.children("a").hasClass('disabled')){
                return ;
            }
            checkVerification();
        });
        /*区域手机号*/
        area.areaPhone.on('click', function() {
            area.area.show();
            area.content.hide();
        });
        area.area.on('click', 'dd', function() {
            let country = $(this).attr('countryCode'),
                countryCode = $(this).attr('code');
            area.areaPhone.html(countryCode + " " + country);
            area.area.hide();
            area.content.show();
            $('#country').find('dt').removeClass('fixed');
        });
        area.cancel.on('click', function() {
            area.area.hide();
            area.content.show();
        })
    }

    //注册按钮高亮
    function registerHigh() {
        if (regist.phone && regist.pwd && regist.verification && regist.agree) {
            register.children("a").removeClass('disabled');
        } else {
            register.children("a").addClass('disabled');
        }
    }
    //验证手机验证码和密码
    function checkVerification() {
        if (new Date() * 1 - storage.getItem('rsttime') <= 600000 && storage.getItem('rst' + phone.val())) {
            stoken = storage.getItem('rst' + phone.val());
        } else {
            storage.removeItem("rst" + phone.val());
            storage.removeItem("rsttime");
        }
        let obj = {};
        obj.smsCode = verification.val();
        obj.smsToken = stoken;
        obj.mobile = phone.val();
        obj.password = pwd.val();
        obj.countryCode = "+" + area.areaPhone.html().split('+')[1];
        /* if(!check.isMobile(obj.mobile)){
             UI.alertSecond('Phone number format error');
             return;
         }*/
        if (!check.password(obj.password)) {
            UI.alertSecond('Please enter a password with 6 to 20 digits, including letters, digitals or symbols.');
            return;
        }
        ajax.post({
            url: '/api/user/user',
            data: obj,
            success: function(data) {
                if (data.code == 200) {
                    UI.alertSecond("SIGN UP success", function() {
                        storage.removeItem("rst" + phone.val());
                        storage.removeItem("rsttime");
                        /**
                         * @title: 注册有礼活动
                         * @time:  2017-05-09
                         * @author: wangchunpeng
                         */
                        ajax.query({
                            url: "/api/cashback/plan",
                            data: {
                                planId: "PLAN_1493806065175"
                            },
                            success: function(data) {
                                if (data.code === 200 && data.data.plan && data.data.plan.planStatus == "OPEN") {
                                    location.assign('/hy/op/newgift');
                                } else {
                                    location.assign('/');
                                }
                            }
                        });
                    }, 500)
                } else {
                    verification.val("");
                    UI.alertSecond(data.message);
                }
            },
            error: function() {

            }
        });
    }
});
