'use strict';

/**
 * 搜索弹层
 * @author 黄奕海
 * @date 20170222
 *
 */
define('mods/search/layer.js', function (require, exports, module) {
    var $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        shistory = require('mods/search/history.js'),
        UI = require('UI/dialog/alert.js'),
        Vue = require("vue");
    var dom = {
        input: $('#s_layer_input'),
        layer: $('#s_layer'),
        result: $('#s_result')
    };
    if (keyword !== "") {
        shistory.setH(keyword);
    }
    var searchVue = new Vue({
        el: "#s_layer",
        data: {
            isShow: shistory.getH() ? shistory.getH().length : 0,
            his_data: shistory.getH(),
            keyword: keyword,
            tab: {
                sortCriteria: 0,
                sort: 0,
                pageNum: 1
            },
            scTop: 0
        },
        computed: {
            searchList: function searchList() {
                return {
                    sortCriteria: this.tab['sortCriteria'],
                    sort: this.tab['sort'],
                    pageNum: this.tab['pageNum'],
                    keyword: this.keyword
                };
            }
        },
        methods: {
            go_search: function go_search() {
                var val = dom.input.val(),
                    str = this.objToString(this.searchList);
                if (val !== "") {
                    this.layer_hide();
                    location.assign('/search' + str);
                } else {
                    UI.alertSecond("Enter search keywords");
                }
            },
            input_input: function input_input() {
                if (dom.input.val() === "") {
                    //苹果手机删除问题
                    setTimeout(function () {
                        dom.input.val("");
                    }, 50);
                }
            },
            layer_show: function layer_show() {
                this.scTop = $('body').scrollTop();
                dom.result.hide();
                dom.layer.show().find("input").focus();
            },
            layer_hide: function layer_hide() {
                var _this = this;

                dom.layer.hide();
                dom.result.show();
                setTimeout(function () {
                    $('body').scrollTop(_this.scTop);
                }, 50);
            },
            click_text_null: function click_text_null() {
                this.keyword = "";
                dom.input.focus();
            },
            click_del_his: function click_del_his() {
                this.isShow = 0;
                shistory.rmH();
            },
            objToString: function objToString(obj) {
                var str = "";
                for (var i in obj) {
                    str += '&' + i + '=' + obj[i];
                }
                return '?' + str.substr(1);
            }
        }
    });
    module.exports = searchVue;
});
//# sourceMappingURL=../../../maps/mods/search/layer.js.map
