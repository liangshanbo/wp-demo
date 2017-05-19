/**
 * @title: 游戏
 * @author: wangchunpeng
 * @ctime: 2017-03-06
 */
var request = require('../public/request');

module.exports = function(Router) {
    Router.get('/game/slotmachine', function(req, res) {
        res.render('game/slotmachine', {
            title: 'Slot Machine',
            static: {
                csspath: 'game/slotmachine.css',
                jspath: 'game/slot_app.js'
            },
            shareurl: global.config.wapcsspath + "/images/game/laohuji/share.gif"
        });
    });
    Router.get('/game/luckydraw', function(req, res) {
        res.render('game/luckydraw', {
            title: 'Lucky Draw',
            static: {
                csspath: 'game/luckydraw.css',
                jspath: 'game/luckydraw.js'
            },
            shareurl: global.config.wapcsspath + "/images/game/luckydraw/share.jpg"
        });
    });
    return Router;
}
