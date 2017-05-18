chrome.contextMenus.create({type:'normal',title:'生成二维码',contexts:['page','image'],onclick:clickFun},function(){console.log('qrcode loaded');});
let target = null;
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	if(request.ready === true){
		sendResponse({ready:true});
		console.log(request.ready);
	}
});

function clickFun(info,tab){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {qrcode: true}, function(response) {
		  // console.log(response.res);
		});
	});
}

