/**
 * 我的礼品卡 - 内嵌
 * @author 张恩铭
 * @date 20170324
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/giftcard.js">
 </script>
 */
define('conf/account/giftcard.js', function(require, exports, module) {
    const $ = require('$');
    const appInterface = require("utils/appInterface");

    init();

    function init() {
        bindCopyEvents();
        bindHelpLayerEvents();
    }

    function bindCopyEvents() {
        $('.cards-list').on('click', '.copy-btn', function() {
            nativeCopy($(this).attr('data-clipboard-text'));
        });
    }
    function bindHelpLayerEvents() {
        let $body = $('body');
        let $helpButton = $('.help-btn');
        let $helpArea = $('.mask');
        let $closeHelpButton = $helpArea.find('.close-btn');
        $helpButton.click(function() {
            $helpArea.css('display', 'block');
            $body.css('overflow-y', 'hidden');
        });
        $closeHelpButton.click(function() {
            $helpArea.css('display', 'none');
            $body.css('overflow-y', 'auto');
        });
    }
    function nativeCopy(msg) {
        appInterface.call(
            '/common/copy',
            { msg },
            function(data) {
                if (data.code === 200) {
                    appInterface.toast('Copied');
                } else {
                    appInterface.toast('Auto-copy failed. Please copy manually.');
                }
            }
        );
    }
});
