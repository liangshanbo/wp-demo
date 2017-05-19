"use strict";

define('/conf/home/index', function (require, exports, module) {
    var Cookie = require("mods/storage/cookie");
    var Login = require("mods/login/index");
    require("$");
    var user = null;
    $("#login").on("click", function () {
        Login.gotoLogin(function (data) {
            user = data.data;
            $("#result").html(JSON.stringify(data));
        });
    });

    $("#test").on("click", function () {
        $.ajax({
            url: "/api/user/user?userId=" + user.id,
            type: "GET",
            success: function success() {
                alert("user数据GET");
            },
            error: function error() {
                alert("error");
            }
        });
    });
});
//# sourceMappingURL=../../src/maps/conf/home/index.js.map
