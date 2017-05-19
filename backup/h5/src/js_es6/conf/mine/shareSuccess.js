define('conf/mine/shareSuccess.js', function (require, exports, module) {
    require("$");
    let laz = require('utils/async/lazyload.js'),
        getParams = require('mods/getParams'),
        BP = require('mods/buried_point.js');
    let params = getParams();
    let back = $('.header-back-to');
    BP.init({
        dom:"#goodsList",
        pdPos:"",
        pType:"1"
    });//商品list曝光
    back.on('click', function () {
        if (params && params.backUrl) {
            location.replace(decodeURIComponent(params.backUrl));
        } else {
            location.replace('/');
        }
    })
    //console.log(decodeURIComponent(params.itemId))
})