/*
    name:storage_model.js
    description:本地存储localstorage
    anthor:luoxiaowei
    data:2016-11-04
 */

define("mods/storage/storage.js", function(require, exports, module) {
	let UI_alert = require('UI/dialog/alert');

	let bSet = () => {
		try {
			localStorage.setItem("h5test", 'a');
			localStorage.removeItem("h5test");
		} catch (e) {
			UI_alert.alertSecond("当前浏览器不支持本地存储,请换用别的浏览器");
			return false;
		}
		return true;
	}

	// let bGet = () => {
	// 	try {
	// 		localStorage.getItem("h5test");
	// 	} catch (e) {
	// 		UI_alert.alertSecond("当前浏览器不支持本地存储,请换用别的浏览器");
	// 		return false;
	// 	}
	// 	return true;
	// };

	let setItem = (name, val) => {
		if (!bSet) {
			return;
		}
		var value = val;
		if(val && val instanceof Object){
			value = JSON.stringify(val);
		}
		window.localStorage.setItem(name,value);
	};

	let getItem = name => {
		if(!bSet){
			return;
		}
		let item = localStorage.getItem(name);
    	try{
			if(item.indexOf('{') === 0 || item.indexOf('[') === 0){
				return JSON.parse(item);
			}else{
				return item;
			}
		}catch(e){
			return item;
		}
	};

	let removeItem = name => {
		let item = getItem(name);
		item ? window.localStorage.removeItem(name) : '';
	};

	let clear = () => {
		window.localStorage.clear();
	};

    module.exports = {setItem,getItem,removeItem,clear};
});