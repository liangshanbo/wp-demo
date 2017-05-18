// let views = chrome.extension.getViews();

// chrome.browserAction.setTitle({title:'宝宝的音乐盒'});
// chrome.browserAction.setBadgeText({text:'box'});
// chrome.browserAction.setIcon({path:'./images/face_24.png'});

// for(let i=0,view;view = views[i++];){
// 	console.log(view);
// }

let geolocation = navigator.geolocation;
let options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
}
geolocation.getCurrentPosition(success,fail,options);

function success(pos){
	console.log(pos.timestamp);
	let coords = pos.coords;
	console.log('经度：'+ coords.longitude);
	console.log('纬度：'+ coords.latitude);
	console.log('高程：'+ coords.altitude);
	console.log('精度：'+ coords.accuracy + 'm');
	// console.log('精度：'+ coords.latitude);
}

function fail(e){
	console.log(e.code + '|' + e.message);
}

let menuId = chrome.contextMenus.create({
						'title':'musicBox',
						'contexts':['page','image'],
						'onclick':clickFun
					},function(){
						console.log('musicBox click');
					});

function clickFun(info,tab){
	console.dir(info);
	console.dir(tab);
}