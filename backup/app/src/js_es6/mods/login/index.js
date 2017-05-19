/**
 * @title: 登录的公共处理
 * @time:  2017-03-04
 * @author: wangchunpeng
 * 参数：callback             [必填] 
 *       errback： 失败的回调 [选填]
 */
define("mods/login/index", function(require, exports, module) {
    let appInterface = require("utils/appInterface");
    let Cookie = require("mods/storage/cookie");
    /**
     * @title:判断是否是登录状态：1.不是去登录，拿到数据 2.是，直接拿到数据
     */
    let login = (callback, errback) => {
        getLoginStatus(function(data) {
            if (data.code === 200) {
                callback(data);
            } else {
                gotoLogin(callback, errback);
            }
        });
    }

    /**
     * @title: 获取用户是否是登录状态
     */
    let getLoginStatus = (callback, errback = function() {}) => {
        appInterface.call("/common/getLoginStatus", function(data) {
            if (data.code === 200) {
                saveLogin(data.data);
                callback(data);
            } else {
                rmLogin();
                errback(data);
            }
        });
    }

    /**
     * @title: 直接去登录，不判断
     */
    let gotoLogin = (callback, errback = function() {}) => {
        appInterface.call("/common/login", function(data) {
            if (data.code == 200) {
                saveLogin(data.data);
                callback(data);
            } else {
                rmLogin();
                errback();
            }
        });
    }

    /**
     * @title: 将userId计入cookie
     * data: {id,loginToken}
     * user cookie都是记录一个小时
     */
    let saveLogin = (data) => {
        Cookie.setCookie("gomeplus-userid", data.id, 1);
        Cookie.setCookie("gomeplus-usertoken", data.loginToken, 1);
        Cookie.setCookie("gomeplus-deviceid", data.device_id, 1);
    }

    /**
     * @title: 删除cookie的登录用户信息
     */
    let rmLogin = () => {
        Cookie.removeCookie("gomeplus-userid");
        Cookie.removeCookie("gomeplus-usertoken");
        Cookie.removeCookie("gomeplus-deviceid");
    }

    module.exports = {
        login,
        gotoLogin,
        saveLogin,
        getLoginStatus
    }
});
