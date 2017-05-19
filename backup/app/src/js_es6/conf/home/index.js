define('/conf/home/index', function(require, exports, module) {
    let Cookie = require("mods/storage/cookie");
    let Login = require("mods/login/index");
    require("$");
    var user = null;
    $("#login").on("click", function() {
        Login.gotoLogin(function(data) {
            user = data.data;
            $("#result").html(JSON.stringify(data));
        });
    });

    $("#test").on("click", function() {
        $.ajax({
            url: "/api/user/user?userId=" + user.id,
            type: "GET",
            success: function() {
                alert("user数据GET");
            },
            error: function() {
                alert("error");
            }
        });
    });
});
