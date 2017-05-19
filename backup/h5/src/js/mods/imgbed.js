/**
 * [description] 图床/缩略图
 * @author wangchunpeng 2016-06-12T11:39:43+0800
 */
define('mods/imgbed', function(require, exports, module) {
    var Vue = require("vue");

    function _url_online(url, postfix) {
        if (!url) {
            return "";
        }
        if (url.indexOf("atguat.net.cn") > 0) { //处理国美在线的图片
            var href = location.href,
                reg_zx0 = /dev|pre/gi;
            if (reg_zx0.test(href)) {
                href = "https://i-pre.meixincdn.com"
            } else {
                href = "https://i.meixincdn.com";
            }
            var reg_zx1 = /^(.*?)img(.*?)atguat\.net\.cn\/image/gi,
                res_zx1 = url.match(reg_zx1);
            if (res_zx1 && res_zx1.length) {
                url = url.replace(res_zx1[0], href + "/gi");
            }
            var reg_zx2 = /^(.*?)gfs(.*?)atguat\.net\.cn/gi,
                res_zx2 = url.match(reg_zx2);
            if (res_zx2 && res_zx2.length) {
                url = url.replace(res_zx2[0], href + "/g");
            }
            return postfix ? url + "." + postfix + ".jpg" : url;
        }
        return _url(url, postfix);
    }

    function _url(url, postfix) {
        if(!url){
            return "";
        }
        // 只处理美信自己域名的图片，其他的不做处理
        if (url.indexOf("meixincdn.com") < 0 && url.indexOf("gomeplus") < 0) {
            return url;
        }
        if (url && postfix) {
            return url + "." + postfix + ".jpg";
        }
        return url;
    }

    module.exports = {
        url: function(url, postfix) {
            return _url(url, postfix);
        },
        url_online: function(url, postfix) { //专门处理在线域名的图片缩略图
            return _url_online(url, postfix);
        },
        url_vue: function() {
            Vue.filter("imgbed", function(url, postfix) {
                return _url(url, postfix)
            });
        }
    }
});