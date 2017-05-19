"use strict"

/*
     name:alert.js
     description:确认订单密码输入  暂时不用
     anthor:huangyihai 
*/

define("UI/dialog/pwd_alert.js", function (require, exports, module) {
    let pcom = require('UI/dialog/dialog_com.js');

    let pwd_alert = function () {
        let box = null;
        return function (callback) {
            if (!box) {
                let html =  `<div class="m-dialog m-dialog-pay">
                <div class="dialog-tit">输入密码</div>
                <div class="dialog-ipt">
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                    <div>
                        <input type="text" placeholder="" class="ipt">
                    </div>
                </div>
                <div class="dialog-btn">
                    <a href="javascript:;" id="cancel">取消</a>
                    <a href="javascript:;" id="confirm">验证</a>
                </div>
            </div>`;
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
    module.exports = { pwd_alert };
});