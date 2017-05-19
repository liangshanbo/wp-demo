/**
 * 头部导航条显示隐藏
 * @author wanglonghai
 * @date 20161125
 * 页面引用
 *  未使用vue并带有头部导航条的页面
 </script>
 */
define('components/novue_nav', function(require, exports, module) {

    var selector = require('common/selector');

    class Nav {
        constructor() {
            this.nav_status = false;
            this.bindEvent();
        }
        bindEvent() {

            var self = this,
                switchBtn = selector.one('#gongneng'),
                top_nav_bars = selector.one('#top_nav_bars');

            if (switchBtn && top_nav_bars) {

                switchBtn.addEventListener('click', function() {
                    if (!self.nav_status) {
                        top_nav_bars.style.height = '1.1rem';
                    } else {
                        top_nav_bars.style.height = '0';
                    }
                    self.nav_status = !self.nav_status;
                }, false);

                top_nav_bars.addEventListener('click', function() {
                    self.nav_status = false;
                    top_nav_bars.style.height = '0';
                }, false);

            } else {
                console.log('error:top_nav_bars has no element');
            }
        }
        switchStatus(status) {
            this.nav_status = status;
        }
    }

    module.exports = new Nav();
});