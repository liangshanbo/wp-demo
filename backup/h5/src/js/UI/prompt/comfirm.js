'use strict';

/*
    name:confirm.js
    description:提示框
    anthor:wanglonghai
    data:2016-10-26

 */
define("UI/prompt/confirm.js", function (require, exports, module) {
    var pcom = require('UI/prompt/prompt_com.js');

    var confirm = function () {
        var div = null;
        return function (text) {
            var callBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '提示';
            var btn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '确定';
            var btn1 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '取消';
            var cancelCallback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

            if (!div) {
                var html = '<div class="xin-mask">\n                                <div class="xin-dialog xin-dialog-tip">\n                                    <h3 class="xin-dialog-title">' + text + '</h3>\n                                    <div class="xin-dialog-btns">\n                                        <a href="javascript:void(0);" id="cancel">' + btn1 + '</a>\n                                        <a href="javascript:void(0);" id="confirm">' + btn + '</a>\n                                    </div>\n                                </div>\n                            </div>';
                div = pcom.addElement(html);

                pcom.addListener(pcom.one('#cancel'), 'click', function () {
                    pcom.hideBox(div_html);
                    cancelCallback && cancelCallback();
                });

                pcom.addListener(pcom.one('#confirm'), 'click', function () {
                    pcom.hideBox(div_html);
                    callBack && callBack();
                });
            }
            pcom.showBox(div);
        };
    }();

    module.exports = { confirm: confirm };
});
//# sourceMappingURL=../../src/maps/UI/prompt/comfirm.js.map
