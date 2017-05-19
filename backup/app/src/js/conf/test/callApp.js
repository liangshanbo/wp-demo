"use strict";

define('conf/test/callApp', function (require, exports, module) {
    require("$");
    var appInterface = require("utils/appInterface");

    $("#btn").on("click", function () {
        var url = $("#url").val().trim(),
            params = $("#params").val().trim() || {};
        if (!url) {
            appInterface.toast("请输入URL");
            return;
        }
        try {
            params = JSON.parse(params);
        } catch (err) {
            appInterface.toast("参数不是JSON格式");
            return;
        }
        appInterface.call(url, params, function (data) {
            $("#result").html(JSON.stringify(data));
        });
    });
});
//# sourceMappingURL=../../src/maps/conf/test/callApp.js.map
