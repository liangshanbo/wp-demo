/*
    name:browser_model.js
    description:常用表单验证
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/input.js", function(require, exports, module) {
    
    //银行卡号
    let isCID = cardNo => /^(\d{16}|\d{19})$/.test(cardNo);
    //手机号码
    let isMobile = mobile => /^1[3578][0-9]{9}$/.test(mobile);
    //电子邮箱
    let isEmail = email => /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
    //身份证号
    let isCertificate = certificate => /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(certificate); 

    module.exports = {isCID,isEmail,isMobile,isCertificate};
});

