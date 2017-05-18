chrome.devtools.panels.create("gomeplus","images/music_box_16.png","panel.html",
function(panel) {
	panel.createStatusBarButton("images/music_box_16.png", "pre.gomeplus", true);
	panel.onShown.addListener(function(win) {
		let doc = win.document;
		alert(doc.querySelector('h1').innerHTML);
	});
});

chrome.devtools.panels.setOpenResourceHandler(function(){
	
});


console.dir(chrome.devtools);

function forObj(){

}