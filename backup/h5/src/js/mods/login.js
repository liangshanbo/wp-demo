'use strict';

/**
 * 登录跳转
 * @author wanglonghai
 * @date 20160221
 * 类型判断
 */
define('mods/login', function (require, exports, module) {

	var ajax = require('utils/async/ajax');

	var Login = {
		//type  目前只用于 商品详情未登录直接购买和收藏
		login: function login(pathname, type) {
			if (typeof pathname === 'undefined') {
				var url = location.pathname + location.search;
				location.assign('/login?redirect=' + encodeURIComponent(url));
			} else if (typeof pathname === 'boolen') {
				location.assign('/login');
			} else {
				location.assign('/login?redirect=' + encodeURIComponent(pathname) + type);
			}
		},
		isLogin: function isLogin(_success, pathname, type) {
			ajax.query({
				url: '/internal/login',
				success: function success(data) {
					if (typeof data === 'boolean' && data === false) {
						Login.login(pathname, type);
					} else {
						_success && _success(data);
					}
				}
			});
		}
	};

	module.exports = Login;
});
//# sourceMappingURL=../../maps/mods/login.js.map
