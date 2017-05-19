/**
 * Created by yanglang on 2016/4/20.
 */
/**
 * 处理不同平台的编码问题
 */
var os = require('os');
var iconv = require('iconv-lite');

module.exports = {
  decode: function(val) {
    if (os.platform() === 'win32') {
      return iconv.decode(val, 'GBK');
    } else {
      return val;
    }
  },
  decodeParam: function() {
    var params = {
      maxBuffer: 5000 * 1024
    };
    if (os.platform() === 'win32') {
      params.encmding = 'gbk';
    }
    return params;
  }()
};
