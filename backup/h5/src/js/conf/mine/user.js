'use strict';

/**
 * 我的--用户信息
 * @author guodanying
 * @date 20170220
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mine/user.js">
 </script>
 */
define('conf/mine/user.js', function (require, exports, module) {
    require('$');
    var UI = require('UI/dialog/alert.js'),
        ajax = require('utils/async/ajax.js');
    var loginoff = $("#loginoff");
    loginoff.on("click", function () {
        UI.alertBox({
            text: 'Are you sure to log out?',
            confirmBtn: 'Log out',
            cancelBtn: 'cancel',
            callback: function callback() {
                quest();
            }
        });
    });
    function quest() {
        ajax.post({
            url: '/api/user/logout',
            success: function success(data) {
                if (data.code === 200) {
                    location.assign("/");
                } else {
                    UI.alertSecond(data.message);
                    return false;
                }
            },
            error: function error(data) {
                UI.alertSecond(data.message);
                return false;
            }
        });
    }
});
//# sourceMappingURL=../../../maps/conf/mine/user.js.map