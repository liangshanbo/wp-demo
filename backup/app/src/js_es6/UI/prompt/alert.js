/*
    name:alert.js
    description:普通的提示框
    anthor:wanglonghai

 */
define("UI/prompt/alert.js", function(require, exports, module) {
    let pcom = require('UI/prompt/prompt_com.js');

    let alerter = function () {
            let div = pcom.one('.xin-mask'),cover_bg = null;
            return function(str, btn = '确定', callback = undefined){
                if (!div) {
                    if(!cover_bg){
                    	let html = `<div class="xin-dialog xin-dialog-tip xin-mask cover_bg"><h3 class="xin-dialog-title" style="border: none;">${str}</h3><div class="xin-dialog-btns"><a class="xin-btn-strech" id="remove_bg" href="javascript:void(0);">${btn}</a></div></div>`;
                        cover_bg = pcom.addElement(html,'xin-mask cover_bg');
                        pcom.addListener(cover_bg,'click',() => {
                            pcom.hideBox(cover_bg);
                            callback && callback();
                        });
                    }
                }
                pcom.showBox(cover_bg);
            }
        }()

        module.exports = {alerter};
});
