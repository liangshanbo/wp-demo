'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 分享弹层
 * @author lixuefeng
 * @date 20170306
 * 页面引用
 * "疲疲瞎！我们走！"
 *	<% include ../public/shareDialog.ejs %>
 *	let Share = require('mods/share/shareDialog');
 *	let share = new Share(options);
 *	options {
 	bindEvent		/node		分享按钮 或调用 share.share_show() 弹出分享组件
 		new Share({bindEvent:[your share btn],options...});
 		or new Share();share.share_show(options);
	method  		/string		分享类型
	display			/string		分享模组类型
	mobile_iframe	/boolen		true：弹层分享/false:新页面分享 默认false;
	href			/string		链接
	picture			/string		图片地址完整路径
	title 			/string		标题
	description		/string		描述
	caption 		/string		来源
	quote 			/string		引用
	hashtag 		/string		标签
	success 		/function	成功时回调
	failed 			/function	失败时回调

	shareType 		/string		分享类型//用于数据上报接口 //"productInfoShare"
	shareId 		/string		分享商品ID//用于数据上报与分享成功接口//""
	shareTarget 	/string		分享方式//用于数据上报接口//"FACEBOOK"
 *	}
 *	share.layer_show();
 *	share.layer_hide();	展开/隐藏 分享组件
 *	share.add_box();
 *	share.remove_box();	显示/移除 成功toast
