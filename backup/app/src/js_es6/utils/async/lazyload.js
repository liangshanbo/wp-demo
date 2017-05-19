/*
    name:lazyload.js
    description:数据懒加载
    anthor:wanglonghai
    data:2016-11-19
 */
define("utils/async/lazyload", function(require, exports, module) {
	require('lib/polyfill/array.js');
	require('lib/polyfill/object.js');
	
	class LazyLoad {
		/*懒加载*/
		constructor(){
			this.defaults = {
				winHeight: window.innerHeight,
				loading: wapcsspath + '/images/loading-1.gif',
				lazyImg: wapcsspath + '/images/default_product.png'
			}
			this._lazyload();
			this._ListenerScroll();
		}
		init(options){
			this.defaults = Object.assign(this.defaults,options);
		}
		lazyload(){
			var self = this;
			setTimeout(function(){
				self._lazyload();
			},300);
		}
		_ListenerScroll(){
			window.addEventListener('scroll',this._lazyload.bind(this),false);
		}
		_lazyload(){
			let elements = this._lazyLoadElement(),self = this;
			if(!elements && elements.length === 0){
				return;
			}
			Array.from(elements,element => {
				self._beginLoad(element);				
			});
		}
		_lazyLoadElement(element='img'){
			return document.querySelectorAll(element+'[data-url]') || false;
		}
		_beginLoad(element){
			let bodyTop = document.body.scrollTop,currentTop = element.scrollTop;
			if(currentTop - bodyTop <= this.defaults.winHeight){
				this._changeImgPath(element);
			}
		}
		_changeImgPath(element){
			let img = new Image(),
				path = element.getAttribute('data-url') || element.getAttribute('gome-src') || element.getAttribute('data-src') || this.defaults.lazyImg;
			element.removeAttribute('data-url');
			img.onload = function(){
				element.setAttribute('src',path);
			}
			img.src = path;
		}
	}
	module.exports = new LazyLoad();
})