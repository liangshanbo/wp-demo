/**
 * 第三方注册绑定手机号
 * @author lixuefeng
 * @date 20170228
 * 页面引用
 * <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/login/associated.js">
 </script>
*/

define('conf/login/associated.js', function (require, exports, module) {
    'use strict';
    const check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js'),
        sendVerification = require('mods/send_verification'),
        storage = require('mods/storage/storage');
    require('$');
    require('mods/country_area.js');
    let phone = $('#username'),
        send = $('#send'),
        verification = $('#verification'),
        next = $('#next'),
        isHigh = { phone: false, verification: false },
        stoken = void 0;
    let area = {
        areaPhone:$('#register_area'),
        area:$('#area'),
        content:$('#content'),
        cancel:$('#area_cancel')
    };
    let bindEvents = () => {
        document.getElementById('username').addEventListener('input', function(event) {
            var val = phone.val();
            if (val.length >= 7) {
                isHigh.phone = true;
                if(send.text()=== "SEND"){
                    send.addClass('verification-active'); //bgcolor:#FFF
                }
            } else {
                isHigh.phone = false;
                send.removeClass('verification-active');
            }
            if(val === ""){//苹果手机删除问题
                setTimeout(function(){
                    phone.val("")
                },50)
            }
            nextHigh();
        }, false);
        document.getElementById('verification').addEventListener('input', function(event) {
            let val = verification.val();
            if (val.length >= 6) {
                isHigh.verification = true;
            } else {
                isHigh.verification = false;
            }
            if(val === ""){//苹果手机删除问题
                setTimeout(function(){
                    verification.val("")
                },50)
            }
            nextHigh();
        }, false);
        send.on('click',  () => {
            const obj = {
                "mobile": phone.val(),
                "type": "BINDPHONE",
                "countryCode":"+"+area.areaPhone.html().split('+')[1]
            };
            if (!send.hasClass('verification-active')) {
                return;
            };
            /*if (!check.isMobile(phone.val())) {
                UI.alertSecond('Phone number format error');
                return;
            };*/
            send.removeClass('verification-active');
            sendVerification.checkPhone({
                dom:send,
                params:obj,
                callback:function (token) {
                    stoken = token;
                    storage.setItem("asc" + phone.val(), token);
                    storage.setItem("asctime", new Date() * 1);
                }
            });
        });
        next.on('click', () => {
        //埋点
        
        ga('send', 'event', 'login/sign', 'sign_mobilephone_relevance_confirm');
            if (new Date() * 1 - storage.getItem('asctime') <= 600000 && storage.getItem('asc' + phone.val())) {
                stoken = storage.getItem("asc" + phone.val());
            } else {
                storage.removeItem("asc" + phone.val());
                storage.removeItem("asctime");
            }
            let mobile = phone.val();
            let userInfo = storage.getItem('ascToken');
            const obj = {
                "mobile": mobile,
                "smsCode": verification.val(),
                "smsToken": stoken,
                "countryCode":"+"+area.areaPhone.html().split('+')[1],
                "thirdParty":{
                    "type":userInfo.thirdPartyAccountType,
                    "id":userInfo.id,
                    "name":userInfo.name,
                    "facePicUrl":userInfo.facePicUrl


                    /*"facePicUrl":userInfo.picture.data.url*/
                }
            };
           /* if (!check.isMobile(mobile)) {
                UI.alertSecond('Phone number format error');
                return;
            }*/
            fblogSub(obj);
        });
        /*区域手机号*/
        area.areaPhone.on('click',function(){
            area.area.show();
            area.content.hide();
        });
        area.area.on('click','dd',function(){
            let country = $(this).attr('countryCode'),
                countryCode = $(this).attr('code');
            area.areaPhone.html(countryCode+" "+country);
            area.area.hide();
            area.content.show();
        });
        area.cancel.on('click',function(){
            area.area.hide();
            area.content.show();
        })
    }
    //下一步按钮高亮
    let nextHigh = () => {
        if (isHigh.phone && isHigh.verification) {
            next.children('a').removeClass('disabled');
        } else {
            next.children('a').addClass('disabled');
        }
    }
    //提交注册信息
    let fblogSub = (obj) => {
        ajax.post({
            url:'/api/user/thirdPartyAccountRegister',
            data: obj,
            success: (data) => {
                console.log(data);
                if (data.code === 200) {
                    UI.alertSecond('Associated success', function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    UI.alertSecond(data.message);
                }
            },
            error: () => {}
        })
    }
    bindEvents();
});