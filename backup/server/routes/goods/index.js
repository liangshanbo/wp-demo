/**
 * title: 商品有关的
 * ctime: 2017-02-22
 */

var request = require('../public/request'),
    Login = require("../../controller/login");

module.exports = function(Router, config) {
    Router.get(["/goods/cate"], function(req, res) {
        var static = {
            csspath: "goods/category.css",
            jspath: "goods/category.js"
        }
        var params = {
            parentId: 0,
            depth: 3
        }
        request.get('/item/categoryTree', params, req, function(data) {
            res.render('goods/cate', {
                title: 'category',
                result: data,
                config: global.config,
                static: static
            });
        });

    });

    Router.get("/goods/detail", function(req, res) {
        var static = {
            csspath: 'goods/cateDetail.css',
            jspath: 'goods/catedetail.js'
        };
        request.get('/ext/item/searchItems?pageNum=1&pageSize=10&categoryId='+req.query["categoryId"],"",req,function(data){
            res.render('goods/detail', {
                title: req.query["title"]?req.query["title"]+"- GOMEPLUS":'Title'+"- GOMEPLUS",
                htitle:req.query["title"],
                config: global.config,
                static: static,
                result: data,
                categoryId:req.query['categoryId'],
                userId: Login.getUserid(req)
            });
        })
    });
    Router.get("/shareSuccess", function(req, res) {
        var static = {
            csspath: 'share/shareSuccess.css',
            jspath: 'mine/shareSuccess.js'
        };
        var params = {
            // pageType:"AaP0007",
            // pageModule:"AaP0007M0001",
             pageSize:"10",
             pageNum:1
        }
        
        request.get('/combo/share/success',params,req,function(data){
            res.render('goods/shareSuccess', {
                title: 'Shared Success',
                config: global.config,
                static: static,
                result: data,
                categoryId:req.query['categoryId'],
                userId: Login.getUserid(req)
            });
        })
    });
    return Router;
}
