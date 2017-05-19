var request = require('../public/request'),
    Login = require("../../controller/login");

module.exports = function (Router, config) {
     Router.get(["/pro/goodintroduction"], function(req, res) {
        var static = {
            csspath: 'goods/goodintroduction.css',
            jspath: ''
        }
        res.render('pro/goodintroduction', {
            title: 'Product introduction',
            config: global.config,
            static: static
        });
    });
    Router.get("/pro/detail", function (req, res) {
        var static = {
            csspath: 'goods/goodsDetails.css',
            jspath: 'pro/detail.js'
        };
        var params = {
            pageType: "AaP0007",
            pageModule: "AaP0007M0001",
            pageNum:1,
            pageSize:10
        };
        var uid =  'cookie' in req.headers && getParams(req.headers.cookie).uid || new Date()*1;
        var pdPos = getPdPos(req.query.pdtype);//req.query.pdtype  上一个页面的来源
        var obj = {
            itemId: req.query.id,
            agent: req.headers["user-agent"],
            auid: uid,
            ts:new Date()*1,
            act:"click",
            pType:"AaP0007",
            pdPos:pdPos,
            integrity:"full"
        };
        if(!uid){
            res.cookie('uid',obj.auid , { path:"/",expires: new Date(Date.now() + 3122064000000), httpOnly: true });
        }
        request.get('/combo/item', obj, req, function (data) {
            request.get('/ext/recommendation/items', params, req, function (data1) {
                var name = data.data.item.name?data.data.item.name:"";
                var obj = {
                    title: name+'- GOMEPLUS',
                    config: global.config,
                    static: static,
                    result: data,
                    userId: Login.getUserid(req),
                    recommend: data1,
                    collect: 0,
                    hasLogin: Login.hasLogin(req)
                };
                if (Login.hasLogin(req)) {
                    request.get('/user/itemCollectVerifyAction?itemIds=' + req.query['id'],{}, req, function (data2) {
                        //console.log(JSON.stringify(data2))
                        if (data2.code == 200 && data2.data && data2.data.collection[0].collected) {
                            obj.collect = 1;
                        }
                        res.render('pro/detail', obj);
                    });
                } else {
                    res.render('pro/detail', obj);
                }
            })
        });
        function getParams(url) { //获取url传递的参数*/
            var obj = {};
            var arr = url.replace(/\s/g,"").split(";");
            for (var i = 0, l = arr.length; i < l; i++) {
                var res = arr[i].split("=");
                obj[res[0]] = res[1]
            }
            return obj;

        }
        function getPdPos(type){
            if(!type){
                return "AaP0007";
            }
            var obj = {
                "1":"BaP0001M0001",//首页banner
                "2":"BaP0001M0002",//首页频道
                "3":"BaP0001M0003",//首页为你推荐
                "4":"BaP0003",//分类列表
                "5":"BaP0007M0001",//商品详情为你推荐
                "6":"BaP0009",//搜索结果
                "7":"AcP0008",//我的订单详情
                "8":"AcP0009", //我的收藏列表
                "9":"BaP0011M0002",//分享后推荐
                "10":"AaP0005"
            }
            return obj[type];
        }
    });
    return Router;

}