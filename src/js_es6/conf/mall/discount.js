/**
 * mall列表 折扣专区
 * @author huangyihai
 * @date 20170216
 * 页面引用 入口在首页
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mall/discount.js">
 </script>
 */
define('conf/mall/discount.js', function (require, exports, module) {
    const vue = require('conf/mall/cashback.js');
    vue.type = 1;
    vue.pType = "7";
});
