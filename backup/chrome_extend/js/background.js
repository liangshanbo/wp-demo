chrome.contextMenus.create({
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

chrome.cookies.getAll({
	url:'https://m.gomeplus.com/'
},function(cookies){
	console.dir(cookies);
});