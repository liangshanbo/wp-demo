'use strict';

/**
 * 搜索历史
 * @author 黄奕海
 * @date 20170222
 *
 */
define('mods/search/history.js', function (require, exports, module) {
    var storage = require('mods/storage/storage.js');
    function getH() {
        var arr = storage.getItem('s_his');
        if (arr && arr.length) {
            return storage.getItem('s_his').reverse();
        }
        return [];
    };
    function setH(val) {
        var arr = storage.getItem("s_his") ? storage.getItem("s_his") : [],
            idx = $.inArray(val, arr);
        idx >= 0 ? arr.splice(idx, 1) : "";
        if (arr.length >= 10) {
            arr.splice(0, 1);
        }
        arr.push(val);
        storage.setItem('s_his', arr);
    };
    function rmH() {
        storage.removeItem('s_his');
    }

    module.exports = { getH: getH, setH: setH, rmH: rmH };
});
//# sourceMappingURL=../../../maps/mods/search/history.js.map
