"use strict";

/**
 * 商品分类
 * @author wangming
 * @date 20170224
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/goods/category.js">
 </script>
 */

define('conf/goods/category.js', function (require, exports, module) {
  require("$");
  var Ajax = require("utils/async/ajax"),
      Vue = require("vue"),
      UI = require('UI/dialog/alert.js');

  new Vue({
    el: "body",
    data: {},
    methods: {
      pro_list: function pro_list(dom) {
        var $this = $(dom.currentTarget),
            level = $this.attr("data-level"),
            categoryId = $this.attr("data-categoryId"),
            keyword = $this.children('a').length > 0 ? $this.children('a').html() : $this.children('span').html();
        var loca_url = '/goods/detail?categoryId=' + categoryId + "&title=" + keyword;
        if (level == 0) {
          if ($this.next("dd").length == 0) {
            location.href = loca_url;
          }
        } else if (level == 1) {
          if ($this.find("em").length > 0) {
            var $list = $this.next("ul");
            var isShow = $list.attr("data-show");
            if (isShow == 0) {
              $this.addClass("active");
              $list.show().attr("data-show", 1);
            } else {
              $this.removeClass("active");
              $list.hide().attr("data-show", 0);
            }
          } else {
            location.href = loca_url;
          }
        } else if (level == 2) {
          location.href = loca_url;
        }
      }
    }
  });
});
//# sourceMappingURL=../../../maps/conf/goods/category.js.map
