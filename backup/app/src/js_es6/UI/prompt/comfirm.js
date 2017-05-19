/*
    name:confirm.js
    description:提示框
    anthor:wanglonghai
    data:2016-10-26

 */
define("UI/prompt/confirm.js", function (require, exports, module) {
    let pcom = require('UI/prompt/prompt_com.js');

    let confirm = function() {
        let div = null;
        return function(text, callBack = false,title = '提示',  btn = '确定', btn1 = '取消', cancelCallback = false){
            if(!div){
                let html = `<div class="xin-mask">
                                <div class="xin-dialog xin-dialog-tip">
                                    <h3 class="xin-dialog-title">${text}</h3>
                                    <div class="xin-dialog-btns">
                                        <a href="javascript:void(0);" id="cancel">${btn1}</a>
                                        <a href="javascript:void(0);" id="confirm">${btn}</a>
                                    </div>
                                </div>
                            </div>`;
                div = pcom.addElement(html);

                pcom.addListener(pcom.one('#cancel'),'click',() => {
                    pcom.hideBox(div_html);
                    cancelCallback && cancelCallback();
                });

                pcom.addListener(pcom.one('#confirm'),'click',() => {
                    pcom.hideBox(div_html);
                    callBack && callBack();
                });
            }                           
            pcom.showBox(div);
        }
    }();

    module.exports = { confirm };
});