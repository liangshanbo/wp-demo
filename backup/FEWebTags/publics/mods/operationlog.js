/**
 * Created by zhangmike on 16/7/25.
 */
$(function(){
	sockjsClient.init();
	$(document).ajaxStart(function(){
		$('#loading').show();
	});
	$(document).ajaxComplete(function(){
		$('#loading').hide();
	});

	$('#operateLogs').click(function(){
		$('#loading').show();
		$('#iframelogs').attr('src', '/logs/logs.log');
		$('#iframelogs').load(function(){
			$('#loading').hide();
		});
		$("#iframelogs").load(function() {
			$("#iframelogs").contents().find("body").css({
				'font-family': 'Lucida Console, Microsoft YaHei',
				'color': '#fff',
				'font-size': '16px',
				'margin': '0px'
			});
			$('#logs').modal('show');
		});
	});

	var type = $('#mySysType').val();
	$('.projects').on('click','.editBtn',  function(e){
		$.ajax({
			url: "/gitFindConfig",
			type: "GET",
			data: {
				serverPort: $(e.target).attr('port')
			},
			success: function(data) {
				if (data.msg) {
					if (type === 'svn') {
						$('#url').val(data.data.svn);
					}else {
						$('#url').val(data.data.git);
						$('#branchName').val(data.data.branchName);
					}
					$('#serverDesc').val(data.data.desc);
					$('#realPort').val(data.data.port);
					$('#editProject').modal('show');
				}else {
					alert("fail,请联系管理员!");
				}
			},
			error: function() {
				alert('error');
			}
		});
	});

	$('#saveEdit').click(function(e){
		var branchName = '',
			url = '';
		var sType = $('.changeProject').val();
		if (type === 'gitlab') {
			branchName = $('#branchName').val();
		}
		url = $('#url').val();
		$.ajax({
			url: "/gitEditConfig",
			type: "post",
			data: {
				serverPort: $('#realPort').val(),
				type: type,
				desc: $('#serverDesc').val(),
				branchName: branchName,
				url: url,
				staticType: sType
			},
			success: function(data) {
				if (data === 'success') {
					alert("修改成功");
				}else {
					alert("fail,请联系管理员!");
				}
			},
			error: function(e) {
				alert('error',e);
			}
		});
	});
})