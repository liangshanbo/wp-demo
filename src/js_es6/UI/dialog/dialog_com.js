/*
    name:prompt_com.js
    description:弹框公共方法
    anthor:wanglonghai

 */
define("UI/dialog/dialog_com.js", function(require, exports, module) {

    //单元素选择器
    function one(selector){
        return document.querySelector(selector);
    } 
    //多元素选择器
    function all(selector){
        return document.querySelectorAll(selector);
    } 
    function addElement(str,className,id,elment = 'div'){
        let div = document.createElement(elment);
        div.innerHTML = str;
        if(className){
            div.className = className;
        } 
        if(id){
            div.id = id;
        }
        document.body.appendChild(div);
        showBox(div);
        return div;
    }
    function addListener(element,evt,callback){
        if(element){
            removeListener(element,evt,callback);
            element.addEventListener(evt,function(){
                callback && callback();
            },false);
        }
    }
    function removeListener(element,evt,callback){
        element.removeEventListener(evt,function(){
            callback && callback();
        },false);
    }
    function remove(element){
        let parent = one(element).parentNode;
        if(element){
            parent.removeChild(one(element));
        }
    }
    function showBox(element){
        if(element){
            element.style.display = 'block';
            element.style.zIndex = 99999999;
        }
    }
    function hideBox(element){
        if(element){
            element.style.display = 'none';
        }
    }
    module.exports = {one,all,addElement,addListener,showBox,hideBox,remove,removeListener};
});

