"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @title: 幸运大抽奖
 * @time:  2017-04-26
 * @author: wangchunpeng
 */
define("conf/hy/game/luckydraw", function (require, exports, module) {
    var DrawCore = require("conf/hy/game/luckydraw_core"),
        Share = require('mods/share/shareDialog'),
        UI = require('UI/dialog/alert.js'),
        userId = "",
        hasLogin = false;
    if (window.userinfo) {
        userId = userinfo.user.id;
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;

    var shareFB = new Share({
        picture: wapcsspath + "/images/game/luckydraw/share.jpg",
        shareType: "gameShare",
        type: "gif"
    });

    var LuckyDraw = function (_DrawCore) {
        _inherits(LuckyDraw, _DrawCore);

        function LuckyDraw(props) {
            _classCallCheck(this, LuckyDraw);

            return _possibleConstructorReturn(this, (LuckyDraw.__proto__ || Object.getPrototypeOf(LuckyDraw)).call(this, props));
        }

        _createClass(LuckyDraw, [{
            key: "share",
            value: function share() {
                shareFB.layer_show();
            }
        }, {
            key: "toast",
            value: function toast(msg) {
                UI.alertSecond(msg);
            }
        }]);

        return LuckyDraw;
    }(DrawCore);

    new LuckyDraw();
});
//# sourceMappingURL=../../../../maps/conf/hy/game/luckydraw.js.map
