'use strict';

/*
 * @date 20170410
 * 页面引用
 * 公共过滤器
 </script>
 */

define('mods/filters/com.js', function (require, exports, module) {
    var Vue = require('vue');
    var cookie = require('mods/storage/cookie.js');

    Vue.filter('imgbed', function (url, size) {
        if (typeof url === 'string' && /\.(jpg|png|gif)$/i.test(url)) {
            var res = url.match(/(.*)(\.(jpg|png|gif))/);
            return res && Array.isArray(res) ? res[0] + (size ? '.' + size : '') + res[2] : url;
        } else {
            return url;
        }
    });

    Vue.filter('money', function (price, size) {
        if (isNaN(price)) {
            return price;
        }
        return size ? Math.round(price / 100).toFixed(size) : Math.round(price / 100);
    });

    Vue.filter('price', function (price) {
        return price + '. ';
        // return '&#8377; ';
    });

    Vue.filter('time', function (time, separator) {
        var date = time ? new Date(time) : new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        var minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        var second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        var dateStr = '';
        if (separator) {
            dateStr += day + separator + month + separator + year;
        } else {
            dateStr += day + '/' + month + '/' + year;
        }
        return dateStr;
    });
    Vue.filter("buy", function (outerUrl, name) {
        var search = /\?/.test(outerUrl),
            third = cookie.getCookie('third_layer'); //arr[0] userId  arr[1] cookie
        if (userId !== "0") {
            if (third === "") {
                return "/pro/third?name=" + name + "&loc=" + encodeURIComponent(outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId);
            } else {
                return outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId;
            }
        }
        return "/login?redirect=" + encodeURIComponent("/pro/third?name=" + name + "&loc=" + outerUrl + (search ? "&" : "?")) + "&type=buy";
    });
});
//# sourceMappingURL=../../../maps/mods/filters/com.js.map
