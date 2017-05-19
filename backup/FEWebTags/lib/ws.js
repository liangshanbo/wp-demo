/**
 * Created by liangxiao on 16/8/4.
 */
var WebSocketServer = require('ws').Server
    , ws = new WebSocketServer({ port: 8991 });
module.exports = {
    ws : ws
};
