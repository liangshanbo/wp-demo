'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 原生选择器
 * @author wanglonghai
 * @date 20161125
 * 选择器
 </script>
 */
define('mods/selector', function (require, exports, module) {

	require('lib/polyfill/string');
	var type = require('mods/type');
	var doc = window.document,
	    selector_obj = void 0;

	var FastClick = function () {
		function FastClick(elment, fn) {
			_classCallCheck(this, FastClick);

			this.firstX = 0;
			this.firstY = 0;
			this.tapDelay = 20;
			this.tapTimeout = 700;
			this.lastClickTime = 0;
			this.trackingClickStart = 0;
			this.clickEvent = null;
			this.init(element, fn);
		}

		_createClass(FastClick, [{
			key: 'init',
			value: function init(element, fn) {
				this.clickEvent = fn;
				element.onclick = null;
				element.addEventListener('touchstart', this.ontouchstart.bind(this), false);
				element.addEventListener('touchend', this.ontouchend.bind(this), false);
			}
		}, {
			key: 'ontouchstart',
			value: function ontouchstart(event) {
				if (event.targetTouches.length > 1) {
					return true;
				}
				if (event.timeStamp - this.lastClickTime < this.tapDelay) {
					event.preventDefault();
					return true;
				}
				touch = event.targetTouches[0];
				this.firstX = touch.pageX;
				this.firstY = touch.pageY;
				this.trackingClickStart = event.timeStamp;
			}
		}, {
			key: 'ontouchend',
			value: function ontouchend(event) {
				if (event.timeStamp - this.lastClickTime < this.tapDelay) {
					return true;
				}

				if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
					return true;
				}
				if (Math.abs(event.pageX - this.firstX) > 10 || Math.abs(event.pageY - this.firstY)) {
					return true;
				}
				this.clickEvent(event);
				this.trackingClickStart = 0;
				this.lastClickTime = event.timeStamp;
			}
		}]);

		return FastClick;
	}();

	var Base = function () {
		function Base(elements) {
			_classCallCheck(this, Base);

			this.elements = this._init(elements);
			this.element = this.elements && this.elements[0];
		}

		_createClass(Base, [{
			key: '_each',
			value: function _each(fn) {
				this.elements.map(fn);
			}
		}, {
			key: '_init',
			value: function _init(elements) {
				if (elements) {
					if (length in elements) {
						return Array.prototype.slice.call(elements);
					}
					return [elements];
				}
				return false;
			}
		}, {
			key: '_checkName',
			value: function _checkName(name) {
				return !!(arguments.length === 1 && type.isString(name));
			}
		}]);

		return Base;
	}();

	var Events = function (_Base) {
		_inherits(Events, _Base);

		function Events() {
			_classCallCheck(this, Events);

			return _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).apply(this, arguments));
		}

		_createClass(Events, [{
			key: 'click',
			value: function click(fn) {
				this.on('click', fn);
			}
		}, {
			key: 'tap',
			value: function tap(fn) {
				this.on('tap', fn);
			}
		}, {
			key: 'keyup',
			value: function keyup(fn) {
				this.on('keyup', fn);
			}
		}, {
			key: 'keydown',
			value: function keydown(fn) {
				this.on('keydown', fn);
			}
		}, {
			key: 'on',
			value: function on(type, fn) {
				if ((type === 'click' || type === 'tap') && 'ontouchstart' in window) {
					this._each(function (element) {
						new FastClick(element, fn);
					});
				} else {
					this._each(function (element) {
						element.addEventListener(type, fn, false);
					});
				}
			}
		}]);

		return Events;
	}(Base);

	var OPClass = function (_Events) {
		_inherits(OPClass, _Events);

		function OPClass() {
			_classCallCheck(this, OPClass);

			return _possibleConstructorReturn(this, (OPClass.__proto__ || Object.getPrototypeOf(OPClass)).apply(this, arguments));
		}

		_createClass(OPClass, [{
			key: 'addClass',
			value: function addClass(value) {
				if (arguments.length === 1) {
					this._each(function (element) {
						element.classList.add(value);
					});
				}
				return this;
			}
		}, {
			key: 'hasClass',
			value: function hasClass(name) {
				if (this._checkName(name)) {
					return this.element.classList.contains(name);
				}
			}
		}, {
			key: 'removeClass',
			value: function removeClass(name) {
				if (this._checkName(name)) {
					this._each(function (element) {
						element.classList.remove(name);
					});
				}
				return this;
			}
		}]);

		return OPClass;
	}(Events);

	var Attr = function (_OPClass) {
		_inherits(Attr, _OPClass);

		function Attr() {
			_classCallCheck(this, Attr);

			return _possibleConstructorReturn(this, (Attr.__proto__ || Object.getPrototypeOf(Attr)).apply(this, arguments));
		}

		_createClass(Attr, [{
			key: 'attr',
			value: function attr(name, value) {
				if (arguments.length === 1 || typeof value === 'undefined') {
					if (this.element.hasAttribute(name)) {
						var temp_value = this.element.getAttribute(name);
						if (/^(\{|\[).*(\}|\])$/.test(temp_value)) {
							try {
								return JSON.parse(temp_value);
							} catch (e) {
								console.log('JSON.parse error');
								return temp_value;
							}
						}
						return temp_value;
					} else {
						return false;
					}
				} else if (arguments.length === 2) {
					value = type.isObject(value) ? JSON.stringify(value) : value;
					this._each(function (element) {
						element.setAttribute(name, value);
					});
				}
				return this;
			}
		}, {
			key: 'removeAttr',
			value: function removeAttr(name) {
				if (this._checkName(name)) {
					this._each(function (element) {
						element.removeAttribute(name);
					});
				}
				return this;
			}
		}, {
			key: 'data',
			value: function data(name, value) {
				return this._dataset(name, value);
			}
		}, {
			key: '_dataset',
			value: function _dataset(name, value) {
				if ('dataset' in this.element) {
					var ds = this.element.dataset;
					if (type.isType('DOMStringMap')(ds)) {
						if (typeof value === 'undefined') {
							return name in ds ? ds[name] : false;
						} else if (arguments.length === 2) {
							ds[name] = value;
							return this;
						}
					}
					return this.attr('data-' + name, value);
				}
				return this.attr('data-' + name, value);
			}
		}]);

		return Attr;
	}(OPClass);

	var Css = function (_Attr) {
		_inherits(Css, _Attr);

		function Css() {
			_classCallCheck(this, Css);

			return _possibleConstructorReturn(this, (Css.__proto__ || Object.getPrototypeOf(Css)).apply(this, arguments));
		}

		_createClass(Css, [{
			key: 'css',
			value: function css(name, value) {
				var _this5 = this;

				if (arguments.length === 1) {
					if (type.isObject(name)) {
						var _loop = function _loop(key) {
							_this5._each(function (element) {
								element.style[key] = name[key];
							});
						};

						for (var key in name) {
							_loop(key);
						}
					} else if (type.isString(name)) {
						return this.element.style[name];
					}
				} else if (arguments.length === 2) {
					this._each(function (element) {
						element.style[name] = value;
					});
				}
				return this;
			}
		}]);

		return Css;
	}(Attr);

	var Elements = function (_Css) {
		_inherits(Elements, _Css);

		function Elements() {
			_classCallCheck(this, Elements);

			return _possibleConstructorReturn(this, (Elements.__proto__ || Object.getPrototypeOf(Elements)).apply(this, arguments));
		}

		_createClass(Elements, [{
			key: 'each',
			value: function each(fn) {
				this._each(function (element) {
					fn.bind(element)();
				});
			}
		}, {
			key: 'width',
			value: function width(w) {
				return this._WH(w, 'offsetWidth');
			}
		}, {
			key: 'height',
			value: function height(h) {
				return this._WH(h, 'offsetHeight');
			}
		}, {
			key: 'show',
			value: function show() {
				this._each(function (element) {
					element.style.display = 'block';
				});
				return this;
			}
		}, {
			key: 'hide',
			value: function hide() {
				this._each(function (element) {
					element.style.display = 'none';
				});
				return this;
			}
		}, {
			key: 'html',
			value: function html(hm) {
				return this._WH(hm, 'innerHTML');
			}
		}, {
			key: 'text',
			value: function text(tt) {
				return this._WH(tt, 'innerText');
			}
		}, {
			key: 'first',
			value: function first() {
				return this._dom('firstElementChild');
			}
		}, {
			key: 'last',
			value: function last() {
				return this._dom('lastElementChild');
			}
		}, {
			key: 'next',
			value: function next() {
				return this._dom('nextElementSibling');
			}
		}, {
			key: 'previous',
			value: function previous() {
				return this._dom('previousElementSibling');
			}
		}, {
			key: 'parent',
			value: function parent() {
				return this._dom('parentNode');
			}
		}, {
			key: 'append',
			value: function append(el) {
				if (!this._insert('beforeend', el)) {
					this.element.appendChild(this._docFrag(el));
				}
				return this;
			}
		}, {
			key: 'before',
			value: function before(el) {
				if (!this._insert('afterbegin', el)) {
					this.element.appendChild(this._docFrag(el), this.element.firstElementChild);
				}
				return this;
			}
		}, {
			key: 'remove',
			value: function remove() {
				if (this.element) {
					this.element.parentNode.removeChild(this.element);
				}
				return this;
			}
		}, {
			key: 'children',
			value: function children() {
				return selector_obj.select(this.element.children);
			}
		}, {
			key: 'find',
			value: function find(sel) {
				return selector_obj.select(sel, this.element);
			}
		}, {
			key: '_WH',
			value: function _WH(WorH, name) {
				if (typeof WorH === 'undefined') {
					return this.element[name];
				} else {
					this.element[name] = WorH;
					return this;
				}
			}
		}, {
			key: '_dom',
			value: function _dom(name) {
				return this.element[name] ? new Elements(this.element[name]) : false;
			}
		}, {
			key: '_insert',
			value: function _insert(pos, text) {
				if (type.isString(text) && 'insertAdjacentHTML' in this.element) {
					this.element.insertAdjacentHTML(pos, text);
					return true;
				}
				return false;
			}
		}, {
			key: '_docFrag',
			value: function _docFrag(elements) {
				if ('length' in elements) {
					var df = new DocumentFragment(),
					    len = elements.length;
					for (var i = 0; i < len; i++) {
						var el = elements[i];
						df.appendChild(el);
					}
					return df;
				}
				return elements;
			}
		}]);

		return Elements;
	}(Css);

	var Selector = function () {
		function Selector() {
			_classCallCheck(this, Selector);

			this.cache = {};
		}

		_createClass(Selector, [{
			key: 'select',
			value: function select(selector) {
				var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;

				var ele = selector;
				if (type.isString(selector)) {
					selector = selector.trim();
					ele = selector.startsWith('#') ? context.querySelector(selector) : context.querySelectorAll(selector);
				}
				return ele ? new Elements(ele) : false;
			}
		}]);

		return Selector;
	}();

	selector_obj = new Selector();
	module.exports = function (selector, context) {
		return selector_obj.select(selector, context);
	};
});
//# sourceMappingURL=../../maps/mods/selector.js.map
