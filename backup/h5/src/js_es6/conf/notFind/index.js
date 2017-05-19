/**
 * title: 404
 * author: 黄奕海
 * time: 2017-03-13
 */
define('conf/notFind/index.js', function(require, exports, module) {
    setTimeout(function(){
        if(!/debug/.test(location.href)){
            location.assign("/")
        }
    },3000)
});