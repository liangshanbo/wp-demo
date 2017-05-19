/**
 * 定时任务清理两周以前的tag
 * @type {function(string, {cwd?: string, stdio?: any, customFds?: any, env?: any, encoding?: string, timeout?: number, maxBuffer?: number, killSignal?: string}, function(Error, NodeBuffer, NodeBuffer): void): ChildProcess|function(string, function(Error, NodeBuffer, NodeBuffer): void): ChildProcess}
 */
var exec = require('child_process').exec;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var os = require('os');
var Calendar = require('./calendar.js');
var auth = '--username fuqiang --password 123456.Gome ';
var basepath = 'https://svn.gomeo2o.cn:8443/gomeo2o_H5/dev/';

var svnCMD = async(function(cmd,bNomsg) {
    return new Promise(function(resolve, reject) {
        cmd = bNomsg ? cmd : cmd + ' -m "hit tags by FEwebTags"';
        // exec(cmd + ' -m "hit tags by FEwebTags"', function(err, ret) {
        exec(cmd,{encoding:'gbk'}, function(err, ret) {
            if (err) {
                reject(err);
            } else {
                ret = iconv.decode(ret,'GBK');
                resolve(ret);
            }
        });
    });
});

var getTags = async(function(project){
    return new Promise(function(resolve,reject){
        var path = basepath+project+'/tags/';
        exec('svn '+auth+'ls '+path,{encoding:'gbk'}, function(err, ret) {
            if (err) {
                reject(err);
            } else {
                ret = iconv.decode(ret,'GBK');
                resolve(ret);
            }
        });
    });
});



//执行清空操作
(function(){
    async(function() {
        ['app','h5','w','public'].forEach(function(key){
            var list = await (getTags(key));
            list = list.split("/"+os.EOL);
            list.splice(list.length - 1);
            var toBeDelArr = [];
            for(var i = 0;i<list.length;i++){
                try{
                    var tagTime = Calendar.getInstance(list[i].split('--')[0]).getTime();
                }catch(e){
                    continue;
                }
                if(tagTime <Calendar.getInstance().add(Calendar.WEEK,-2).getTime()){
                    toBeDelArr.push(list[i]);
                }
            }
            for(var i=0,l=toBeDelArr.length;i<l;i++){
                var cmd = 'svn rm ' + auth + basepath + key + '/tags/' + toBeDelArr[i];
                console.log(cmd);
                await(svnCMD(cmd));
            }
        });
    })();
})();
