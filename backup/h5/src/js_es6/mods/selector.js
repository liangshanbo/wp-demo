/**
 * 原生选择器
 * @author wanglonghai
 * @date 20161125
 * 选择器
 </script>
 */
define('mods/selector', function(require, exports, module) {

	require('lib/polyfill/string');
	const type = require('mods/type');
	let doc = window.document,
		selector_obj;

	class FastClick {
		constructor(elment, fn) {
			this.firstX = 0;
			this.firstY = 0;
			this.tapDelay = 20;
			this.tapTimeout = 700;
			this.lastClickTime = 0;
			this.trackingClickStart = 0;
			this.clickEvent = null;
			this.init(element, fn);
		}

		init(element, fn) {
			this.clickEvent = fn;
			element.onclick = null;
			element.addEventListener('touchstart', this.ontouchstart.bind(this), false);
			element.addEventListener('touchend', this.ontouchend.bind(this), false);
		}

		ontouchstart(event) {
			if (event.targetTouches.length > 1) {
				return true;
			}
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
				return true;
			}
			touch = event.targetTouches[0];
			this.firstX = touch.pageX;
			this.firstY = touch.pageY;
			this.trackingClickStart = event.timeStamp;
		}

		ontouchend(event) {
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
			if (Math.abs(event.pageX - this.firstX) > 10 || Math.abs(event.pageY - this.firstY)) {
				return true;
			}
			this.clickEvent(event);
			this.trackingClickStart = 0;
			this.lastClickTime = event.timeStamp;
		}
	}

	class Base {
		constructor(elements) {
			this.elements = this._init(elements);
			this.element = this.elements && this.elements[0];
		}

		_each(fn) {
			this.elements.map(fn);
		}
		_init(elements) {
			if (elements) {
				if (length in elements) {
					return Array.prototype.slice.call(elements);
				}
				return [elements];
			}
			return false;
		}
		_checkName(name) {
			return !!(arguments.length === 1 && type.isString(name));
		}
	}

	class Events extends Base {

		click(fn) {
			this.on('click', fn);
		}

		tap(fn) {
			this.on('tap', fn);
		}

		keyup(fn) {
			this.on('keyup', fn);
		}

		keydown(fn) {
			this.on('keydown', fn);
		}

		on(type, fn) {
			if ((type === 'click' || type === 'tap') && 'ontouchstart' in window) {
				this._each(function(element) {
					new FastClick(element, fn);
				});
			} else {
				this._each(function(element) {
					element.addEventListener(type, fn, false);
				});
			}

		}
	}

	class OPClass extends Events {

		addClass(value) {
			if (arguments.length === 1) {
				this._each(function(element) {
					element.classList.add(value);
				});
			}
			return this;
		}

		hasClass(name) {
			if (this._checkName(name)) {
				return this.element.classList.contains(name);
			}
		}

		removeClass(name) {
			if (this._checkName(name)) {
				this._each(function(element) {
					element.classList.remove(name);
				});
			}
			return this;
		}
	}

	class Attr extends OPClass {

		attr(name, value) {
			if (arguments.length === 1 || typeof value === 'undefined') {
				if (this.element.hasAttribute(name)) {
					let temp_value = this.element.getAttribute(name);
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
				this._each(function(element) {
					element.setAttribute(name, value);
				});
			}
			return this;
		}

		removeAttr(name) {
			if (this._checkName(name)) {
				this._each(function(element) {
					element.removeAttribute(name);
				});
			}
			return this;
		}

		data(name, value) {
			return this._dataset(name, value);
		}

		_dataset(name, value) {
			if ('dataset' in this.element) {
				let ds = this.element.dataset;
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
	}

	class Css extends Attr {

		css(name, value) {
			if (arguments.length === 1) {
				if (type.isObject(name)) {
					for (let key in name) {
						this._each(function(element) {
							element.style[key] = name[key];
						});
					}
				} else if (type.isString(name)) {
					return this.element.style[name];
				}
			} else if (arguments.length === 2) {
				this._each(function(element) {
					element.style[name] = value;
				});
			}
			return this;
		}
	}

	class Elements extends Css {

		each(fn) {
			this._each(function(element) {
				fn.bind(element)();
			});
		}

		width(w) {
			return this._WH(w, 'offsetWidth');
		}

		height(h) {
			return this._WH(h, 'offsetHeight');
		}

		show() {
			this._each(function(element) {
				element.style.display = 'block';
			});
			return this;
		}

		hide() {
			this._each(function(element) {
				element.style.display = 'none';
			});
			return this;
		}

		html(hm) {
			return this._WH(hm, 'innerHTML');
		}

		text(tt) {
			return this._WH(tt, 'innerText');
		}

		first() {
			return this._dom('firstElementChild');
		}

		last() {
			return this._dom('lastElementChild');
		}

		next() {
			return this._dom('nextElementSibling');
		}

		previous() {
			return this._dom('previousElementSibling');
		}

		parent() {
			return this._dom('parentNode');
		}

		append(el) {
			if (!this._insert('beforeend', el)) {
				this.element.appendChild(this._docFrag(el));
			}
			return this;
		}

		before(el) {
			if (!this._insert('afterbegin', el)) {
				this.element.appendChild(this._docFrag(el), this.element.firstElementChild);
			}
			return this;
		}

		remove() {
			if (this.element) {
				this.element.parentNode.removeChild(this.element);
			}
			return this;
		}

		children() {
			return selector_obj.select(this.element.children);
		}

		find(sel) {
			return selector_obj.select(sel, this.element);
		}

		_WH(WorH, name) {
			if (typeof WorH === 'undefined') {
				return this.element[name];
			} else {
				this.element[name] = WorH;
				return this;
			}
		}

		_dom(name) {
			return this.element[name] ? new Elements(this.element[name]) : false;
		}

		_insert(pos, text) {
			if (type.isString(text) && 'insertAdjacentHTML' in this.element) {
				this.element.insertAdjacentHTML(pos, text);
				return true;
			}
			return false;
		}

		_docFrag(elements) {
			if ('length' in elements) {
				let df = new DocumentFragment(),
					len = elements.length;
				for (let i = 0; i < len; i++) {
					let el = elements[i];
					df.appendChild(el);
				}
				return df;
			}
			return elements;
		}
	}

	class Selector {

		constructor() {
			this.cache = {};
		}

		select(selector, context = doc) {
			let ele = selector;
			if (type.isString(selector)) {
				selector = selector.trim();
				ele = selector.startsWith('#') ? context.querySelector(selector) : context.querySelectorAll(selector);
			}
			return ele ? (new Elements(ele)) : false;
		}
	}

	selector_obj = new Selector();
	module.exports = function(selector, context) {
		return selector_obj.select(selector, context);
	}
})