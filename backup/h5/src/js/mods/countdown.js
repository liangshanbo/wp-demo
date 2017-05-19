/**
 * [description] 倒计时插件 for 团购
 * @author wangchunpeng 2016-08-18T10:08:31+0800
 * #usage
 * var countdown = require("mods/countdown");
 * countdown.subscribe({endTime: "",startTime:'',callback_end: function(){}},function(data){
 *     //回调函数 
 * });
 */
define("mods/countdown", function(require, exports, module) {
    var arr = [],
        defaults = {
            startTime: 0,
            endTime: 0, //结束时间： 时间戳或者Date对象
            callback_end: function() {} //时间截止后调用的callback
        },
        id_setinterval = 0,
        serverTime = parseInt(+new Date() / 1000);

    function Countdown() {
        this._init();
    }
    Countdown.prototype = {
        constructor: Countdown,
        _init: function() {
            setTimeout(function() {
                id_setinterval = setInterval(function() {
                    _count();
                }, 1000);
                _count();
            }, 0);
        },
        setTime: function(time) {
            serverTime = time;
        },
        getTime: function() { // 返回当前服务器时间
            return serverTime;
        },
        /**
         * [subscribe description] 订阅定时器
         * @param  {[type]}   options  [description] 定时器参数 (参照defaults,参数都是选填的)
         * @param  {Function} callback [description] 回调函数
         */
        subscribe: function(options, callback) {
            options = mixin(options, defaults);
            var endTime = options.endTime,
                startTime = options.startTime;
            try {
                endTime = new Date(endTime).valueOf() / 1000;
                startTime = new Date(startTime).valueOf() / 1000;
                options.endTime = endTime;
                options.startTime = startTime;
                arr.push({
                    options: options,
                    callback: callback
                });
            } catch (err) {
                console.log("Time格式不对", endTime, startTime);
            }
        }
    }

    function _count() {
        serverTime++;
        for (var i = 0, l = arr.length; i < l; i++) {
            var item = arr[i],
                startTime = item.options.startTime,
                endTime = item.options.endTime;
            if (startTime && serverTime > startTime) {
                item.callback.apply(null, [co_time(serverTime - startTime)]);
            } else if (endTime && endTime > serverTime) {
                item.callback.apply(null, [co_time(endTime - serverTime)]);
            } else {
                arr.splice(i, 1);
                i--;
                l--;
                var data = {
                    "hours": "00",
                    "minutes": "00",
                    "seconds": "00"
                }
                item.callback.apply(null, [data]);
                item.options.callback_end.apply(null, []);
                if (!arr.length) { // 如果没有监听的话就取消循环了
                    clearInterval(id_setinterval);
                }
                continue;
            }
        }
    }

    function co_time(time_delta) {
        // time_delta = time_delta / 1000;
        var seconds = parseInt(time_delta % 60),
            minutes = parseInt(time_delta % (60 * 60) / (60)),
            hours = parseInt(time_delta / (60 * 60));
        seconds = seconds > 9 ? seconds : "0" + seconds;
        minutes = minutes > 9 ? minutes : "0" + minutes;
        hours = hours > 9 ? hours : "0" + hours;
        return {
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function mixin(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key) && !(key in target)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    module.exports = new Countdown();
});