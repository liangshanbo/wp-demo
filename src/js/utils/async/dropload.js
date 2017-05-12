'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    name:dropload.js
    description:上拉加载更多
    anthor:luoxiaowei
    data:2016-11-08
 */
define("utils/async/dropload", function (require, exports, module) {

	require('lib/polyfill/array.js');
	require('lib/polyfill/object.js');
	var Ajax = require('utils/async/ajax.js'),
	    ll = require('utils/async/lazyload.js'),
	    current_element = null;

	var DropLoad = function () {
		function DropLoad() {
			_classCallCheck(this, DropLoad);
		}

		_createClass(DropLoad, [{
			key: 'upload',
			value: function upload(selector, url, params, callback, options) {
				var element = document.querySelector(selector);
				if (element) {
					var isGoOn = this._init(element, url, params, callback, options);
					if (isGoOn) {
						this._addListener();
					}
				} else {
					console.log('error:no selected element');
					return false;
				}
			}
		}, {
			key: 'lazyload',
			value: function lazyload() {
				ll._lazyload();
			}
		}, {
			key: 'finished',
			value: function finished(len) {
				this._loadover(len);
			}
		}, {
			key: 'setParams',
			value: function setParams(options) {
				this.params = Object.assign(this.params, options);
			}
		}, {
			key: 'currentPage',
			value: function currentPage() {
				return this.params.pageNum;
			}
		}, {
			key: '_init',
			value: function _init(element, url, params, callback, options) {
				this.url = url;
				this.loadDiv = null;
				this.current = element;
				this.isLoading = false;
				this.isFinished = false;
				this.isHideOver = false;
				this.callback = callback;
				this.params = Object.create(params);
				this.params.numPerPage = params.numPerPage || 10;
				this.defaults = {
					isFirst: false,
					text: '正在努力加载...',
					overtext: '已经到底了~~',
					img: wapcsspath + '/images/loading-1.gif'
				};
				if (options) {
					this.isFirst = options.isFirst || false;
					this.defaults = Object.assign(this.defaults, options);
				}
				if (this.defaults.isFirst) {
					this.params.pageNum = 1;
					this.params.numPerPage = 20;
				} else {
					this.params.pageNum = params.pageNum || 2;
				}
				if (this._checkFirstList()) {
					return false;
				}
				this._addLoading();
				if (this.current && this.params.pageNum === 2) {
					if (document.body.scrollTop + window.innerHeight === document.body.offsetHeight) {
						this._loadSource();
					}
				}
				return true;
			}
		}, {
			key: '_addListener',
			value: function _addListener() {
				var x = void 0,
				    y = void 0,
				    self = this;
				this.current.addEventListener('touchstart', function (e) {
					x = e.changedTouches[0].pageX;
					y = e.changedTouches[0].pageY;
				}, false);
				this.current.addEventListener("touchend", function (e) {
					current_element = e.target;
					// let durationX = e.changedTouches[0].pageX - x;
					var durationY = e.changedTouches[0].pageY - y;
					if (Math.abs(durationY) > 0) {
						self._attachFun();
					}
				}, false);
				if (this.defaults.isFirst) {
					this._loadSource();
				}
			}
		}, {
			key: '_attachFun',
			value: function _attachFun() {
				if (this.isFinished) {
					// this._loadover();
					return false;
				}
				if (this.isLoading) {
					return false;
				}
				this._doLoad();
			}
		}, {
			key: '_doLoad',
			value: function _doLoad() {
				var srollTop = document.body.scrollTop,
				    height = document.body.offsetHeight,
				    innerH = window.innerHeight,
				    range = parseFloat(innerH) * 2,
				    totalheight = range + parseFloat(srollTop);
				if (totalheight + range >= height) {
					this._showLoading();
					this._loadSource();
				}
			}
		}, {
			key: '_loadSource',
			value: function _loadSource() {
				// Ajax.loadmore(this.url, this.params, this.callback, this._before.bind(this), this._after.bind(this));
				var before = this._before.bind(this),
				    after = this._after.bind(this),
				    callback = this.callback;
				Ajax.query(this.url, this.params, function (data) {
					before();
					callback && callback(data);
					after && after();
				});
			}
		}, {
			key: '_before',
			value: function _before() {
				this._hideLoading();
			}
		}, {
			key: '_after',
			value: function _after() {
				this.params.pageNum++;
				setTimeout(function () {
					ll._lazyload();
				}, 300);
			}
		}, {
			key: '_addLoading',
			value: function _addLoading() {
				if (this.loadDiv) {
					return;
				} else {
					this._createLoading();
				}
			}
		}, {
			key: '_createLoading',
			value: function _createLoading() {
				if (this.loadDiv) {
					return;
				}
				if (this.current) {
					var parent = this.current.parentNode,
					    loadDiv = document.createElement('div');
					loadDiv.className = 'zone-loding page-no';
					loadDiv.innerHTML = '<img style="height: 0.32rem; padding-right: 5px; display: inline-block;" src="' + this.defaults.img + '" alt="" />' + this.defaults.text;
					if (this.current.nextSibling) {
						this.loadDiv = parent.insertBefore(loadDiv, this.current.nextSibling);
					} else {
						this.loadDiv = parent.appendChild(loadDiv);
					}
				}
			}
		}, {
			key: '_showLoading',
			value: function _showLoading() {
				this.loadDiv.style.display = 'block';
				this.isLoading = true;
			}
		}, {
			key: '_hideLoading',
			value: function _hideLoading() {
				this.loadDiv.style.display = 'none';
				this.isLoading = false;
			}
		}, {
			key: '_loadover',
			value: function _loadover(len) {
				//加载完
				// if (this.isFinished) {
				// 	return false;
				// }
				if (this.loadDiv) {
					this.loadDiv.innerHTML = this.defaults.overtext;
				}
				if (this.defaults.isHideOver) {
					this.loadDiv.style.display = 'none';
				} else {
					this.loadDiv.style.display = 'block';
				}
				if (this.params.pageNum === 1 && len === 0) {
					this.loadDiv.style.display = 'none';
				}
				this.isFinished = true;
			}
		}, {
			key: '_checkFirstList',
			value: function _checkFirstList() {
				if (this.current.tagName.toUpperCase() === 'UL' && !this.defaults.isFirst) {
					var childCount = 0;
					Array.prototype.slice.call(this.current.childNodes).map(function (el) {
						if (el.nodeType === 1 && el.tagName.toUpperCase() === 'LI') {
							childCount++;
						}
					});
					if (childCount < this.params.pageSize) {
						return true;
					}
				}
				return false;
			}
		}]);

		return DropLoad;
	}();

	module.exports = DropLoad;
});
//# sourceMappingURL=../../../maps/utils/async/dropload.js.map
