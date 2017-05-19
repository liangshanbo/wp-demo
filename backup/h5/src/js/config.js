/**
 * @author xiaojue
 * @fileoverview 配置文件，nodejs和web公用
 **/

(function(global, undef) {
  var isBrowser = !!(typeof window !== undef && global.navigator && global.document);
  var debug;
  var basepath,
      publicpath;
  if (isBrowser) {
    debug = (/debug/).test(location.search);
    // basepath = 'http://m.gomeplus.com/';
    var maps = {
      'm.gomeplus.in': 'drl8vxuq8vzq2.cloudfront.net',
      'm-pre.gomeplus.in': 'ds60ibq1anru.cloudfront.net'
    };
    var scripts = document.querySelectorAll('script');
    [].slice.call(scripts).forEach(function(item){
      if(item.src.match(/lithe/)){
        debug = /\/src\//.test(item.src);
        basepath = (item.src.match(/^(http[s]?:\/\/.*)\/dist/) || item.src.match(/^(http[s]?:\/\/.*)\/src/))[1];
        return;
      }
    });
    console.log('basepath:'+basepath);
    // publicpath = (maps[location.host]? location.href.match(/^(http[s]?):\/\/(?:[^\/]*)\/.*$/)[1]+'://' + maps[location.host] : 'http://js-ovc-pre.meixincdn.com') + '/public';

  }
  var mod = {
    basepath: debug ? basepath + '/src/js/' : basepath + '/dist/js/',
    alias: {
      '$': 'vendors/zepto.js',
      'vue': 'vendors/vue.js',
      'FastClick': 'vendors/fastclick.js',
      'TouchSlide': 'vendors/TouchSlide.js',
      'DropLoad': 'vendors/dropload.js'
    },
    // publicpath : debug ? publicpath + "/overseasJS/src/" : publicpath + '/overseasJS/dist/',
    // publicdeps : {
    //   "vendors/zepto.js" : {
    //     "vendors/zepto/v1/zepto.js" : []
    //   },
    //   "vendors/zepto-fx.js" : {
    //     "vendors/zepto-fx/v1/zepto-fx.js" : []
    //   },
    //   "vendors/vue.js" : {
    //     "vendors/vue/v1/vue.js" : []
    //   },
    //   "vendors/TouchSlide.js" : {
    //     "vendors/touchSlide/v1/TouchSlide.js" : []
    //   },
    //   "vendors/lazyload.js" : {
    //     "vendors/lazyload/v1/lazyload.js" : ["vendors/zepto", "vendors/zepto-fx.js"]
    //   },
    //   "vendors/iscroll1.js" : {
    //     "vendors/iscroll1/v1/iscroll1.js" : []
    //   },
    //   "vendors/fastclick.js" : {
    //     "vendors/fastclick/v1/fastclick.js" : []
    //   },
    //   "vendors/echarts-all.js" : {
    //     "vendors/echarts-all/v1/echarts-all.js" : []
    //   },
    //   "vendors/dropload.js" : {
    //     "vendors/dropload/v1/dropload.js" : ["vendors/zepto.js"]
    //   },
    //   "vendors/pinchzoom.js" : {
    //     "vendors/pinchzoom/v1/pinchzoom.js" : ["vendors/pinchzoom.js"]
    //   }
    // },
    localcache:true,
    preload: [],
    manifest:{},
    timestamp: '1.4.27'
  };
  console.log(mod.basepath);
  if (global.define && isBrowser) {
    define('config', function() {
      return mod;
    });
  } else {
    module.exports = mod;
  }
  if (isBrowser) {
    (/debug/).test(location.search) && (window.onerror = function(msg, url, line) {
      alert('异常信息：' + msg + '\n' + '错误文件：' + url + '\n' + '错误行数：' + line);
    });
  }

  var appendConsole = function() {
    var con = document.createElement('script');
    con.src = basepath + '/src/js/vconsole.min.js';
    document.head.appendChild(con);
    try {
      localStorage.setItem('gmp-debug', (new Date()).getTime());
    }catch(e) {
      console.log('debug console..', e);
    }
  };
  if (debug) { // 建议本地调试时代理config.js文件时使用,可将debug直接设置为true
    appendConsole();
  }
})(this);
