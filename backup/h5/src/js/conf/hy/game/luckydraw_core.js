"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @title: 幸运大抽奖--核心部分
 * @time:  2017-04-26
 * @author: wangchunpeng
 */
define("conf/hy/game/luckydraw_core", function (require, exports, module) {
    require("$");
    var Storage = require("mods/storage/storage"),
        Ajax = require("utils/async/ajax");

    var internal = {
        dates: ["Apr", "May"],
        loading: false, //是否正在加载list
        date_now: new Date().valueOf(), //当前显示的哪天的数据
        $pre: $(".pre"),
        $next: $(".next"),
        $list: $(".main .list"),
        $nolist: $(".main .nolist"),
        $date: $(".main .date"),
        date_storage: "",
        begintime: "", //活动开始时间
        endtime: "" //结束时间
    };

    var DrawCore = function () {
        function DrawCore() {
            _classCallCheck(this, DrawCore);

            this.init();
        }

        _createClass(DrawCore, [{
            key: "init",
            value: function init() {
                var self = this;
                self.ajaxData();
                self.bindEvents();
            }
        }, {
            key: "bindEvents",
            value: function bindEvents() {
                var self = this;
                $(".share,.share0").on("click", function () {
                    self.share();
                });
                internal.$pre.on("click", function () {
                    self._toggle_date(internal.$pre, "pre");
                });
                internal.$next.on("click", function () {
                    self._toggle_date(internal.$next, "next");
                });
            }
        }, {
            key: "_toggle_date",
            value: function _toggle_date($dom, type) {
                if ($dom.parent().hasClass("disabled") || internal.loading) {
                    return;
                }
                var now = internal.date_now,
                    self = this;
                if (type == "next") {
                    now += 24 * 60 * 60 * 1000;
                } else {
                    now -= 24 * 60 * 60 * 1000;
                }
                internal.date_now = now;
                self.ajaxData();
            }
        }, {
            key: "_show_data",
            value: function _show_data(data) {
                var bounses = data.bounses;
                if (bounses) {
                    var str = "",
                        l = Math.min(10, bounses.length);
                    for (var i = 0; i < l; i++) {
                        var boun = bounses[i];
                        str += (boun["isMe"] ? "<li class='active'>" : "<li>") + "<a href='javascript:void(0)' class='clearfix'>" + ("<span class='uname'>" + boun['nickname'] + "</span>") + ("<span class='phone'>" + boun['mobile'] + "</span>") + "</li>";
                    }
                    internal.$list.html(str).show();
                    internal.$nolist.hide();
                } else {
                    var descr = data.description.split(".");
                    internal.$nolist.find(".tip1").html(descr[0]);
                    internal.$nolist.find(".tip2").html(descr[1]);
                    internal.$list.hide();
                    internal.$nolist.show();
                }
            }
        }, {
            key: "_get_date",
            value: function _get_date(timestamp) {
                var date = new Date(timestamp),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate(),
                    hour = date.getHours(),
                    miu = date.getMinutes(),
                    seconds = date.getSeconds();
                month = month > 9 ? month : "0" + month;
                day = day > 9 ? day : "0" + day;
                hour = hour > 9 ? hour : "0" + hour;
                miu = miu > 9 ? miu : "0" + miu;
                seconds = seconds > 9 ? seconds : "0" + seconds;

                return { year: year, month: month, day: day, hour: hour, miu: miu, seconds: seconds };
            }

            /**
             * @title:设置next pre是否disable
             * bPre： 大于开始时间的第二天
             * bNext：小于结束时间&&小于当前时间
             */

        }, {
            key: "_set_btn",
            value: function _set_btn() {
                if (internal.begintime && internal.endtime) {
                    var self = this,
                        $now = self._get_date(internal.date_now),
                        $begin = self._get_date(internal.begintime),
                        $end = self._get_date(internal.endtime),
                        $rnow = self._get_date(new Date().valueOf());

                    var bPre = self._get_timestamp($now) > self._get_timestamp($begin),
                        bNext = self._get_timestamp($now) < Math.min(self._get_timestamp($end), self._get_timestamp($rnow));

                    if (bPre) {
                        internal.$pre.parent().removeClass("disabled");
                    } else {
                        internal.$pre.parent().addClass("disabled");
                    }
                    if (bNext) {
                        internal.$next.parent().removeClass("disabled");
                    } else {
                        internal.$next.parent().addClass("disabled");
                    }
                }
            }
        }, {
            key: "_get_timestamp",
            value: function _get_timestamp($date) {
                return new Date($date.year + "/" + $date.month + "/" + $date.day).valueOf();
            }
        }, {
            key: "ajaxData",
            value: function ajaxData() {
                var self = this;

                internal.$list.hide();
                internal.$nolist.find(".tip").html("");
                internal.$nolist.show();

                var dd = self._get_date(internal.date_now),
                    storage = Storage.getItem("luckydraw_" + internal.date_storage);
                dd = [dd.year, dd.month, dd.day, dd.hour, dd.miu, dd.seconds].join("");
                if (storage) {//优先拿本地存储的数据
                    //self._handle_data(storage); //TODO
                    //return;
                }
                internal.loading = true;
                Ajax.query({
                    url: "/api/activity/luckydraw/bonuses",
                    data: {
                        queryDate: dd
                    },
                    success: function success(data) {
                        if (data.code === 200) {
                            var result = data.data;
                            self._handle_data(result);
                            if (result.bounses) {
                                //Storage.setItem("luckydraw_" + internal.date_storage, JSON.stringify(result)); //TODO
                            }
                        } else {
                            self.toast(data.message);
                        }
                        internal.loading = false;
                    }
                });
            }
        }, {
            key: "_handle_data",
            value: function _handle_data(result) {
                var self = this;
                self._show_data(result);
                internal.begintime = result.beginTime;
                internal.endtime = result.entTime;
                if (result.bonusTime) {
                    internal.date_now = new Date(result.bonusTime).valueOf();
                }
                self._set_btn();
                var date = self._get_date(internal.date_now),
                    str = "";
                str += date.month == "04" ? internal["dates"][0] : internal["dates"][1];
                str += "." + date.day;
                internal.$date.find("span").html(str);
            }
        }]);

        return DrawCore;
    }();

    module.exports = DrawCore;
});
//# sourceMappingURL=../../../../maps/conf/hy/game/luckydraw_core.js.map
