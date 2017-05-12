/**
 * 礼品卡h5和app公用方法
 * @author 张恩铭
 * @date 20170503
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/_common.js">
 </script>
 */

define('conf/account/_common.js', function(require, exports, module) {

    const Vue = require('vue');
    const $ = require('$');
    const storage = require('mods/storage/storage');

    /*
    动画滚动页面至目标元素位置
    @param selector {string} 目标元素选择器
    @param cb {function?} 滚动完成的回调
    */
    function scrollIntoTargetSelector(selector, cb) {
        let bodyPaddingTop = parseInt($('body').css('padding-top'));
        let targetEleScrollTop = document.querySelector(selector).offsetTop;
        let targetBodyScrollTop = targetEleScrollTop - bodyPaddingTop;
        let tId = setInterval(function() {
            let currentBodyScrollTop = document.body.scrollTop;
            let diff = targetBodyScrollTop - currentBodyScrollTop;
            switch (true) {
                case diff > 0:
                    currentBodyScrollTop += Math.ceil(diff / 5);
                    break;
                case diff < 0:
                    currentBodyScrollTop -= Math.ceil(diff / -5);
                    break;
                default:
                    clearInterval(tId);
                    if (typeof cb === 'function') {
                        cb();
                    }
            }
            document.body.scrollTop = currentBodyScrollTop;
        }, 10);
    };

    /*
    单次的使用说明
    @param selector {string} 目标元素选择器
    @param tutorialText {string?} 要展示的说明文字
    @param closeCb {function?} 关闭说明的回调
    */
    function showTutorial(selector, tutorialText, closeCb) {
        let tarEle = document.querySelector(selector);

        if (tarEle === null) {
            throw new Error('没有这个元素。');
        }

        let left = tarEle.offsetLeft,
            top = tarEle.offsetTop,
            width = tarEle.offsetWidth,
            height = tarEle.offsetHeight;

        let wdWidth = document.body.clientWidth,
            wdHeight = document.body.clientHeight;

        let corners = {
            ltCoord: [0, 0, left, top + height],
            rtCoord: [left, 0, wdWidth - left, top],
            lbCoord: [0, top + height, left + width, wdHeight - top - height],
            rbCoord: [left + width, top, wdWidth - left - width, wdHeight - top],
        };

        let $body = $('body');

        let $tutorialMask = $(document.querySelector('.tutorial-mask'));

        ['lt', 'rt', 'lb', 'rb'].map(function(item) {
            $tutorialMask.find('.' + item).css({
                left: corners[item + 'Coord'][0],
                top: corners[item + 'Coord'][1],
                width: corners[item + 'Coord'][2],
                height: corners[item + 'Coord'][3]
            });
        });

        $tutorialMask.find('.text').text(
            typeof tutorialText === 'string'
            ? tutorialText
            : '老哥还没传使用说明的文字。'
        );

        $tutorialMask.on('click', '.close-btn', function() {
            $tutorialMask.hide();
            $body.removeClass('no-scroll');
            if (typeof closeCb === 'function') {
                closeCb();
            }
        })

        $tutorialMask.show();
        $body.addClass('no-scroll');
    }

    /*
    注册全局过滤器
    */
    function setFilters() {
        Vue.filter('money', function(price, size) {
            if (isNaN(price)) {
                return price;
            }
            return size ? Math.round(price/100).toFixed(size) : Math.round(price/100);
        });
        Vue.filter('time', function(time, separator) {
            var date = time ? new Date(time) : new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
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
    }

    module.exports = {
        scrollIntoTargetSelector,
        setFilters,
        showTutorial,
    };

});
