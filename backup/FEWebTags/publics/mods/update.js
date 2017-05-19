$(function(){
    sockjsClient.init();
    var sysType = $('#mySysType').val();
    var url = '';
    var upsvnTarget = $('#upsvn_target');
    var createRelease = $('#createRelease');
    upsvnTarget.on('change',function(){
        onchange();
    }).trigger("change");
    $('#upsvn_p').on('change',function(){
        onchange();
    });
    createRelease.click(function(){
        var p = $('#upsvn_p').val();
        $.ajax({
            url: "/createRelease",
            type: "POST",
            data : {
                projectUrl: upsvnTarget.find("option:selected").eq(0).attr("projectUrl"),
                projectName: upsvnTarget.find("option:selected").text(),
                p: p,
                projectId: upsvnTarget.val()
            },
            //timeout : 10000,
            success: function(data){
                console.log(data);
                if (data === 'already') {
                    alert('别闹,你已经创建了~');
                }else if(data == 'branch Not Found'){
                    hideAllG();
                    $('.gitNoRelease').show(0);
                    alert('请先在gitlab上创建项目的develop分支');
                }else if(data == 'fail'){
                    alert('创建develop分支失败，请联系管理员');
                }else{
                    $('#currentVersion').html(data);
                    createRelease.hide(0);
                    $('.gitNoRelease').hide(0);
                    isGit();
                    model();
                }
            },
            error: function(err){
                //alert('error');
            }
        });
    });
    $('#updateGit').click(function(){
        var p = $('#upsvn_p').val();
        $.ajax({
            url: "/upgit",
            type: "POST",
            data : {
                project: $('#upsvn_target').find("option:selected").text(),
                p: p
            },
            //timeout : 10000,
            success: function(data){
                model();
                $('#currentVersion').html(data);
            },
            error: function(err){
               // alert('error');
            }
        });
    });
    $('#updateSvn').click(function(){
        var type = upsvnTarget.find("option:selected").text();
        var p = $('#upsvn_p').val();
        $.ajax({
            url: '/upsvn',
            type: "POST",
            data : {
                type: type,
                p: p
            },
            success: function(data){
                $('#currentVersion').html(data);
                console.log(data);
            },
            error: function(err){
                console.log(err);
                alert('更新失败');
            }
        })
    });
    $('#checkoutGit').click(function(){
        var type = upsvnTarget.find("option:selected").text();
        var p = $('#upsvn_p').val();
        var projectUrl = upsvnTarget.find("option:selected").eq(0).attr("projectUrl");
        var url = "/checkoutGit?project=" + type + "&p=" + p+ "&projectUrl=" + projectUrl;
        $.ajax({
            url: url,
            type: "GET",
            success: function(data){
                if(sysType === 'gitlab'){
                    hideAllG();
                    noRepository();
                    if(data === 'success'){
                        isGit();
                    }else{
                        isSvn();
                        console.error('data.cmd',data.cmd);
                        alert(data);
                    }
                }else{
                    alert('登录信息与返回类型不一致，请联系管理员')
                }
            },
            error: function(err){
                console.log(err);
                 alert('切换仓库失败');
                isSvn();
            }
        })
    });
    $('#checkoutSvn').click(function(){
        var type = upsvnTarget.find("option:selected").text();
        var p = $('#upsvn_p').val();
        var url = "/checkoutSvn?project=" + type + "&p=" + p;
        $.ajax({
            url: url,
            type: "GET",
            success: function(data){
                model();
                if(sysType === 'svn'){
                    hideAllS();
                    if(data === 'success'){
                        isSvnS();
                    }else{
                        isGitS();
                        alert(data);
                    }
                }else{
                    alert('登录信息与返回类型不一致，请联系管理员')
                }
            },
            error: function(err){
                alert(err);
            }
        })
    });
    function onchange(){
        var p = $('#upsvn_p').val(),
            type = '';
        if (sysType === 'svn'){
            type = $('#upsvn_target').val();
            url = "/svnversion?type=" + type + "&p=" + p;
        }else if (sysType === 'gitlab'){
            type = upsvnTarget.find("option:selected").text();
            url = "/gitversion?project=" + type + "&p=" + p+
                "&projectId=" + upsvnTarget.val();
        }
        $('#currentVersion').html('');
        var jqXhr = $.ajax({
            url: url,
            type: "GET",
            //timeout : 5000,
            success: function(data){
                console.log(data,sysType);
                var currentVersion = $('#currentVersion');
                if (data != 'fail' && sysType === 'gitlab'){
                    hideAllG();
                    switch (data) {
                        case 'branch Not Found':
                            $('.gitNoRelease').show(0);
                            alert('请先在gitlab上创建项目的develop分支');
                            break;
                        case 'no develop':
                            if (sysType === 'gitlab'){
                                createRelease.show(0);
                                alert('请先在服务器上创建' +
                                    $('#upsvn_target').find("option:selected").text() +
                                    '项目的develop分支!');
                            }
                            break;
                        case 'svn':
                            isSvn();
                            $('.repository').html('svn');
                            $('.repositoryR').html('gitLab');
                            break;
                        case 'noRepository':
                            createRelease.show(0);
                            currentVersion.html('此项目未添加管理仓库，请删除后重新添加');
                            noRepository();
                            break;
                        default:
                            currentVersion.html(data);
                            isGit();
                    }
                }else if(data != 'fail' && sysType === 'svn'){
                    hideAllS();
                    switch (data) {
                        case 'svn':
                            isSvnS();
                            break;
                        case 'git':
                            isGitS();
                            $('.repository').html('gitLab');
                            $('.repositoryR').html('svn');
                            break;
                        case 'noRepository':
                            currentVersion.html('此项目未添加管理仓库，请删除后重新添加');
                            noRepository();
                            break;
                        default:
                            currentVersion.html(data);
                            isSvnS();
                    }
                }else{
                    alert('联系管理员!' + data);
                }
            },
            error: function(err){
                /*console.log(err)
                if (sysType === 'gitlab'){
                    alert('请先在服务器上创建' +
                        $('#upsvn_target').find("option:selected").text() +
                        '项目的release分支!');
                }*/
                jqXhr.abort();
            }
        });
    }
    function isGit(){
        $('#updateGit').css('display','block');
    }
    function isGitS(){
        $('#checkoutSvn,#repositoryType').css('display','block');
    }
    function isSvn(){
        $('#checkoutGit,#repositoryType').css('display','block');
    }
    function isSvnS(){
        $('#updateSvn').css('display','block');
    }
    function hideAllG(){
        $('#repositoryType,#createRelease,#updateGit,#checkoutGit,.no_repository,.gitNoRelease').css('display','none');
    }
    function hideAllS(){
        $('#updateSvn,#checkoutSvn,.no_repository,#repositoryType').css('display','none');
    }
    function noRepository(){
        $('.no_repository').css('display','block');
    }
    function model(){
        $('#myModal').modal('show');
    }
});
