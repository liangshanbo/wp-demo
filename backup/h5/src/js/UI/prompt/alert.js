'use strict';

/*
    name:alert.js
    description:普通的提示框
    anthor:wanglonghai

 */
define("UI/prompt/alert.js", function (require, exports, module) {
    var pcom = require('UI/prompt/prompt_com.js');

    var alerter = function () {
        var div = pcom.one('.xin-mask'),
            cover_bg = null;
        return function (str) {
            var btn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '确定';
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            if (!div) {
                if (!cover_bg) {
                    var html = '<div class="xin-dialog xin-dialog-tip xin-mask cover_bg"><h3 class="xin-dialog-title" style="border: none;">' + str + '</h3><div class="xin-dialog-btns"><a class="xin-btn-strech" id="remove_bg" href="javascript:void(0);">' + btn + '</a></div></div>';
                    cover_bg = pcom.addElement(html, 'xin-mask cover_bg');
                    pcom.addListener(cover_bg, 'click', function () {
                        pcom.hideBox(cover_bg);
                        callback && callback();
                    });
                }
            }
            pcom.showBox(cover_bg);
        };
    }();

    module.exports = { alerter: alerter };
});
//# sourceMappingURL=../../src/maps/UI/prompt/alert.js.map
