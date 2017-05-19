/*
    name:ajax.js
    description:ajax请求
    anthor:luoxiaowei
    data:2016-11-08
 */
define("utils/async/ajax", function(require, exports, module) {
	require('lib/polyfill/object.js');
	let alert = require('UI/dialog/alert.js');

	class Ajax {
		constructor() {

		}
		_request(options) {
			let df = this._init(),
				xmlhttp = df.xmlhttp,
				ops = Object.assign(df.defaults, options);

			xmlhttp.open(ops.type, ops.url, true);
			xmlhttp.responseType = ops.dataType;
			// xmlhttp.timeout = 3000;
			xmlhttp.onload = () => {
				if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
					let res = xmlhttp.response || {};
					if(typeof res === 'object' && 'code' in res && res['code'] === 401){
						alert.alertSecond(res.message);
					}
					ops.success(xmlhttp.response);
				} else {
					console.log('request is fail');
				}
			}
			xmlhttp.ontimeout = () => {
				console.log('请求超时');
			}
			let data = this._formatParams(ops);
			xmlhttp.send(data || null);

		}
		query(url, params, callback) {
			this._request({
				url: url,
				data: params,
				success: callback
			});
		}
		post(url, params, callback) {
			this.query(url, params, callback);
		}
		loadmore(url, params, callback, before, after) {
			this.query(url, params, function(data) {
				before();
				callback && callback(data);
				after && after();
			});
		}
		_formatParams(ops) {
			let formdata = new FormData();
			for (let key in ops.data) {
				formdata.append(key, ops.data[key]);
			}
			return formdata;
		}
		_init() {
			return {
				xmlhttp: new XMLHttpRequest(),
				defaults: {
					type: 'post',
					dataType: 'json',
					success: function() {},
					data: null
				}
			}
		}
	}

	module.exports = new Ajax();
})