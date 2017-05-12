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
	require("$")
    const ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        storage = require('mods/storage/storage.js'),
        check = require('mods/check/input.js'),
        UI = require('UI/dialog/alert.js');

    new Vue({
    	el: "body",
    	data: {
    		password: false
    	},
    	init: function(){
    		let phone = getParams(location.search).phone;
    		if(phone) {
                $("#username").val(phone.substr(0,3) + "****" + phone.substr(7));
            }
    	},
    	methods: {
    		hideTS: function(dom) {
    			let $this = $(dom.currentTarget);
    			$this.attr("placeholder", "");
    		},
    		showTS: function(dom) {
    			let $this = $(dom.currentTarget);
    			$this.attr("placeholder", "New  Password");
    		},
    		isNext: function(dom) {
    			let $this = $(dom.currentTarget),
    				val = $this.val();
    			$this.val(val.replace(/[<> \&]/g,""));
    			if(val.length >= 6) {
    				this.password = true;
    			} else {
    				this.password = false;
    			}
    			this._nextHigh();
    		},
            nextStep: function(dom) {
            	const pwd = $("#password").val(),
                    params = getParams(location.search),
            		phone = params.phone,
            		invitationCode = params.invitationCode,
            		$this = $(dom.currentTarget);
            	let stoken, obj = {}, source = params.source;
                 //埋点
                ga('send', 'event', 'login/sign', 'invite_sign_finish_btn_click');
            	if(new Date() * 1 - storage.getItem('invitetime') <= 600000){
		            stoken = storage.getItem('invitesst');
		        }else{
		            storage.removeItem("invitesst");
		            storage.removeItem("invitetime");
        		}
            	if($this.hasClass("disabled")) {
                    return;
                }
                if(!check.password(pwd)){
		            UI.alertSecond('Please enter a password with 6 to 20 digits, including letters, digitals or symbols.');
		            return;
		        }
                if(source) {
                    if(source == "FB") {
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
                if(invitationCode != "undefined") {
                    obj.refereeUserId = invitationCode;
                }
		        ajax.post({
                    url: '/api/user/register',
                    data: obj,
                    success: function (data) {
                        let code = data.code;
                        if (code === 200) {
                            UI.alertSecond("SIGN UP success",function(){
		                        storage.removeItem("rst"+phone);
		                        storage.removeItem("rsttime");
		                        location.assign('/');
		                    },500);
                        } else {
                            UI.alertSecond(data.message);
                        }
                    },
                    error: function (data) {

                    }
                })
            },
            goback: function() {
            	let params = getParams(location.search),
                    phone = params.phone,
                    invitationCode = params.invitationCode,
                    source = params.source;
            	location.href = "/invite/regist?phone=" + phone + "&invitationCode=" + invitationCode + "&source=" + source;
            },
            _nextHigh: function() {
                if(this.password) {
                    $('#register').removeClass("disabled");
                } else {
                    $('#register').addClass("disabled");
                }
            }
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