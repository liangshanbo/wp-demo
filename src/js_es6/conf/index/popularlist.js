/**
 * 商品分类
 * @author guodanying
 * @date 20170310
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/goods/catedetail.js">
 </script>
 */

define('conf/index/popularlist.js', function (require, exports, module) {
    require("$");
    let Vue = require("vue"),
        laz = require('utils/async/lazyload.js'),
        BP =  require('mods/buried_point.js');
    BP.init({
        dom:".goods-list",
        pdPos:"2",
        pType:"0"
    });//商品list曝光
    Vue.filter('buy',function(url){
        var search = /\?/.test(url);
        if(userId!=="0"){
            return url + (search ? "&":"?")+"affExtParam1="+userId;
        }
        return "/login?redirect="+encodeURIComponent(url)+"&type=buy";
    });
});