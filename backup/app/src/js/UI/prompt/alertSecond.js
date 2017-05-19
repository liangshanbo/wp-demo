'use strict';

/*
    name:alertSecond.js
    description:提示框
    anthor:wanglonghai
    data:2016-10-26
 */
define("UI/prompt/alertSecond.js", function (require, exports, module) {
    var pcom = require('UI/prompt/prompt_com.js');

    var alertSecond = function () {
        var div = null,
            display = false;
        return function (str) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

            if (display) {
                return false;
            }
            if (!div) {
                div = pcom.addElement(str, '', 'alertSecond');
            }
            display = true;
            pcom.showBox(div);
            timer(function () {
                pcom.hideBox(div);
                display = false;
            }, duration);
        };
    }();

    function timer(fn, duration) {
        setTimeout(fn, duration);
    }

    module.exports = { alertSecond: alertSecond };
});
//# sourceMappingURL=../../src/maps/UI/prompt/alertSecond.js.map
