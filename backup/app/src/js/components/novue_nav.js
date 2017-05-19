'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 头部导航条显示隐藏
 * @author wanglonghai
 * @date 20161125
 * 页面引用
 *  未使用vue并带有头部导航条的页面
 </script>
 */
define('components/novue_nav', function (require, exports, module) {

    var selector = require('common/selector');

    var Nav = function () {
        function Nav() {
            _classCallCheck(this, Nav);

            this.nav_status = false;
            this.bindEvent();
        }

        _createClass(Nav, [{
            key: 'bindEvent',
            value: function bindEvent() {

                var self = this,
                    switchBtn = selector.one('#gongneng'),
                    top_nav_bars = selector.one('#top_nav_bars');

                if (switchBtn && top_nav_bars) {

                    switchBtn.addEventListener('click', function () {
                        if (!self.nav_status) {
                            top_nav_bars.style.height = '1.1rem';
                        } else {
                            top_nav_bars.style.height = '0';
                        }
                        self.nav_status = !self.nav_status;
                    }, false);

                    top_nav_bars.addEventListener('click', function () {
                        self.nav_status = false;
                        top_nav_bars.style.height = '0';
                    }, false);
                } else {
                    console.log('error:top_nav_bars has no element');
                }
            }
        }, {
            key: 'switchStatus',
            value: function switchStatus(status) {
                this.nav_status = status;
            }
        }]);

        return Nav;
    }();

    module.exports = new Nav();
});
//# sourceMappingURL=../src/maps/components/novue_nav.js.map
