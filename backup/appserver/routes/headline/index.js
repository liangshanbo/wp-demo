/**
 * @title: 今日头条
 * @author: ZYZ
 * @ctime: 2017-03-23
 */
var request = require('../public/request');

module.exports = function(Router) {
    var static = {
        csspath: 'headline/headline.css',
        jspath: 'headline/headline.js'
    };
    Router.get('/headline', function(req, res) {
        // console.log(req.query);
        let query = req.query;
        request.get("/cms/article?id=" + query.id + "&status=1", "", req, function(data) {
            var targetURI = data.data.targetURI,
                  title = "Daily information";
                  if(req.query.rid){
                    title="Daily recommendation";
                  }
            res.render('headline/goodsDetail', {
                title: title,
                static: static,
                result: data,
                targetURI: targetURI
            });
        })
    });
    return Router;
}
