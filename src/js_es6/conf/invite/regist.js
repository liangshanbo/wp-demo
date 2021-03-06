/**
 * 邀请好友
 * @author wangming
 * @date 20170314
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/invite/regist.js">
 </script>
 */
define('conf/invite/regist.js', function (require, exports, module) {
    const $ = require('$'),
        Vue = require("vue"),
        ajax = require('utils/async/ajax.js'),
        check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert'),
        sendVerification = require('mods/send_verification'),
        storage = require('mods/storage/storage.js');
    require('mods/country_area.js');       
    new Vue({
        el: "body",
        data: {
            phone: getParams(location.search).phone ? true : false,
            verification: false,
            agree: true,
            stoken: "",
            timer: "",
            isShow: false
        },
        init: function() {
            let phone = getParams(location.search).phone;
            let _this = this,
                code = storage.getItem('code' + phone),
                countryCode = storage.getItem('countryCode' + phone);
            if(phone && phone >= 7) {
                $("#username").val(phone);
                $("#send").addClass('verification-active');
                if(code) {
                    if(code != "undefined") {
                        this.code = storage.getItem('code' + phone);
                        this.countryCode = storage.getItem('countryCode' + phone);
                        $("#countryNum").html(this.code +" " + this.countryCode);
                    } else {
                        $("#countryNum").html("IN +91");
                    }
                }
                
            }
            $("#area_cancel").click(function(){
                _this.isShow = false;
                $("#area").hide();
                $("#regist").show();
            });
            $(".country").on("click", "dd", function() {
                _this.code = $(this).attr("code");
                _this.countryCode = $(this).attr("countrycode");
                $("#countryNum").html(_this.code +" " + _this.countryCode);
                _this.isShow = false;
                $("#area").hide();
                $("#regist").show();
                $('#country').find('dt').removeClass('fixed');
            });
        },
        methods: {
            hideTS: function (dom) {
                let $this = $(dom.currentTarget);
                $this.attr("placeholder", "");
            },
            showTS: function (dom, type) { // type: 1、手机号   2、验证码
                let $this = $(dom.currentTarget);
                if(type === 1) {
                    $this.attr("placeholder", "Mobile No");
                } else {
                    $this.attr("placeholder", "SMS verification code");
                }
            },
            countryList: function() {
                if(this.isShow) {
                    $("#area").hide();
                    $("#regist").show();
                } else {
                    $("#area").show();
                    $("#regist").hide();
                }
                this.show = !this.show;
            },
            isNext: function(dom, type) {
                let $this = $(dom.currentTarget),
                    val = $this.val(),
                    send = $("#send");
                if(type === 1) {
                    if(val.length >= 7) {
                        this.phone = true;
                        if(send.html() == "SEND") {
                            send.addClass('verification-active');
                        }
                    } else {
                        this.phone =  false;
                        send.removeClass('verification-active');
                    }
                } else {
                    this.verification = val.length >= 6 ? true : false;
                }
                this._nextHigh();
            },
            isAgree: function(dom) {
                let $this = $(dom.currentTarget);
                if($this.hasClass("register-agreement-active")) {
                    $this.removeClass("register-agreement-active");
                    this.agree = true;
                } else {
                    $this.addClass("register-agreement-active");
                    this.agree = false;
                }
                this._nextHigh();
            },
            getCode: function(dom) {
                const phone = $("#username").val(),
                    obj = {
                        "countryCode" : this.countryCode ? this.countryCode : "+91",
                        "mobile" : phone,
                        "type" : "INVITE_REGISTER"
                    },
                    $this = $(dom.currentTarget),
                    _this = this;
                if (!$this.hasClass('verification-active')) {
                    return;
                }
                $this.removeClass('verification-active');
                sendVerification.checkPhone({
                    dom:$("#send"),
                    params:obj,
                    type:1,
                    callback:function(token){
                        _this.stoken = token;//获取手机验证码token;
                        storage.setItem("inv"+phone,token);//register stoken
                        storage.setItem("invtime",new Date()*1);//register time
                    }
                });
                /*ajax.post({
                    url: '/api/user/sms',
                    data: obj,
                    success: function (data) {
                        let code = data.code,
                            token = data.data.smsToken;
                        if (code === 200) {
                           
                        } else {
                            $this.addClass('verification-active');
                            UI.alertSecond(data.message);
                        }
                    },
                    error: function (data) {

                    }
                })*/
            },
            nextStep: function(dom) {
                //埋点
             
                ga('send', 'event', 'login/sign', 'invite_sign_next_btn_click');
                let $this = $(dom.currentTarget),
                    phone = $("#username").val(),
                    verification = $("#verification").val(),
                    params = getParams(location.search),
                    source = params.source,
                    _this = this,
                    invitationCode = params.invitationCode;
                if($this.hasClass("disabled")) {
                    return;
                }
                if(new Date() * 1 - storage.getItem('invtime') <= 600000 && storage.getItem('inv'+phone)){
                    this.stoken = storage.getItem('inv'+phone);
                } else {
                    storage.removeItem("inv"+phone);
                    storage.removeItem("invtime");
                }
                let obj = {
                    countryCode : this.countryCode ? this.countryCode : "+91",
                    mobile: phone,
                    smsCode: verification,
                    smsToken: this.stoken
                };
                ajax.put({
                    url: '/api/user/sms',
                    data: obj,
                    success: function (data) {
                        let code = data.code,
                            token = data.data.smsToken;
                        if (code === 200) {
                            storage.setItem('invitetime', new Date() * 1);
                            storage.setItem('invitesst', token);
                            if(_this.code) {
                                storage.setItem('code' + phone, _this.code);
                                storage.setItem('countryCode' + phone, _this.countryCode);
                            }
                            location.href = "/invite/setPassword?invitationCode=" + invitationCode + "&phone=" + phone + "&source=" + source;
                        } else {
                            UI.alertSecond(data.message);
                        }
                    },
                    error: function (data) {

                    }
                })
            },
            _nextHigh: function() {
                if(this.phone && this.verification &&  this.agree) {
                    $('#register').removeClass("disabled");
                } else {
                    $('#register').addClass("disabled");
                }
            },
            /*_countDown: function(dom, time) {
                let times = time,
                    _this = this;
                dom.html(times + "s");
                _this.timer = setInterval(function () {
                    times--;
                    dom.html(times + "s");
                    if (times <= 0) {
                        _this.clearTimer();
                        dom.html("Send");
                        dom.addClass('verification-active');
                        times = time;
                    }
                }, 1000)
            },
            clearTimer: function(){
                let _this = this;
                clearInterval(_this.timer);
            }*/
        }
    });

    function getParams(url) {
        let obj = {};
        url = url || location.search;
        url = decodeURI(url);
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        let arr = url.split("&");
        for (let i = 0, l = arr.length; i < l; i++) {
            let res = arr[i].split("=");
            obj[res[0]] = res[1]
        }
        return obj;
    }

});
