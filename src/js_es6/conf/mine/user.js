/**
 * 我的--用户信息
 * @author guodanying
 * @date 20170220
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mine/user.js">
 </script>
 */
define('conf/mine/user.js',function(require,exports,module) {
    require('$');
	const  UI = require('UI/dialog/alert.js'),
	       ajax = require('utils/async/ajax.js'); 
	let loginoff = $("#loginoff");
    loginoff.on("click",function(){
    	UI.alertBox({
            text:'Are you sure to log out?',
            confirmBtn:'Log out',
            cancelBtn:'cancel',
            callback:function(){
                quest();
            }		
        })
    });
    function quest(){
    	 ajax.post({
              url:'/api/user/logout',
              success:function (data) {
                if(data.code === 200){
                   location.assign("/");
                }else{
                   UI.alertSecond(data.message);
                   return false;
                }
            },    
              error:function(data){
                UI.alertSecond(data.message);
                return false;
             }
        })
    }
});
