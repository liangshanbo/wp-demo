/*
    name:dropload.js
    description:上拉加载更多
    anthor:luoxiaowei
    data:2016-11-08
 */
define("utils/async/dropload", function(require, exports, module) {

	require('lib/polyfill/array.js');
	require('lib/polyfill/object.js');
	let Ajax = require('utils/async/ajax.js'),
		ll = require('utils/async/lazyload.js'),
		current_element = null;

	class DropLoad {

		upload(selector, url, params, callback, options) {
			let element = document.querySelector(selector);
			if (element) {
				let isGoOn = this._init(element, url, params, callback, options);
				if(isGoOn){
					this._addListener();
				}
			} else {
				console.log('error:no selected element');
				return false;
			}
		}

		lazyload() {
			ll._lazyload();
		}

		finished(len) {
			this._loadover(len);
		}

		setParams(options){
			this.params = Object.assign(this.params,options);
		}

		currentPage(){
			return this.params.pageNum;
		}

		_init(element, url, params, callback, options) {
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
			if(this._checkFirstList()){
				return false;
			}
			this._addLoading();
			if(this.current && this.params.pageNum === 2){
				if(document.body.scrollTop + window.innerHeight === document.body.offsetHeight){
					this._loadSource();
				}
			}
			return true;
		}

		_addListener() {
			let x, y, self = this;
			this.current.addEventListener('touchstart', e => {
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}, false);
			this.current.addEventListener("touchend", e => {
				current_element = e.target;
				// let durationX = e.changedTouches[0].pageX - x;
				let durationY = e.changedTouches[0].pageY - y;
				if (Math.abs(durationY) > 0) {
					self._attachFun();
				}
			}, false);
			if (this.defaults.isFirst) {
				this._loadSource();
			}
		}

		_attachFun() {
			if (this.isFinished) {
				// this._loadover();
				return false;
			}
			if (this.isLoading) {
				return false;
			}
			this._doLoad();
		}

		_doLoad() {
			let srollTop = document.body.scrollTop,
				height = document.body.offsetHeight,
				innerH = window.innerHeight,
				range = parseFloat(innerH) * 2,
				totalheight = range + parseFloat(srollTop);
			if (totalheight + range >= height) {
				this._showLoading();
				this._loadSource();
			}
		}

		_loadSource() {
			Ajax.loadmore(this.url, this.params, this.callback, this._before.bind(this), this._after.bind(this));
		}

		_before() {
			this._hideLoading();
		}

		_after() {
			this.params.pageNum++;
			setTimeout(function() {
				ll._lazyload();
			}, 300);
		}

		_addLoading() {
			if (this.loadDiv) {
				return;
			} else {
				this._createLoading();
			}
		}

		_createLoading() {
			if(this.loadDiv){
				return;
			}
			if (this.current) {
				let parent = this.current.parentNode,
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

		_showLoading() {
			this.loadDiv.style.display = 'block';
			this.isLoading = true;
		}

		_hideLoading() {
			this.loadDiv.style.display = 'none';
			this.isLoading = false;
		}

		_loadover(len) {
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
			if(this.params.pageNum === 1 && len === 0){
				this.loadDiv.style.display = 'none';
			}
			this.isFinished = true;
		}

		_checkFirstList(){
			if(this.current.tagName.toUpperCase() === 'UL' && !this.defaults.isFirst){
				var childCount = 0;
				Array.prototype.slice.call(this.current.childNodes).map(function(el){
					if(el.nodeType === 1 && el.tagName.toUpperCase() === 'LI'){
						childCount++;
					}
				});
				if(childCount < this.params.pageSize){
					return true;
				}
			}
			return false;
		}
	}

	module.exports = DropLoad;
})