chrome.tabs.getSelected(null, function(tab) {
	create(tab.url);
});

function isExit(selector){
	return !!document.querySelector(selector);
}
function create(url){
	if(isExit('.qrcode_element')){
		sl('.qrcode_element').style.display = "block";
		return false;
	}
	let qrcode_element = document.createElement('div');
	qrcode_element.className = 'qrcode_element';
	qrcode_element.innerHTML = '<div id="qrcode_box"></div>';
	document.body.appendChild(qrcode_element);
	$("#qrcode_box").qrcode({ 
	    render: "canvas", //canvas 
	    width: 200, //宽度 
	    height:200, //高度 
	    text: url //任意内容 
	}); 
}

function sl(selector){
	return document.querySelector(selector);
}