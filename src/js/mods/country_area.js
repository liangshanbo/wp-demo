'use strict';

/*登录注册区域选择  huangyihai  17/04/01*/
define('mods/country_area.js', function (require, exports, module) {
    require("$");
    var isFor = true;
    $('#scrollBar').on('click', 'a', function () {
        var index = $(this).index(),
            headerH = $('#area_header').height(),
            scTop = 0;
        for (var i = 0; i < index; i++) {
            scTop += parseFloat($('#area').find('dl').eq(i).height());
        }
        $('body').scrollTop(index == 0 ? 0 : scTop + headerH);
    });
    var arr = [],
        len = $('#area').find('.country dl').length,
        top = 0;
    $(window).on('scroll', function () {
        if ($('#area').css('display') === "none") {
            return;
        }
        if (isFor) {
            for (var j = 0; j < len; j++) {
                top = parseFloat($('#area').find('.country dl').eq(j).offset().top);
                arr.push(top);
                if (j === len - 1) {
                    isFor = false;
                    break;
                }
            }
        }
        var scTop = $('body').scrollTop(),
            H = parseFloat($('#country').children('dl').eq(0).children('dt').height());
        for (var i = 0; i < len; i++) {
            if (scTop <= arr[0]) {
                $('#country').find('dt').removeClass('fixed');
            } else {
                if (scTop >= arr[i] - H * 2 && scTop <= arr[i + 1] - H) {
                    $('#country').children('dl').eq(i).children('dt').addClass('fixed').parents('dl').siblings().find('dt').removeClass('fixed');
                }
            }
        }
    });
});
//# sourceMappingURL=../../maps/mods/country_area.js.map
