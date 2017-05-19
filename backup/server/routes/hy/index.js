/**
 * @title: 活动页面 
 * @time:  2017-03-22
 */
var request = require('../public/request');

module.exports = function(Router, config) {
    Router.get("/hy/game/slot", function(req, res) {
        var static = {
            csspath: "hy/slotmachine.css",
            jspath: "hy/game/slot.js"
        }
        res.render('hy/game/slot', {
            title: 'Slot Machine',
            config: global.config,
            static: static
        });
    });
    return Router;
}