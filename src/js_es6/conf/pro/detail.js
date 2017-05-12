/**
 * title: 商品详情
 * author: wangchunpeng
 * time: 2017-02-20 
 */
define('conf/pro/detail.js', function(require, exports, module) {
	require('$');
	const login = require('mods/login');
	const UI = require('UI/dialog/alert');
	const ajax = require('utils/async/ajax');
	const Swiper = require('mods/swiper.js');
	const cookie = require('mods/storage/cookie.js');
	const Share = require('mods/share/shareDialog');
	const g_detail = {
		btns: {
			buy: $('#buy'),
			like: $('#like'),
			share: $('#share'),
			layerBtn: $('#proDetailLayer'),
			layer: $('#goodDetailLayer'),
			closeLayer:$('#closeLayer'),
			showList:$('#showList'),
			select:$('#select'),
			confirm:$('#confirm')
		},
		thirdParty:$('#third_party'),
		params:getParams(),
		fns: {
			init: init
		},
		skus:$('#skus')
	};

	g_detail.fns.init();
	let share = new Share({
		bindEvent:g_detail.btns.share,
		shareId:$(".detail").attr('data-id'),
		title:$('.detail-title').text(),
		hashtag:'#GOMEPLUS'
	});
	function init() {
		//处理未登录收藏的逻辑
		if(cookie.getCookie('collect') === "1"){
			var collect = g_detail.btns.like.attr('collect');
			if(collect == "1"){
				UI.alertSecond("success");
				cookie.setCookie('collect',"0",1/(24*10*6));
			}else{
				collection(g_detail.params.id,g_detail.btns.like);
			}
		}
		if($('#swiper-banner').children().length>1){
			new Swiper ('.carousel', {
				loop: true,
				// 如果需要分页器
				lazyLoading:true,//解决轮播到最后再划显示默认图
				pagination: '.swiper-pagination',
				onInit:function(){
					require('utils/async/lazyload.js');
				},
				autoplay:3000
			});
		}else{
			require('utils/async/lazyload.js');
		}

		bindEvent();
	}

	function bindEvent() {
		g_detail.btns.buy.on('click', () => {
			login.isLogin(() => {
				if(cookie.getCookie('third_layer')){
					let url = g_detail.btns.buy.attr('data-url') + '&affExtParam1='+userId;
					location.assign(url || '/');
				}else{
					g_detail.thirdParty.show();
				}
			});
		});
		g_detail.btns.like.on('click', () => {
			let collect = g_detail.btns.like.attr('collect'),
				url = location.pathname+location.search;
			login.isLogin(() => {
				if(collect === "0"){
					collection(g_detail.params.id,g_detail.btns.like);
					return ;
				}
				cancelCollection(g_detail.params.id,g_detail.btns.like)
			},url,"&type=collect");
		});
		// g_detail.btns.share.on('click',function (){
		// 	console.log(share);
		// 	share._show();
		// });
		g_detail.btns.layerBtn.on('click', () => {
			let amount = g_detail.btns.layerBtn.attr('amount');
			if(amount>100){
				g_detail.btns.layer.show();
			}
		});
		g_detail.btns.closeLayer.on('click', () => {
			g_detail.btns.layer.hide();
		});
		if(g_detail.btns.showList.length>0){
			g_detail.btns.showList.on('click', () => {
				let isShow = g_detail.skus.attr("isShow");
				if(isShow === "1"){
					g_detail.skus.attr("isShow","0").find('li').each(function(){
						if($(this).children('span').children().length>4){
							$(this).children('span').children().each(function(){
								if($(this).index()>3){
									$(this).hide();
								}
							})
						}
						if($(this).index()>3){
							$(this).hide();
						}
					});
					return ;
				}
				g_detail.skus.attr("isShow","1").find('li,a,del').show()
			});
		}
		/*弹层*/
		g_detail.btns.select.on('click',function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				return;
			}
			$(this).addClass('active');
		});
		g_detail.btns.confirm.on('click',function(){
			let url = g_detail.btns.buy.attr('data-url') + '&affExtParam1='+userId;
			if(g_detail.btns.select.hasClass('active')){
				cookie.setCookie('third_layer',1,9999);
			}
			location.assign(url || '/');
		})
	}
	function collection(id,dom){
		ajax.post({
			url: '/api/user/item?itemId=' + id,
			success: function (data) {
				if(data.code === 200){
					dom.attr('collect','1').children('i').addClass('active');
					UI.alertSecond("success")
				}
			},
			error:function(data){
				UI.alertSecond(data.message)
			}
		})
	}
	function cancelCollection(id,dom){
		ajax.delete({
			url: '/api/user/item',
			data: {itemId: id},
			success: function (data) {
				if(data.code === 200){
					dom.attr('collect','0').children('i').removeClass('active');
					UI.alertSecond("Cancel success")
				}
			},
			error:function(data){
				UI.alertSecond(data.message)
			}
		})
	}
	function getParams(url) { //获取url传递的参数*/
		var obj = {};
		url = url || location.search;
		url = /^\?.*/i.test(url) ? url.substr(1) : url;
		var arr = url.split("&");
		for (var i = 0, l = arr.length; i < l; i++) {
			var res = arr[i].split("=");
			obj[res[0]] = res[1]
		}
		return obj;

	}
});