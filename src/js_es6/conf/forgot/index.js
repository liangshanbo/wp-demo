/**
 * 忘记密码脚本
 * @author 黄奕海
 * @date 20170220
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/forgot/index.js">
 </script>
 */
define('conf/forgot/index.js',function(require,exports,module) {
    const check=require('mods/check/input.js'),
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
        isHigh = {phone:false,verification:false},
        stoken;
    let area = {
        areaPhone:$('#forgot_area'),
        area:$('#area'),
        content:$('#content'),
        cancel:$('#area_cancel')
    };
    init();
    function init(){
        bindEvents();
    }
    function bindEvents(){
        document.getElementById('username').addEventListener('input', function(event) {
            let val = phone.val();
            if(val.length >= 7){
                if(send.html() == "SEND"){
                    send.addClass('verification-active');
                }
                isHigh.phone = true;
            }else{
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
            if(val.length>=6){
                isHigh.verification = true;
            }else{
                isHigh.verification = false;
            }
            if(val === ""){//苹果手机删除问题
                setTimeout(function(){
                    verification.val("")
                },50)
            }
            nextHigh();
        }, false);
        send.on('click', function () {
            const obj = {
                "mobile" : phone.val(),
                "type" : "FINDPWD",
                "countryCode": "+"+area.areaPhone.html().split('+')[1]
            };
            if (!send.hasClass('verification-active')) {
                return;
            }
            /*if(!check.isMobile(phone.val())){
                UI.alertSecond('Phone number format error');
                return;
            }*/
            send.removeClass('verification-active');
            sendVerification.checkPhone({
                dom:send,
                params:obj,
                callback:function(token){
                    stoken = token;
                    storage.setItem("fst"+phone.val(),token);//forgot stoken
                    storage.setItem("fsttime",new Date()*1);//forgot time
                }
            });
        });
        next.on('click',function(){
            if(new Date() * 1 - storage.getItem('fsttime') <= 600000 && storage.getItem('fst'+phone.val())){
                stoken = storage.getItem("fst"+phone.val());
            }else{
                storage.removeItem("fst"+phone.val());
                storage.removeItem("fsttime");
            }
            var mobile = phone.val();
            const obj = {
                smsCode : verification.val(),
                smsToken : stoken,
                mobile : mobile,
                countryCode: "+"+area.areaPhone.html().split('+')[1]
            };
            if(next.children('a').hasClass('disabled')){
                return ;
            }
          /*  if (!check.isMobile(mobile)) {
                UI.alertSecond('Phone number format error');
                return;
            }*/
            checkVerification(obj);
        })
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
            $('#country').find('dt').removeClass('fixed');
        });
        area.cancel.on('click',function(){
            area.area.hide();
            area.content.show();
        })
    }
    //下一步按钮高亮
    function nextHigh(){
        if(isHigh.phone && isHigh.verification){
            next.children('a').removeClass('disabled');
        }else{
            next.children('a').addClass('disabled');
        }
    }
    //校验手机验证码是否正确
    function checkVerification(obj){
        ajax.put({
            url:'/api/user/sms',
            data:obj,
            success:function(data){
                if(data.code === 200){
                    storage.setItem('fphone',phone.val());
                    storage.setItem('sst',data.data.smsToken); //setpwd token;
                    storage.setItem('ssttime',new Date() * 1); //setpwd time;
                    storage.setItem("area",area.areaPhone.html());
                    location.assign('/forgot/setpwd');
                }else{
                    UI.alertSecond(data.message);
                }
            },
            error:function(){

            }
        })
    }
});
