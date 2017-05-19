/**
 * Created by liangxiao on 16/8/8.
 */
var sockjsClient = {
    ws: null,
    connectStatus:false,
    url : 'ws://10.69.207.16:8991/',
	num : 0,
    //url : 'ws://10.69.5.93:8991/',
    init: function (callback) {
        var _me = this;
        this.ws = new WebSocket(this.url);

        this.ws.onopen = function () {
            console.log('be connected');
        };
        this.ws.onerror = function(err){
            console.log('err',err);
			console.log('onerror',_me.num);
	        _me.num ++ ;
	        if(_me.num < 5){
		        _me.init();
	        }else{
		        if(_me.num == 6){
			        alert('通知信息断开连接，请刷新页面或者联系管理员');
		        }
		        return false
	        }
        };
        this.ws.onclose = function (event) {
	        console.log('onclose',_me.num);
	        _me.num ++ ;
	        if(_me.num < 5){
		        _me.init();
	        }else{
		        if(_me.num == 6){
			        alert('通知信息断开连接，请刷新页面或者联系管理员');
		        }
		        return false
	        }
        };
        this.ws.onmessage = function(msg){
            console.log('msg',msg.data);
            var data = JSON.parse(msg.data);
            if(!data.type){
                return false
            }
            if(data.type == 'err'){
                $('.command').append('<p style="color:red;padding: 5px 0 5px 10px;">' + JSON.stringify(data.msg) + '</p>');
            }else if(data.type == 'ret'){
                $('.command').append('<p style="color:green;padding: 5px 0 5px 10px;">' + JSON.stringify(data.msg) + '</p>');
            }else{
                $('.command').append('<p style="color:white;padding: 5px 0 5px 10px;">' + JSON.stringify(data.msg) + '</p>');
            }

            var command = document.getElementsByClassName('command')[0];
            command.scrollTop = command.scrollHeight;
        }
    },
    sendMsg: function (msg) {
        this.ws.send(JSON.stringify(msg));
    }
};
