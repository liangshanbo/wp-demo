"use strict";

/*
    name:cookie_model.js
    description:本地存储cookie
    anthor:luoxiaowei
    data:2016-11-04
 */

define("mods/storage/cookie.js", function (require, exports, module) {

	var setCookie = function setCookie(name, value, expiresHours) {
		var cookieString = name + "=" + escape(value);
		//判断是否设置过期时间
		if (expiresHours > 0) {
			var date = new Date();
			date.setTime(date.getTime() + expiresHours * 3600 * 24 * 1000);
			cookieString = cookieString + ";expires=" + date.toGMTString() + ";path=/";
		}
		document.cookie = cookieString + ";path=/";
	};

	var getCookie = function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr !== null) {
			return unescape(arr[2]);
		}
		return "";
	};

	var removeCookie = function removeCookie(name) {
		var date = new Date().getTime() - 1;
		document.cookie = name + "=" + escape(getCookie(name)) + ";expires=" + new Date(date).toUTCString();
	};

	module.exports = {
		setCookie: setCookie,
		getCookie: getCookie,
		removeCookie: removeCookie
	};
});
//# sourceMappingURL=../../../maps/mods/storage/cookie.js.map
