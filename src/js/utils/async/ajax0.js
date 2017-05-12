'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    name:ajax.js
    description:ajax请求
    anthor:luoxiaowei
    data:2016-11-08
 */
define("utils/async/ajax", function (require, exports, module) {
	require('lib/polyfill/object.js');
	var alert = require('UI/dialog/alert.js');

	var Ajax = function () {
		function Ajax() {
			_classCallCheck(this, Ajax);
		}

		_createClass(Ajax, [{
			key: '_request',
			value: function _request(options) {
				var df = this._init(),
				    xmlhttp = df.xmlhttp,
				    ops = Object.assign(df.defaults, options);

				xmlhttp.open(ops.type, ops.url, true);
				xmlhttp.responseType = ops.dataType;
				// xmlhttp.timeout = 3000;
				xmlhttp.onload = function () {
					if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
						var res = xmlhttp.response || {};
						if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object' && 'code' in res && res['code'] === 401) {
							alert.alertSecond(res.message);
						}
						ops.success(xmlhttp.response);
					} else {
						console.log('request is fail');
					}
				};
				xmlhttp.ontimeout = function () {
					console.log('请求超时');
				};
				var data = this._formatParams(ops);
				xmlhttp.send(data || null);
			}
		}, {
			key: 'query',
			value: function query(url, params, callback) {
				this._request({
					url: url,
					data: params,
					success: callback
				});
			}
		}, {
			key: 'post',
			value: function post(url, params, callback) {
				this.query(url, params, callback);
			}
		}, {
			key: 'loadmore',
			value: function loadmore(url, params, callback, before, after) {
				this.query(url, params, function (data) {
					before();
					callback && callback(data);
					after && after();
				});
			}
		}, {
			key: '_formatParams',
			value: function _formatParams(ops) {
				var formdata = new FormData();
				for (var key in ops.data) {
					formdata.append(key, ops.data[key]);
				}
				return formdata;
			}
		}, {
			key: '_init',
			value: function _init() {
				return {
					xmlhttp: new XMLHttpRequest(),
					defaults: {
						type: 'post',
						dataType: 'json',
						success: function success() {},
						data: null
					}
				};
			}
		}]);

		return Ajax;
	}();

	module.exports = new Ajax();
});
//# sourceMappingURL=../../../maps/utils/async/ajax0.js.map
