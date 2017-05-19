/*商品列表发送埋点  huangyihai  17/04/01*/
define('mods/buried_point.js', function (require, exports, module) {
    const $ = require("$"),
        ajax = require('utils/async/ajax.js'),
        cookie = require('mods/storage/cookie.js');
    let point = {};
    class SendPoint {
        constructor() {
            this.defaults = {
                dom: '#goodsList',
                pdPos: 0,
                pType: 0,
                num:0
            };
            this.offset = 0;
            this.move = 0;
            this.data = [];
            this.listTop = 0;
        }

        init(options) {
            let self = this;
            self.defaults = Object.assign(self.defaults, options);
            self._bindEvents();
            self._touchEnd();
        }

        _bindEvents() {
            let self = this;
            if($(self.defaults.dom).find('li').length<=0){
                return;
            }
            self.listTop = parseFloat($(self.defaults.dom).position().top);
            self.itemHeight = $(self.defaults.dom).find('li').eq(0).height();
            document.addEventListener('touchstart', self._touchStart.bind(this), false);
            document.addEventListener('touchmove', self._touchMove.bind(this), false);
            document.addEventListener('touchend', self._touchEnd.bind(this), false);
        }

        _touchStart(event) {
            let self = this;
            self.offset = event.touches[0].clientY;
        }

        _touchMove(event) {
            let self = this;
            self.move = self.offset - event.touches[0].clientY;
        }

        _touchEnd() {
            var self = this;
            if($(self.defaults.dom).find('li').length<=0){
                return;
            }
            let scrollTop = $('body').scrollTop(),
                num = Math.ceil((parseFloat(window.screen.height)+scrollTop - self.listTop) / self.itemHeight);
            if (parseFloat(window.screen.height)+scrollTop - self.listTop > 0 && self.defaults.num < num) {
                for (let i = self.defaults.num; i < num; i++) {
                    let item = $(self.defaults.dom).find('li').eq(i).attr('point-data');
                    if(item){
                        self.data.push(item);
                    }
                }
                //console.log(self.data);
                if(self.data.length>0){
                    ajax.post({
                         url:'/api/recom/log',
                         data:{
                             data:self.data,
                             ts:new Date*1,
                             act:"display",
                             auid:cookie.getCookie('uid'),
                             agent:window.navigator.userAgent,
                             pdPos:self._getPos(self.defaults.pdPos),
                             pType:self._getType(self.defaults.pType)
                         },
                         success:function(){

                         }
                     })
                }
            }
            self.defaults.num = num;
            self.data = [];
            self.move = 0;
        }

        _getPos(type) {
            if (!type) {
                return "";
            }
            let obj = {
                "0": "BaP0001M0004",//home list
                "1": "BaP0011M0002",//分享成功list
                "2": "BaP0001M0004"//home手动推荐list
            };
            return obj[type];
        }

        _getType(type) {
            if (!type) {
                return "BaP0001";
            }
            let obj = {
                "0": "BaP0001",//home
                "1": "BaP0003",//类目结果
                "2": "BaP0011",//分享成功条跳转页
                "3": "BaP0009",//搜索 list
                "4": "AcP0009",//收藏
                "5": "BaP0005",//mall 热销
                "6": "BaP0012",//mall 超级返利
                "7": "BaP0006",//mall 超低折扣
                "8": "BaP0004"//mall 白菜价
            };
            return obj[type];
        }
    }
    module.exports = new SendPoint();
});