*/
define('mods/share/shareDialog.js', function (require, exports, module) {
	require('$');
	require("lib/zeptojs/fx");
	var UI = require('UI/dialog/alert.js'),
	    dialog_com = require('UI/dialog/dialog_com.js'),
	    login = require('mods/login'),
	    storage = require('mods/storage/storage'),
	    ajax = require('utils/async/ajax.js'),
	    dialogStr = "<header class='slot_header'><div class='slot_header_content' id='slot_cancel'>Shared Successfully!<em>X</em></div></header><article class='slot_main'><div class='slot_main_texts'><p>Play the slot machine to win rupee!</p></div><div class='slot_main_confirm'><a href='' id='slot_go'>GO</a></div></article>";
	var $shareLayer = $('#share_layer'),
	    $mask = $("#share_mark"),
	    $dom = {
		shareFacebook: $shareLayer.find('#share_facebook'),
		shareTwitter: $shareLayer.find('#share_twitter'),
		shareWhatsapp: $shareLayer.find("#share_whatsapp"),
		copyLink: $shareLayer.find('#share_copylink'),
		shareDialog: $shareLayer.find('#share_dialog')
		// shareExit:$shareLayer.find('#share_exit')
	};
	var param = {},
	    img_Format = function img_Format(src) {
		var arr = [],
		    index = 0;
		arr[src.indexOf('jpg')] = 1;
		arr[src.indexOf('png')] = 1;
		arr[src.indexOf('gif')] = 1;
		for (var i in arr) {
			if (arr[i] === 1) {
				index = i;
				break;
			}
		};
		if (index == -1) {
			return src + '.jpg.600x315zf.jpg';
		}
		return src.substring(0, parseInt(index) + 3) + '.600x315zf.jpg';
	};

	var Share = function () {
		function Share(options) {
			var _this = this;

			_classCallCheck(this, Share);

			this.picSet = false;
			this.bindTarget = options && options.bindEvent ? options.bindEvent : undefined;
			this.shareType = options && options.shareType ? options.shareType : "productInfoShare";
			this.shareId = options && options.shareId ? options.shareId : "";
			this.shareTarget = options && options.shareTarget ? options.shareTarget : "FACEBOOK";
			this.type = options && options.type ? options.type : undefined;
			this.btnType = options && options.btnType ? options.btnType : undefined; // 只有一个分享按钮时,传参facebook twitter whatsapp copylink
			this.sendData = {};
			if (options && options.picture) {
				this.sendData.picture = options.picture;
				this.picSet = true;
			}
			this.sendData.method = options && options.method ? options.method : 'feed';
			this.sendData.display = options && options.display ? options.display : 'touch';
			this.sendData.link = options && options.href ? options.href : location.href.indexOf('?') === -1 ? location.href + '?&uerId=' + userId : location.href + '&uerId=' + userId;
			this.sendData.title = options && options.title ? options.title : $('title').text();
			this.sendData.description = options && options.description ? options.description : ' ';
			this.sendData.hashtag = options && options.hashtag ? options.hashtag : null;
			this.sendData.quote = options && options.quote ? options.quote : null;
			this.sendData.mobile_iframe = true;
			this.sendData.caption = options && options.caption ? options.caption : 'gomeplus.in';
			this.success = options && options.success ? options.success : this.fb_success;
			this.failed = options && options.failed ? options.failed : this.fb_failed;
			this.share_show = function () {
				var _self = _this;
				if (hasLogin) {
					storage.removeItem('share_login');
					_self.remove_box();
					_self.layer_show();
				} else {
					storage.setItem('share_login', 'true');
					login.isLogin();
				}
			};
			this.init();
		}

		_createClass(Share, [{
			key: 'FB_init',
			value: function FB_init() {
				window.fbAsyncInit = function () {
					FB.init({
						appId: '125552021295455',
						xfbml: true,
						version: 'v2.8'
					});
					FB.AppEvents.logPageView();
				};
				(function (d, s, id) {
					var js,
					    fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);js.id = id;
					js.src = "https://drl8vxuq8vzq2.cloudfront.net/public/overseasJS/src/plugs/third/v1/fbsdk.js";
					fjs.parentNode.insertBefore(js, fjs);
				})(document, 'script', 'facebook-jssdk');
			}
		}, {
			key: 'init',
			value: function init() {
				var _self = this;
				_self.FB_init();
				$shareLayer.hide();
				var share_login = storage.getItem('share_login');
				if (hasLogin && share_login && share_login === 'true') {
					storage.removeItem('share_login');
					// _self.fb_getAuthor({data:_self});
				}
				_self.bindEvent();
				$(function () {
					// 暂时用cdn上的clipboard.js
					var script = document.createElement('script');
					script.async = "async";
					script.src = 'https://cdn.jsdelivr.net/clipboard.js/1.6.1/clipboard.min.js';
					document.getElementsByTagName("head")[0].appendChild(script);
					script.onload = function () {
						$dom.copyLink.attr('data-clipboard-text', location.href + '&userId=' + userId);
						// require('utils/clipboard.js');
						var clipboard = new Clipboard('#share_copylink');
						clipboard.on('success', function (e) {
							_self.layer_hide();
							UI.alertSecond("copied");
							e.clearSelection();
						});
						clipboard.on('error', function (e) {
							_self.layer_hide();
							UI.alertSecond("Copy link failed,Please retry in the address bar");
						});
						if (_self.type === "gif" || _self.type === "video") {
							param = {
								method: _self.sendData.method,
								display: _self.sendData.display,
								link: _self.sendData.link,
								caption: _self.sendData.caption,
								title: _self.sendData.title
							};
							_self.share_btn($dom.shareFacebook);
						} else {
							param = _self.sendData;
							// $('head').append('<meta property="og:image:width" content="1080"><meta property="og:image:height" content="576">');
						};
						if (_self.btnType === "facebook") {
							_self.share_btn($dom.shareFacebook);
						} else if (_self.btnType === "twitter") {
							_self.share_btn($dom.shareTwitter);
						} else if (_self.btnType === "whatsapp") {
							_self.share_btn($dom.shareWhatsapp);
						} else if (_self.btnType === "copylink") {
							_self.share_btn($dom.copyLink);
						}
					};
					//
				});
			}
		}, {
			key: 'layer_show',
			value: function layer_show() {
				$shareLayer.show();
				$dom.shareDialog.animate({ 'bottom': '0px' }, 200);
				return this;
			}
		}, {
			key: 'layer_hide',
			value: function layer_hide(e) {
				$shareLayer.hide();
				return this;
			}
		}, {
			key: 'share_btn',
			value: function share_btn(obj) {
				obj.siblings("li").remove();
				obj.parent('ul').siblings("ul").remove();
				obj.parents(".share-dialog").addClass("on");
			}
		}, {
			key: 'event_mask',
			value: function event_mask(e) {
				$dom.shareDialog.animate({ 'bottom': '-250px' }, 200, $shareLayer.hide());
			}
		}, {
			key: 'add_box',
			value: function add_box() {
				var _self = this;
				if ($('#dialog_slot').length === 0) {
					dialog_com.addElement(dialogStr, 'slot', 'dialog_slot');
					var slotCancel = $('#slot_cancel'),
					    slotGo = $('#slot_go');
					slotCancel.on('click', _self.remove_box);
					slotGo.attr('href', '/');
				};
				return this;
			}
		}, {
			key: 'remove_box',
			value: function remove_box() {
				if ($('#dialog_slot').length > 0) {
					dialog_com.remove('#dialog_slot');
				}
				return this;
			}
		}, {
			key: 'copy_btn',
			value: function copy_btn() {}
		}, {
			key: 'fb_success',
			value: function fb_success() {
				var _self = this;
				window.location.href = location.origin + "/shareSuccess?backUrl=" + encodeURIComponent(location.href) + "&itemId=" + encodeURIComponent(_self.shareId);
			}
		}, {
			key: 'fb_failed',
			value: function fb_failed(msg) {
				if (msg && msg != undefined) {
					UI.alertSecond(msg);
				} else {
					UI.alertSecond('Failed');
				}
			}
		}, {
			key: 'fb_upload',
			value: function fb_upload(data) {
				var _self = this;
				ajax.post({
					url: '/api/user/shareAction',
					data: data,
					success: function success(data, textStatus, request) {
						if (data.code == 200) {
							console.log("Report completed");
							// _self.success();
						} else {
							console.log('shareActionFailed');
						}
					},
					error: function error() {
						console.log('shareActionError');
					}
				});
			}
		}, {
			key: 'fb_share',
			value: function fb_share() {
				var _self = this;
				if (!_self.picSet && _self.type != "gif" && _self.type != "video") {
					_self.sendData.picture = img_Format($('img')[0].getAttribute('src'));
				}
				FB.ui(param, function (response, res) {
					$shareLayer.hide();
					storage.removeItem('share_login');
					var time = new Date().getTime(),
					    uploadData = {
						"shareType": _self.shareType,
						"data": {
							"id": _self.shareId
						},
						"target": _self.shareTarget,
						"shareTime": time
					};
					if (response && response != undefined) {
						if (response.error_code != undefined) {
							if (response.error_message.indexOf('canceled') > -1) {
								_self.failed('Cancelled');
							} else {
								_self.failed();
							}
						} else {
							_self.fb_upload(uploadData);
							_self.success();
						}
					} else {
						_self.failed();
					}
				});
			}
		}, {
			key: 'fb_getAuthor',
			value: function fb_getAuthor(e) {
				var _self = e ? e.data : this;
				if (FB.length === 0) {
					UI.alertSecond('Failed');
				}
				FB.getLoginStatus(function (response) {
					if (response.status === 'connected') {
						var accessToken = response.authResponse.accessToken,
						    //response from getLoginStatus
						FB_userId = response.authResponse.userID;
						_self.fb_share(accessToken, FB_userId);
					} else {
						FB.login(function (response) {
							var accessToken = response.authResponse.accessToken,
							    //response from login
							FB_userId = response.authResponse.userID;
							_self.fb_share(accessToken, FB_userId);
						}, { scope: "publish_actions,user_posts" });
					}
				});
			}
		}, {
			key: 'twitter_btn',
			value: function twitter_btn(e) {
				var _self = e ? e.data : this,
				    url = 'https://twitter.com/intent/tweet?text=' + _self.sendData.title + '&url=' + encodeURIComponent(_self.sendData.link);
				window.open(url, 'share');
			}
		}, {
			key: 'whatsapp_btn',
			value: function whatsapp_btn(e) {
				var _self = e ? e.data : this;
				location.href = "whatsapp://send?text= " + _self.sendData.title + "     " + encodeURIComponent(_self.sendData.link);
			}
		}, {
			key: 'bindEvent',
			value: function bindEvent() {
				var _self = this;
				if (_self.bindTarget != undefined) {
					if (_self.bindTarget instanceof $) {
						_self.bindTarget.on('click', _self.share_show);
					} else {
						$(_self.bindTarget).on('click', _self.share_show);
					}
				}
				$dom.shareFacebook.on('click', _self, _self.fb_getAuthor);
				$dom.shareTwitter.on('click', _self, _self.twitter_btn);
				$dom.shareWhatsapp.on('click', _self, _self.whatsapp_btn);
				$dom.copyLink.on('click', _self.copy_btn);
				// $dom.shareExit.on('click',_self.layer_hide);
				$mask.on('click', _self.event_mask);
			}
		}]);

		return Share;
	}();

	module.exports = Share;
});
//# sourceMappingURL=../../../maps/mods/share/shareDialog.js.map
