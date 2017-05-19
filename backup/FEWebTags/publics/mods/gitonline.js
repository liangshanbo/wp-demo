/**
 * Created by zhangmike on 16/8/29.
 */
$(function(){
	sockjsClient.init();
	var upTarget = $('#onlineProjectsSel');
	$('#onlineProjectBtn').click(function(){
		$.ajax({
			url: "/gitUpdateOnline",
			type: "POST",
			data : {
				projectUrl: upTarget.find("option:selected").eq(0).attr("projectUrl"),
				projectName: upTarget.find("option:selected").text(),
				projectId: upTarget.val()
			},
			success: function(data){
				console.log(data);
				if(data == 'branch Not Found'){
					$('.gitNoRelease').show(0);
					alert('请先在gitlab上创建项目的develop分支');
				}else if(data == 'fail'){
					alert('创建develop分支失败，请联系管理员');
				}else{
					$('.gitNoRelease').hide(0);
					model();
				}
			},
			error: function(err){
				//alert('error');
			}
		});
	});

	function model(){
		$('#myModal').modal('show');
	}
});
