"use strict";

/*
     name:alert.js
     description:确认订单密码输入  暂时不用
     anthor:huangyihai 
*/

define("UI/dialog/pwd_alert.js", function (require, exports, module) {
    var pcom = require('UI/dialog/dialog_com.js');

    var pwd_alert = function () {
        var box = null;
        return function (callback) {
            if (!box) {
                var html = "<div class=\"m-dialog m-dialog-pay\">\n                <div class=\"dialog-tit\">\u8F93\u5165\u5BC6\u7801</div>\n                <div class=\"dialog-ipt\">\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                    <div>\n                        <input type=\"text\" placeholder=\"\" class=\"ipt\">\n                    </div>\n                </div>\n                <div class=\"dialog-btn\">\n                    <a href=\"javascript:;\" id=\"cancel\">\u53D6\u6D88</a>\n                    <a href=\"javascript:;\" id=\"confirm\">\u9A8C\u8BC1</a>\n                </div>\n            </div>";
                box = pcom.addElement(html, "m-mask-private", "pwd_alert");
            }
            pcom.addListener(pcom.one('#confirm'), 'click', function () {
                pcom.hideBox(box);
                callback && callback();
            });
            pcom.addListener(pcom.one('#cancel'), 'click', function () {
                pcom.hideBox(box);
            });
            pcom.showBox(box);
        };
    }();
    module.exports = { pwd_alert: pwd_alert };
});
//# sourceMappingURL=../../src/maps/UI/dialog/pwd_alert.js.map
