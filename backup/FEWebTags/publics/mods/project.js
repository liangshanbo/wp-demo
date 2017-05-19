var api = {
    getServerList: function (options) {
        var _default = {
            callback: function () {
            },
            errcallback: function () {
            }
        }
        $.extend(_default, options);
        $.ajax({
            url: "/getServerList",
            type: "GET",
            success: function (data) {
                _default.callback(data);
            },
            error: function () {
                _default.errcallback();
            }
        });
    },
	refreshServerList: function (data,name) {
		var content = '<thead> <tr class="head"> <th style="width:40px;"></th><th>端口</th> <th>静态服务描述</th> <th>分类</th> <th>地址</th> </tr> </thead>';
		if(data.length > 0){
			data.forEach(function(item){
				content += '<tr> <td><input name="servers" type="checkbox" value="' + item.port +'" id="' + item.port + '"></td> <td><label for="' + item.port + '">' + item.port + '</label></td> <td>' + item.desc + '</td> <td>' + item.type + '</td> <td><input type="text" disabled value="http://' + item.ip + ':' + item.port + '"></td>'+
					'<td><button class="btn btn-warning editBtn" port="'+item.port+'">编辑</button></td>'+'</tr>';
			})
		}
		$(name).html(content);
	}
};

$(function(){
    sockjsClient.init();
   $('#submitBtn').click(function(){
       if(confirm('确定要执行'+($('#deleteBtn').is(':checked')?'删除':'更新')+'操作吗？')){
           $('#formPanel')[0].submit();
       }
   });
    $('#searchBtn').click(function(){
        search();
    });
    $('#keyword').bind('keypress',function(e){
        if(e.keyCode == "13"){
            search();
        }
    });
    $('.oneKeyRecovery').click(function(){
        $.ajax({
            url: "/oneKeyRecovery",
            type: "GET",
            success: function (data) {
                if(data == 'success'){
                    alert('成功一键恢复丢失svn项目');
                }
            },
            error: function () {
                alert('一键恢复所有svn丢失文件失败')
            }
        });
    })
	$('.typeProject').on('change',function(){
		var type = $(this).val();
		$.ajax({
			url: "/typeProject?type=" + type,
			type: "GET",
			success: function (data) {
				api.refreshServerList(data,'.table');
			},
			error: function () {
				alert('根据类型查询失败');
			}
		});
	});
	$('.changeProjectBtn').click(function(){
		var type = $(this).parent().parent().find('td').eq(3).html();
		$('.changeProject').val(type);
	})
});
function search(){
    var searchKey = $('#keyword').val();
    $.ajax({
        url: "/searchForStaticResource?searchKey=" + searchKey,
        type: "GET",
        success: function (data) {
	        api.refreshServerList(data,'.table');
        },
        error: function (err) {
            console.log(err);
        }
    });
}
