"use strict";

/*
    name:browser_model.js
    description:常用表单验证
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/input.js", function (require, exports, module) {

    //银行卡号
    var isCID = function isCID(cardNo) {
        return (/^(\d{16}|\d{19})$/.test(cardNo)
        );
    };
    //手机号码
    //let isMobile = mobile => /^1[3578][0-9]{9}$/.test(mobile);
    var isMobile = function isMobile(mobile) {
        return (/^[98]\d{9}$/.test(mobile)
        );
    };
    //电子邮箱
    var isEmail = function isEmail(email) {
        return (/w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email)
        );
    };
    //校验密码
    var password = function password(pwd) {
        return (/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(pwd)
        );
    };
    //身份证号
    var isCertificate = function isCertificate(certificate) {
        return (/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(certificate)
        );
    };

    module.exports = { isCID: isCID, isEmail: isEmail, isMobile: isMobile, isCertificate: isCertificate, password: password };
});
//# sourceMappingURL=../../../maps/mods/check/input.js.map
