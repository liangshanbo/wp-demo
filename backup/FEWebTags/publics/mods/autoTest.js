/**
 * @author Hao Sun
 * @date 20160616
 * @fileoverview logs
 */



String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

$(function(){
    $('#btnChoose').on('click', function() {
        $('#fulAvatar').click();
    });

    $('#fulAvatar').change(function() {
        $('#subfile').val($('#fulAvatar').val());
    });

    $('#btnSub').on('click',function(){
        var fulAvatarVal = $('#fulAvatar').val();

        if(fulAvatarVal.length == 0)
        {
            $("#subfile").val('请选择要上传的文件');
            return false;
        }

        var extName = fulAvatarVal.substring(fulAvatarVal.lastIndexOf('.'),fulAvatarVal.length).toLowerCase();

        if(extName != '.js'){
            $("#subfile").val('只支持上传JavaScript脚本');
            return false;
        }

        return true;
    });
/*
    $('#fulAvatar').change(function(){
        
    });
*/
});



 	
