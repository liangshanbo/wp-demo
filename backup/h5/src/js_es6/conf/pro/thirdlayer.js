/**
 * title: 商品三方弹层
 * author: wangchunpeng
 * time: 2017-02-20
 */
define('conf/pro/thirdlayer.js', function(require, exports, module) {
    require('$');
    const cookie = require('mods/storage/cookie.js');
    const g_detail = {
        btns: {
            select:$('#select'),
            confirm:$('#confirm')
        }
    };
    init();
    function init() {
        bindEvent();
    }

    function bindEvent() {
        /*弹层*/
        g_detail.btns.select.on('click',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                return;
            }
            $(this).addClass('active');
        });
        g_detail.btns.confirm.on('click',function(){
            let url = $(this).attr('data-url') + '&affExtParam1='+userId;
            if(g_detail.btns.select.hasClass('active')){
                cookie.setCookie('third_layer',1,9999);
            }
            location.assign(url || '/');
        })
    }

});