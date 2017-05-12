/*
    name:cookie_model.js
    description:本地存储cookie
    anthor:luoxiaowei
    data:2016-11-04
 */

define("mods/storage/cookie.js", function(require, exports, module) {

	let setCookie = (name, value, expiresHours) => {
		let cookieString = name + "=" + escape(value);
		//判断是否设置过期时间
		if (expiresHours > 0) {
			let date = new Date();
			date.setTime(date.getTime() + expiresHours * 3600 * 24 * 1000);
			cookieString = cookieString + ";expires=" + date.toGMTString() + ";path=/";
		}
		document.cookie = cookieString + ";path=/";
	};

	let getCookie = (name) => {
		let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr !== null) {
			return unescape(arr[2]);
		}
		return "";
	};

	let removeCookie = (name) => {
		let date = new Date().getTime() - 1;
		document.cookie = name + "=" + escape(getCookie(name)) + ";expires=" + new Date(date).toUTCString();
	};

	module.exports = {
		setCookie,
		getCookie,
		removeCookie
	};
})