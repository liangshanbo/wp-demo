/*
    name:alertSecond.js
    description:提示框
    anthor:wanglonghai
    data:2016-10-26
 */
define("UI/prompt/alertSecond.js", function(require, exports, module) {
    let pcom = require('UI/prompt/prompt_com.js');

    let alertSecond = function() {
        let div = null,display = false;
        return function(str,duration = 2000){
            if(display){
                return false;
            }
            if(!div){
                div = pcom.addElement(str,'','alertSecond');   
            }
            display = true;
            pcom.showBox(div);
            timer(() => {
                pcom.hideBox(div);
                display = false;
            },duration);
        }
    }();

    function timer(fn,duration){
        setTimeout(fn,duration);
    }

    module.exports = {alertSecond};
});

