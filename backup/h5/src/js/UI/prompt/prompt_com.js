'use strict';

/*
    name:prompt_com.js
    description:弹框公共方法
    anthor:wanglonghai

 */
define("UI/prompt/prompt_com.js", function (require, exports, module) {
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
    //单元素选择器
    function one(selector) {
        return document.querySelector(selector);
    }
    //多元素选择器
    function all(selector) {
        return document.querySelectorAll(selector);
    }
    function addElement(str, className, id) {
        var elment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'div';

        var div = document.createElement(elment);
        div.innerHTML = str;
        if (className) {
            div.className = className;
        }
        if (id) {
            div.id = id;
        }
        document.body.appendChild(div);
        return div;
    }
    function addListener(element, evt, callback) {
        if (element) {
            element.addEventListener(evt, function () {
                callback && callback();
            }, false);
        }
    }
    function showBox(element) {
        if (element) {
            element.style.display = 'block';
            element.style.zIndex = 99999999;
        }
    }
    function hideBox(element) {
        if (element) {
            element.style.display = 'none';
        }
    }
    module.exports = { addliste: addliste, remliste: remliste, one: one, all: all, addElement: addElement, addListener: addListener, showBox: showBox, hideBox: hideBox };
});
//# sourceMappingURL=../../src/maps/UI/prompt/prompt_com.js.map
