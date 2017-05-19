"use strict";

/**
 * @title: 登录的公共处理
 * @time:  2017-03-04
 * @author: wangchunpeng
 * 参数：callback             [必填] 
 *       errback： 失败的回调 [选填]
 */
define("mods/login/index", function (require, exports, module) {
    var appInterface = require("utils/appInterface");
    var Cookie = require("mods/storage/cookie");
    /**
     * @title:判断是否是登录状态：1.不是去登录，拿到数据 2.是，直接拿到数据
     */
    var login = function login(callback, errback) {
        getLoginStatus(function (data) {
            if (data.code === 200) {
                callback(data);
            } else {
                gotoLogin(callback, errback);
            }
        });
    };

    /**
     * @title: 获取用户是否是登录状态
     */
    var getLoginStatus = function getLoginStatus(callback) {
        var errback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        appInterface.call("/common/getLoginStatus", function (data) {
            if (data.code === 200) {
                saveLogin(data.data);
                callback(data);
            } else {
                rmLogin();
                errback(data);
            }
        });
    };

    /**
     * @title: 直接去登录，不判断
     */
    var gotoLogin = function gotoLogin(callback) {
        var errback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        appInterface.call("/common/login", function (data) {
            if (data.code == 200) {
                saveLogin(data.data);
                callback(data);
            } else {
                rmLogin();
                errback();
            }
        });
    };

    /**
     * @title: 将userId计入cookie
     * data: {id,loginToken}
     * user cookie都是记录一个小时
     */
    var saveLogin = function saveLogin(data) {
        Cookie.setCookie("gomeplus-userid", data.id, 1);
        Cookie.setCookie("gomeplus-usertoken", data.loginToken, 1);
        Cookie.setCookie("gomeplus-deviceid", data.device_id, 1);
    };

    /**
     * @title: 删除cookie的登录用户信息
     */
    var rmLogin = function rmLogin() {
        Cookie.removeCookie("gomeplus-userid");
        Cookie.removeCookie("gomeplus-usertoken");
        Cookie.removeCookie("gomeplus-deviceid");
    };

    module.exports = {
        login: login,
        gotoLogin: gotoLogin,
        saveLogin: saveLogin,
        getLoginStatus: getLoginStatus
    };
});
//# sourceMappingURL=../../src/maps/mods/login/index.js.map
