'use strict';
/**
 * facebook 第三方登录/注册
 * @author lixuefeng
 * @date 20170228
 * 页面引用
 * <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/login/fbLog.js">
 </script>
*/

define('conf/login/fbLog.js', function (require, exports, module) {
	require('$');
	var check = require('mods/check/input.js'),
	    ajax = require('utils/async/ajax.js'),
	    storage = require('mods/storage/storage'),
	    fbLog = $('[data-node=fbLog]');

	fbLog.on('click', 'a', function () {
		//埋点

		ga('send', 'event', 'login/sign', 'login_fb_btn_click');
		FB.getLoginStatus(checkLoginStatus);
	});

	var checkLoginStatus = function checkLoginStatus(response) {
		if (response.status !== "connected") {
			//拉取facebook登录页面
			FB.login(function (response) {
				if (!response.authResponse) {
					//用户是否取消操作
					return;
				}
				var userInfo = {
					id: response.authResponse.userID,
					thirdPartyAccountType: "FACEBOOK",
					thirdPartyAccessToken: response.authResponse.accessToken
				};
				var accessToken = response.authResponse.accessToken;
				//获取用户信息
				FB.api('/me', { fields: 'name,cover,picture,email' }, function (response) {
					storage.setItem('ascUserInfo', response);
					checkBound(userInfo);
				});
			}, { scope: "user_friends,email,public_profile" });
		} else {
			(function () {
				var userInfo = {
					id: response.authResponse.userID,
					thirdPartyAccountType: "FACEBOOK",
					thirdPartyAccessToken: response.authResponse.accessToken
				};
				FB.api('/me', { fields: 'name,cover,picture,email' }, function (response) {
					storage.setItem('ascUserInfo', response);
					checkBound(userInfo);
				});
			})();
		}
	};

	var checkBound = function checkBound(userInfo) {
		var _url = '/api/user/thirdPartyAccountLogin?id=' + userInfo.id + '&thirdPartyAccessToken=' + userInfo.thirdPartyAccessToken + '&thirdPartyAccountType=' + userInfo.thirdPartyAccountType;
		ajax.query({
			url: _url,
			success: function success(data) {
				if (data.code === 200) {
					if (data.data.isBound) {
						//第三方登录
						location.replace('/');
					} else {
						//第三方注册
						storage.setItem('ascToken', userInfo);
						location.assign('/login/associated');
					}
				} else {}
			},
			error: function error() {}
		});
	};
});
//# sourceMappingURL=../../../maps/conf/login/fbLog.js.map
