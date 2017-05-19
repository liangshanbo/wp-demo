/**
 * @title: 幸运大抽奖--核心部分
 * @time:  2017-04-26
 * @author: wangchunpeng
 */
define("conf/hy/game/luckydraw_core", function(require, exports, module) {
    require("$");
    let Storage = require("mods/storage/storage"),
        Ajax = require("utils/async/ajax");

    let internal = {
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
    }
    class DrawCore {
        constructor() {
            this.init();
        }
        init() {
            let self = this;
            self.ajaxData();
            self.bindEvents();
        }
        bindEvents() {
            let self = this;
            $(".share,.share0").on("click", function() {
                self.share();
            });
            internal.$pre.on("click", function() {
                self._toggle_date(internal.$pre, "pre");
            });
            internal.$next.on("click", function() {
                self._toggle_date(internal.$next, "next");
            });
        }
        _toggle_date($dom, type) {
            if ($dom.parent().hasClass("disabled") || internal.loading) {
                return;
            }
            let now = internal.date_now,
                self = this;
            if (type == "next") {
                now += 24 * 60 * 60 * 1000;
            } else {
                now -= 24 * 60 * 60 * 1000;
            }
            internal.date_now = now;
            self.ajaxData();
        }
        _show_data(data) {
            let bounses = data.bounses;
            if (bounses) {
                let str = "",
                    l = Math.min(10, bounses.length);
                for (var i = 0; i < l; i++) {
                    let boun = bounses[i];
                    str += (boun["isMe"] ? "<li class='active'>" : "<li>") +
                        "<a href='javascript:void(0)' class='clearfix'>" +
                        `<span class='uname'>${boun['nickname']}</span>` +
                        `<span class='phone'>${boun['mobile']}</span>` +
                        "</li>";
                }
                internal.$list.html(str).show();
                internal.$nolist.hide();
            } else {
                let descr = data.description.split(".");
                internal.$nolist.find(".tip1").html(descr[0]);
                internal.$nolist.find(".tip2").html(descr[1]);
                internal.$list.hide();
                internal.$nolist.show();
            }
        }
        _get_date(timestamp) {
            let date = new Date(timestamp),
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

            return { year, month, day, hour, miu, seconds };
        }

        /**
         * @title:设置next pre是否disable
         * bPre： 大于开始时间的第二天
         * bNext：小于结束时间&&小于当前时间
         */
        _set_btn() {
            if (internal.begintime && internal.endtime) {
                let self = this,
                    $now = self._get_date(internal.date_now),
                    $begin = self._get_date(internal.begintime),
                    $end = self._get_date(internal.endtime),
                    $rnow = self._get_date(new Date().valueOf());

                let bPre = self._get_timestamp($now) > self._get_timestamp($begin),
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
        _get_timestamp($date) {
            return new Date($date.year + "/" + $date.month + "/" + $date.day).valueOf()
        }
        ajaxData() {
            let self = this;

            internal.$list.hide();
            internal.$nolist.find(".tip").html("");
            internal.$nolist.show();

            let dd = self._get_date(internal.date_now),
                storage = Storage.getItem("luckydraw_" + internal.date_storage);
            dd = [dd.year, dd.month, dd.day, dd.hour, dd.miu, dd.seconds].join("");
            if (storage) { //优先拿本地存储的数据
                //self._handle_data(storage); //TODO
                //return;
            }
            internal.loading = true;
            Ajax.query({
                url: "/api/activity/luckydraw/bonuses",
                data: {
                    queryDate: dd
                },
                success: function(data) {
                    if (data.code === 200) {
                        let result = data.data;
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
        _handle_data(result) {
            let self = this;
            self._show_data(result);
            internal.begintime = result.beginTime;
            internal.endtime = result.entTime;
            if(result.bonusTime) {
                internal.date_now = new Date(result.bonusTime).valueOf();
            }
            self._set_btn();
            let date = self._get_date(internal.date_now),
                str = "";
            str += date.month == "04" ? internal["dates"][0] : internal["dates"][1];
            str += "." + date.day;
            internal.$date.find("span").html(str);
        }
    }
    module.exports = DrawCore;
});
