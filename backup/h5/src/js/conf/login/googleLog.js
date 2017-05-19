'use strict';
/**
 * googl+ 第三方登录/注册
 * @author guodanying
 * @date 20170220
 * 页面引用
 * <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/login/googleLog.js">
 </script>
*/

define('conf/login/googleLog.js', function (require, exports, module) {
	require('$');
	var check = require('mods/check/input.js'),
	    storage = require('mods/storage/storage'),
	    UI = require('UI/dialog/alert.js'),
	    ajax = require('utils/async/ajax.js');
	gapi.load('auth2', function () {
		var auth2 = gapi.auth2.init({
			client_id: '114362993453-5duccv5c6m0q3agfnassl0gsmpd673ng.apps.googleusercontent.com',
			scope: 'profile'
			// Scopes to request in addition to 'profile' and 'email'
			//scope: 'additional_scope'
		});
		$('#signinButton').click(function () {
			/*console.log(auth2.isSignedIn.get())*/
			//埋点

			ga('send', 'event', 'login/sign', 'login_google_btn_click');
			if (auth2.isSignedIn.get()) {
				signIn();
			} else {
				auth2.grantOfflineAccess().then(signInCallback);
			};
		});
		function signInCallback(authResult) {
			auth2.isSignedIn.listen(function () {
				signIn();
			});
		};
		function signIn() {
			var profile = auth2.currentUser.get().w3;
			console.log(profile);
			var userInfo = {
				id: profile.Eea,
				thirdPartyAccountType: "GOOGLE",
				thirdPartyAccessToken: auth2.currentUser.get().getAuthResponse().id_token,
				name: profile.ig,
				facePicUrl: profile.Paa
			};
			var _url = '/api/user/thirdPartyAccountLogin?id=' + userInfo.id + '&thirdPartyAccessToken=' + userInfo.thirdPartyAccessToken + '&thirdPartyAccountType=' + userInfo.thirdPartyAccountType;
			ajax.query({
				url: _url,
				success: function success(data) {
					if (data.code === 200) {
						if (data.data.isBound) {
							//第三方登录
							storage.setItem('ascToken', userInfo);
							location.replace('/');
						} else {
							//第三方注册
							storage.setItem('ascToken', userInfo);
							location.assign('/login/associated');
						}
					} else {
						UI.alertSecond(data.message);
						return false;
					}
				},
				error: function error(data) {
					UI.alertSecond(data.message);
					return false;
				}
			});
		}
	});
	// gapi.load('auth2', function() {
	//        // window.auth2 = gapi.auth2.init({
	//        //   client_id: '114362993453-5duccv5c6m0q3agfnassl0gsmpd673ng.apps.googleusercontent.com',
	//        //   scope: 'profile'
	//        //   // Scopes to request in addition to 'profile' and 'email'
	//        //   //scope: 'additional_scope'
	//        // });
	//        var auth2 = gapi.auth2.getAuthInstance();
	//        console.log(gapi.auth2);
	//        console.log(auth2);

	//    });
});
//# sourceMappingURL=../../../maps/conf/login/googleLog.js.map
