'use strict';

/**
 * 搜索弹层
 * @author 黄奕海
 * @date 20170222
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/search/index.js">
 </script>
 */
define('conf/search/index.js', function (require, exports, module) {
    var $ = require('$'),
        ajax = require('utils/async/ajax.js');
    function init() {
        bindEvents();
    }

    function bindEvents() {}

    module.exports = { init: init };
});
//# sourceMappingURL=../src/maps/mods/layer.js.map
