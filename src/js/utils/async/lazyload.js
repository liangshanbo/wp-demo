'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    name:lazyload.js
    description:数据懒加载
    anthor:wanglonghai
    data:2016-11-19
 */
define("utils/async/lazyload", function (require, exports, module) {
	require('lib/polyfill/array.js');
	require('lib/polyfill/object.js');

	var LazyLoad = function () {
		/*懒加载*/
		function LazyLoad() {
			_classCallCheck(this, LazyLoad);

			this.defaults = {
				winHeight: window.innerHeight,
				//loading: wapcsspath + '/images/loading-1.gif',
				lazyImg: wapcsspath + '/images/default_product.png'
			};
			this._lazyload();
			this._ListenerScroll();
		}

		_createClass(LazyLoad, [{
			key: 'init',
			value: function init(options) {
				this.defaults = Object.assign(this.defaults, options);
			}
		}, {
			key: 'lazyload',
			value: function lazyload() {
				var self = this;
				setTimeout(function () {
					self._lazyload();
				}, 300);
			}
		}, {
			key: '_ListenerScroll',
			value: function _ListenerScroll() {
				window.addEventListener('scroll', this._lazyload.bind(this), false);
			}
		}, {
			key: '_lazyload',
			value: function _lazyload() {
				var elements = this._lazyLoadElement(),
				    self = this;
				if (!elements && elements.length === 0) {
					return;
				}
				Array.from(elements, function (element) {
					self._beginLoad(element);
				});
			}
		}, {
			key: '_lazyLoadElement',
			value: function _lazyLoadElement() {
				var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'img';

				return document.querySelectorAll(element + '[gome-src]') || false;
			}
		}, {
			key: '_beginLoad',
			value: function _beginLoad(element) {
				var bodyTop = document.body.scrollTop,
				    currentTop = element.scrollTop;
				if (currentTop - bodyTop <= this.defaults.winHeight) {
					this._changeImgPath(element);
				}
			}
		}, {
			key: '_changeImgPath',
			value: function _changeImgPath(element) {
				var img = new Image(),
				    path = element.getAttribute('gome-src') || this.defaults.lazyImg; //element.getAttribute('data-url') || element.getAttribute('data-src') ||
				element.removeAttribute('gome-src');
				img.onload = function () {
					element.setAttribute('src', path);
				};
				img.src = path;
			}
		}]);

		return LazyLoad;
	}();

	module.exports = new LazyLoad();
});
//# sourceMappingURL=../../../maps/utils/async/lazyload.js.map
