/**
 * Created by liangxiao on 16/8/1.
 */
var fs = require('fs');
var exec = require('child_process').exec;
var webhome = require('../config.json').webhome;
var filters = {
    "checkoutProjectType":function(project,branchM){
        var type = '';
        if(fs.existsSync(webhome+ branchM +'/m/' + project + '/.git')){
            type = 'git';
        }else if(!fs.existsSync(webhome+ branchM +'/m/' + project + '/.git')){
	        type = 'svn';
        }
        return type;
    }
};
module.exports = filters;