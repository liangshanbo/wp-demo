 /*
 * @date 20170410
 * 页面引用
 * 公共过滤器
 </script>
 */

define('mods/filters/com.js', function (require, exports, module) {
	const Vue = require('vue');

	Vue.filter('imgbed',function(url,size) {
		if(typeof url === 'string' && (/\.(jpg|png|gif)$/i).test(url)){
			var res = url.match(/(.*)(\.(jpg|png|gif))/);
			return res && Array.isArray(res) ? (res[0] + (size ? ('.' +  size) : '') + res[2]) : url; 
		}else{
			return url;
		}
	});

	Vue.filter('money',function(price,size) {
		if(isNaN(price)){
			return price;
		}
		return size ? Math.round(price/100).toFixed(size) : Math.round(price/100);
	});

	Vue.filter('price',function(price) {
		return price + '. ';
	});

	Vue.filter('time',function(time, separator) {
	 	var date = time ? new Date(time) : new Date();
	 	var year = date.getFullYear();
	 	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
	    var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
	 	var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
	 	var minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
	 	var second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
	 	var dateStr = '';
	 	if (separator) {
	 		dateStr += day + separator + month + separator + year;
	 	} else {
	 		dateStr += day + '/' + month + '/' + year;
	 	}
	 	return dateStr;
	});
});