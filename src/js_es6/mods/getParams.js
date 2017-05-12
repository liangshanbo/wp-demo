define('mods/getParams', function(require, exports, module) {
	require("$");
	let getParams = (url) => { //获取url传递的参数*/
        var obj = {};
        url = url || location.search;
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        var arr = url.split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var res = arr[i].split("=");
            obj[res[0]] = res[1]
        }
        return obj;
        
    };
	module.exports = getParams;
});