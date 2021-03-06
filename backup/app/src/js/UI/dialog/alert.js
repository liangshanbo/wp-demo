"use strict";

/*
 name:alert.js
 description:新版普通弹窗引用 有回调
 anthor:huangyihai
 */

define("UI/dialog/alert.js", function (require, exports, module) {
    var pcom = require('UI/dialog/dialog_com.js');

    function alerter(text) {
        var btn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "确定";
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        var box = pcom.one('#alert_er');
        if (!box) {
            var html = "<div class=\"m-dialog\"><div class=\"dialog-tit\">" + text + "</div><div class=\"dialog-btn\" id=\"confirm\"><div id=\"sub_btn\">" + btn + "</div></div></div>";
            box = pcom.addElement(html, "m-mask-private", "alert_er");
        } else {
            pcom.one('#alert_er .dialog-tit').innerHTML = text;
            pcom.one('#alert_er #sub_btn').innerHTML = btn;
        }
        pcom.one('#alert_er #confirm').onclick = function () {
            pcom.hideBox(box);
            remliste();
            callback && callback();
        };
        addliste();
        pcom.showBox(box);
    }

    function prompt(text) {
        var btn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "确定";
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        alerter("提示:" + text, btn, callback);
    }

    function alertBox(text, title, callback, confirmBtn, cancelBtn, flog, cancelCallback) {
        if (title !== "") {
            _alertNewBox(text, title, callback, confirmBtn, cancelBtn, flog, cancelCallback);
            return;
        }
        var confirmId = flog ? "cancel" : "confirm",
            cancelId = flog ? "confirm" : "cancel",
            confirmbtn = confirmBtn ? confirmBtn : "确定",
            cancelbtn = cancelBtn ? cancelBtn : "取消",
            layer = pcom.one('#alert_confirm');
        if (!layer) {
            var html = "<div class=\"m-dialog\"><div class=\"dialog-tit\">" + text + "</div><div class=\"dialog-btn\"><div id=\"" + cancelId + "\">" + cancelbtn + "</div><div id=\"" + confirmId + "\">" + confirmbtn + "</div></div></div>";
            layer = pcom.addElement(html, "m-mask-private", "alert_confirm");
        } else {
            pcom.all('#alert_confirm .dialog-btn div')[0].id = cancelId;
            pcom.all('#alert_confirm .dialog-btn div')[1].id = confirmId;
            pcom.one('#alert_confirm .dialog-tit').innerHTML = text;
            pcom.one('#alert_confirm #' + confirmId + '').innerHTML = confirmbtn;
            pcom.one('#alert_confirm #' + cancelId + '').innerHTML = cancelbtn;
        }
        addliste();
        pcom.one('#alert_confirm #confirm').onclick = function () {
            pcom.hideBox(layer);
            remliste();
            callback && callback();
        };
        pcom.one('#alert_confirm #cancel').onclick = function () {
            pcom.hideBox(layer);
            remliste();
            cancelCallback && cancelCallback();
        };
        pcom.showBox(layer);
    }

    function _alertNewBox(text, title, callback, confirmBtn, cancelBtn, flog, cancelCallback) {
        //有title
        var confirmId = flog ? "cancel" : "confirm",
            cancelId = flog ? "confirm" : "cancel",
            confirmbtn = confirmBtn ? confirmBtn : "确定",
            cancelbtn = cancelBtn ? cancelBtn : "取消",
            layer = pcom.one('#alert_newconfirm');

        if (!layer) {
            var html = "<div class=\"m-dialog m-dialog-auto\"><div class=\"dialog-tit\">" + title + "</div><div class=\"dialog-txt\">" + text + "</div><div class=\"dialog-btn\"><div id=\"" + cancelId + "\">" + cancelbtn + "</div><div id=\"" + confirmId + "\">" + confirmbtn + "</div></div></div>";
            layer = pcom.addElement(html, "m-mask-private", "alert_newconfirm");
        } else {
            pcom.all('#alert_newconfirm .dialog-btn div')[0].id = cancelId;
            pcom.all('#alert_newconfirm .dialog-btn div')[1].id = confirmId;
            pcom.one('#alert_newconfirm .dialog-tit').innerHTML = title;
            pcom.one('#alert_newconfirm .dialog-txt').innerHTML = text;
            pcom.one('#alert_newconfirm #' + confirmId + '').innerHTML = confirmbtn;
            pcom.one('#alert_newconfirm #' + cancelId + '').innerHTML = cancelbtn;
        }
        pcom.one('#alert_newconfirm #confirm').onclick = function () {
            pcom.hideBox(layer);
            remliste();
            callback && callback();
        };
        pcom.one('#alert_newconfirm #cancel').onclick = function () {
            pcom.hideBox(layer);
            remliste();
            cancelCallback && cancelCallback();
        };
        addliste();
        pcom.showBox(layer);
    }

    function alertSecond(text) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

        var box = pcom.one('#alert_second');
        if (!box) {
            var html = "<div class=\"toast-txt\">" + text + "</div>";
            box = pcom.addElement(html, "m-toast m-toast-auto", "alert_second");
        } else {
            pcom.one('#alert_second .toast-txt').innerHTML = text;
        }
        pcom.showBox(box);
        timer(function () {
            pcom.hideBox(box);
        }, time);
    }

    function timer(fn, time) {
        setTimeout(fn, time);
    }
    //禁止滚动
    function addliste() {
        window.addEventListener('touchmove', move);
        window.onmousewheel = function () {
            return false;
        }; //禁止鼠标滚轴滚动
    }
    //取消禁止滚动
    function remliste() {
        window.removeEventListener('touchmove', move);
        window.onmousewheel = function () {
            return true;
        }; //开启鼠标滚轴滚动
    }

    function move(e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    module.exports = { alerter: alerter, alertSecond: alertSecond, addliste: addliste, remliste: remliste, alertBox: alertBox, prompt: prompt };
});
//# sourceMappingURL=../../src/maps/UI/dialog/alert.js.map
