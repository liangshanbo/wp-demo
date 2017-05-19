/**
 * 登录跳转
 * @author wanglonghai
 * @date 20160221
 * 类型判断
 */
define('mods/login', function(require, exports, module) {

	const ajax = require('utils/async/ajax');

	const Login = {
		//type  目前只用于 商品详情未登录直接购买和收藏
		login(pathname,type) {
			if (typeof pathname === 'undefined') {
				let url = location.pathname + location.search;
				location.assign('/login?redirect=' + encodeURIComponent(url));
			} else if (typeof pathname === 'boolen') {
				location.assign('/login');
			} else {
				location.assign('/login?redirect=' + encodeURIComponent(pathname) + type);
			}
		},
		isLogin(success, pathname,type) {
			ajax.query({
				url: '/internal/login',
				success: data => {
					if (typeof data === 'boolean' && data === false) {
						Login.login(pathname,type);
					} else {
						success && success(data);
					}
				}
			});
		}
	};

	module.exports = Login;
});